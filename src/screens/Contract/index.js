import React, {Component, Dimensions} from "react";
import {
    Container,
    Header,
    Title,

    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Left,
    Right,

    Body,
    ListItem,
    List,
    H2
} from "native-base";
import {toast, toastI, tdeb} from "../../utils/util";
import Loader from "../../utils/Loader";
import Base from "../Base";
import I18n from "../../I18n";
import {CreateUri, WebApi, WS} from "../../services/Api";
import styles from "../styles";
import OpenFile from "react-native-doc-viewer";
import {Platform} from "react-native";
var RNFS = require("react-native-fs");
var SavePath = Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
import C from "../../theme/variables/commonColor"

class Contract extends Base {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
        }

        this.loadData(true)
    }

    loadData(firstTime) {

        if (!firstTime) {
            this.setState({
                data: [],
                isLoading: true,
            });
        }

        const {params} = this.props.navigation.state;

        WebApi(WS.GetJourneys, {
            UserCode: params.user.Code
        }).then(res => {
            this.setState({data: res, isLoading: false})
        }).catch(() => {
            this.setState({data: [], isLoading: false})
            toastI("err");
        });
    }

    signThis(contract) {
        if(contract.IsLocked) toastI("locked_message")
        else this.props.navigation.navigate("SignScreen", {signed: (d, con) => this.signed(d, con), contract: contract});
    }

    signed(data, contract) {
        //toast(JSON.stringify(contract));
        //toast(encodeURI(data))
        WebApi(WS.SendSignedContract, {
            JourneyCode: contract.Code,
            UserCode: contract.UserCode,
            SignedFile: data
        }).then(res => {
            toast(res.result);
        }).catch(err => {
            toast(err);
        });

    }

    viewContractText(contract) {
        //const {Code} = contract;
        //var uri = CreateUri(WS.GetJourneyContract, {JourneyCode: Code})

        this.props.navigation.navigate("ContractText", {contract: contract});
    }


    getFileExt(fileName) {
        var dot = fileName.lastIndexOf(".")+1
        return fileName.substring(dot, fileName.length).toLowerCase()
    }

    openFile(path, fileName, ext) {
        /*
        if(Platform.OS === 'ios'){
            OpenFile.openDoc([{
            url: path,
            fileNameOptional: fileName
          }], (error, url) => {
              if (error) {
                toastI("err");
              } else {
                console.log(url)
              }
            })
        }
        //*/
        if(C.isAndroid) {
            OpenFile.openDoc([{
                url: "file://" + path,
                fileName: fileName,
                fileType: ext,
                cache: true,
            }], (error, url) => {
                if (error) {
                    //toast("Error: "+ error);
                    toastI("err");
                } else {
                    //toast("url: "+url)
                }
            })
        }
        //*/
    }

    openDoc(doc) {
        if(C.isAndroid) this.openDocAndroid(doc)
        else this.openDocIOS(doc)
    }

    openDocIOS(doc) {
        this.setState({isLoading: true})
        OpenFile.openDoc([{
            url: CreateUri(WS.GetJourneyContract, {JourneyCode: doc.Code})+"&fileName=contract.png",
            //url: 'http://cdn.asriran.com/files/fa/news_albums/603988/20767/resized/resized_836002_458.jpg',
            fileNameOptional: 'contract.png'
          }], (error, url) => {
            this.setState({isLoading: false})
              if (error) {
                toastI("err");
              } else {
                console.log(url)
              }
            })
    }

    openDocAndroid(doc) {
        var ext = "png";
        var fileName = "CON_" + doc.Code + "." + ext
        var path = SavePath + "/" + fileName;

        RNFS.exists(path).then(res => {
            //if(res) {
            //    this.openFile(path, fileName, ext)
            //} else {
                this.setState({isLoading: true})
                var df = RNFS.downloadFile({
                    fromUrl: CreateUri(WS.GetJourneyContract, {JourneyCode: doc.Code}),
                    //fromUrl: 'http://cdn.asriran.com/files/fa/news_albums/603988/20767/resized/resized_836002_458.jpg',
                    toFile: path
                });//.then(res => toast(JSON.stringify(res))).catch(err => JSON.stringify(err));

                df.promise.then(res => {
                    //toast(JSON.stringify(res));
                    this.openFile(path, fileName, ext)
                    this.setState({isLoading: false, refreshing: false})
                }).catch(err => {
                    this.setState({isLoading: false, refreshing: false})
                    toast(JSON.stringify(err))
                });
            //}
        })
    };



    renderCard(d) {
        const nt = [styles.text, styles.c1, styles.small];
        const nt3 = [styles.text, styles.c3, styles.small];
        const nt2 = [styles.text, styles.c2, styles.small];

        var nn = d.IsLocked ? nt2 : (d.IsSigned ? nt : nt3);
        var tt = d.IsLocked ? "sign" : (d.IsSigned ? "re-sign" : "sign");

        return (
            <Card style={[styles.mb]} key={"key" + d.Code}>
                <CardItem bordered style={{backgroundColor: d.IsLocked ? C.dcolor2 : "#fff"}}>
                    <Text style={nt}>{d.Title}</Text>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Body>
                        <Button  transparent >
                            <Icon name="calendar" />
                            <Text style={nt}>{d.StartDate}</Text>
                        </Button>

                        <Button transparent >
                            <Icon name="logo-github" />
                            <Text style={nt}>{d.DestinationCity}</Text>
                        </Button>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Button onPress={() => this.openDoc(d)} transparent>
                            <Icon style={nt} name="paper" />
                            <Text style={nt}>{I18n.t("contract_text")}</Text>
                        </Button>
                    </Left>
                    {<Right>
                        <Button onPress={() => this.signThis(d)} transparent>
                            <Icon style={nn} name="md-book" />
                            <Text style={nn}>{I18n.t(tt)}</Text>
                        </Button>
                    </Right>}
                </CardItem>

            </Card>
        )
    }

    getTitle = () => I18n.t("contract")

    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        {this.state.data.map((d) => this.renderCard(d))}
                    </Content> : this.noData()
                }
            </Loader>
        )
    }

}

export default Contract;
