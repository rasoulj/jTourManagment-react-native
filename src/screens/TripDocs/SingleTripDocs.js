import React, {Component} from "react";
import Loader from "../../utils/Loader";

import BaseNext from "../BaseNext";
import {CreateUri, WebApi, WS} from "../../services/Api";
import {toast, toastI, tdeb} from "../../utils/util";
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
    View,
    Body,
    ListItem,
    List,
    H2
} from "native-base";
import {Platform, RefreshControl} from "react-native";
import V from "../../theme/variables/platform";
import C from "../../theme/variables/commonColor";
import styles from "../styles";
import I18n from "../../I18n";
import OpenFile from "react-native-doc-viewer";
import User from "../../services/User";
import menu_data from "../SideBar/menu_data";

var RNFS = require("react-native-fs");
var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;


const DocTypes = [
    {e: 'jpg', i: 13},
    {e: 'jpeg', i: 13},
    {e: 'png', i: 13},
    {e: 'pdf', i: 14},
    {e: 'doc', i: 15},
    {e: 'docx', i: 15},
    {e: 'xls', i: 16},
    {e: 'xlsx', i: 16},
]



class SingleTripDocs extends BaseNext {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            refreshing: false
        }
    }

    getTitle() {
        const {params} = this.props.navigation.state;
        return params.Title;
    }

    componentDidMount() {
        this.loadData(true)
    }

    loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})

        const {params} = this.props.navigation.state;

        console.log(params.UserCode + " >>> " + params.Code)
        //tdeb(params)

        //User.GetJourneyUserDocs(7, 2).then(res => {
        User.GetJourneyUserDocs(params.UserCode, params.Code).then(res => {
            this.setState({data: res, refreshing: false, isLoading: false})
        }).catch(err => {
            this.setState({data: [], refreshing: false, isLoading: false})
            toastI('err');
        })
    }


    getFileExt(fileName) {
        var dot = fileName.lastIndexOf('.')+1
        return fileName.substring(dot, fileName.length).toLowerCase()
    }

    openFile(path, fileName, ext) {
        if(C.isAndroid) {
            OpenFile.openDoc([{
                url: "file://"+path,
                fileName: fileName,
                fileType: ext,
                cache:true,
            }], (error, url) => {
                if (error) {
                    toast(error);
                } else {
                    //toast("url: "+url)
                }
            })
        } else {
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
    }

    openDoc(doc) {
        var ext = this.getFileExt(doc.FileName)

        var path = SavePath+"/SDOC_"+doc.Code+"."+ext

        tdeb(doc)

        RNFS.exists(path).then(res => {
            if(res) {
                this.openFile(path, doc.FileName, ext)
            } else {
                this.setState({isLoading: true, refreshing: false})
                var df = RNFS.downloadFile({
                    fromUrl: CreateUri(WS.GetSingleJourneyUserDoc, {JourneyUserDocCode: doc.Code}),
                    toFile: path
                });

                df.promise.then(res => {
                    this.openFile(path, doc.FileName, ext)
                    this.setState({isLoading: false, refreshing: false})
                }).catch(err => {
                    this.setState({isLoading: false, refreshing: false})
                    JSON.stringify(err)
                });
            }
        })
    }


    openDocIOS(doc) {
        var ext = this.getFileExt(doc.FileName)

        var path = SavePath+"/SDOC_"+doc.Code+"."+ext

        tdeb(doc)

        RNFS.exists(path).then(res => {
            if(res) {
                this.openFile(path, doc.FileName, ext)
            } else {
                this.setState({isLoading: true, refreshing: false})
                var df = RNFS.downloadFile({
                    fromUrl: CreateUri(WS.GetSingleJourneyUserDoc, {JourneyUserDocCode: doc.Code}),
                    toFile: path
                });

                df.promise.then(res => {
                    this.openFile(path, doc.FileName, ext)
                    this.setState({isLoading: false, refreshing: false})
                }).catch(err => {
                    this.setState({isLoading: false, refreshing: false})
                    JSON.stringify(err)
                });
            }
        })
    }


    renderRow(data) {
        var ext = this.getFileExt(data.FileName).toLowerCase()
        var dt = DocTypes.find(p => p.e == ext)
        var ii = dt ? dt.i : 12;

        console.log(ii)

        return (
            <ListItem
                button
                thumbnail
                onPress={() =>  this.openDoc(data)}
            >
                <Left>
                    <Thumbnail square size={55} source={menu_data.menu_icons[ii]} />
                </Left>
                <Body>
                    {data.Title && <Text style={[styles.text, styles.c1, styles.size16]}>
                        {data.Title}
                    </Text>}
                    {data.FileName && <Text note style={[styles.text, styles.small]}>
                        {data.FileName}
                    </Text>}
                    {data.FTFullName && <Text note style={[styles.text, styles.c3, styles.size16]}>
                        {'(' + data.FTFullName + ')'}
                    </Text>}
                </Body>
                <Right>
                    <Icon style={styles.size24} name={V.darrow} />
                </Right>
            </ListItem>
        )
    }



    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        <List
                            dataArray={this.state.data}
                            renderRow={data => this.renderRow(data)}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.loadData(false)}/>}
                        />
                    </Content> : this.noData()
                }
            </Loader>
        )
    }

}

export default SingleTripDocs;
