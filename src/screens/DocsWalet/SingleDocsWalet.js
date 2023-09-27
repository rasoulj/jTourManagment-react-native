import React from "react";
//import {ImageBackground, View, StatusBar} from "react-native";
import OpenFile from "react-native-doc-viewer";
import Loader from "../../utils/Loader";
import V from "../../theme/variables/platform";
import { RefreshControl, Alert, Platform, ImagePickerIOS} from "react-native";
import {
    Button, Content, Footer, FooterTab, Icon, Left, List, ListItem, Right,
    Text, Thumbnail, ActionSheet, Body
} from "native-base";
import I18n from "../../I18n";
import Base from "../Base";
import {WebApi, WS, CreateUri} from "../../services/Api";
import {toastI, tdeb, toast} from "../../utils/util";
import styles from "../styles";
var RNFS = require("react-native-fs");
var SavePath = Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
import menu_data from "../SideBar/menu_data"
import C from "../../theme/variables/commonColor";

import FileViewer from 'react-native-file-viewer';
import {selectDoc} from "../../services/OS"

//const FilePickerManager = require("NativeModules").FilePickerManager;

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import BaseNext from "../BaseNext";
import User from "../../services/User";


//import {Toast} from "native-base/index";

const Acts = [
    I18n.t("delete"),
    I18n.t("cancel"),
]


const DocTypes = [
    {HCDocTypeCode: 1, Title: I18n.t("mad1")},
    {HCDocTypeCode: 2, Title: I18n.t("mad2")},
    {HCDocTypeCode: 3, Title: I18n.t("mad3")},
    {HCDocTypeCode: 4, Title: I18n.t("mad4")},
    {HCDocTypeCode: 5, Title: I18n.t("mad5")},
]

var DocTypeActs = DocTypes.map(p => p.Title)
DocTypeActs.push(I18n.t("cancel"))

class SingleDocsWalet extends BaseNext {


    getDocType(typeCode) {
        var p = DocTypes.find(q => q.HCDocTypeCode === typeCode);
        return p == undefined ? I18n.t('Unknown') : p.Title;
    }

    getTitle = () => I18n.t("docs_walet");

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            refreshing: false
        };

        //this.loadData(true);
    }

    askToDelete(doc) {
        if(this.verified(doc)) {
            toastI("verified_doc_cannot_be_del")
        } else Alert.alert(
            I18n.t("ask"),
            I18n.t("ask_to_del_doc"),
            [
                {text: I18n.t("no"), style: "cancel"},
                {text: I18n.t("yes"), onPress: () => this.deleteDoc(doc)},
            ],
            { cancelable: false }
        )
    }

    deleteDoc(doc) {
        User.RemoveUserDoc(doc.Code).then(res => {
            toastI("doc_removed")
            this.loadData(false);
        }).catch(() => {
            //toast(err)
            toastI("err");
        });
    }

    componentDidMount() {
        this.loadData(true);
    }

    loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})

        const {params} = this.props.navigation.state;

        User.GetUserDocs(params.user.UserCode).then(res => {
            this.setState({data: res, refreshing: false, isLoading: false});
        }).catch(() => {
            this.setState({data: [], refreshing: false, isLoading: false});
            //toast(err);
            toastI("err");
        });
    }

    getFileName(path) {
        var ind = path.lastIndexOf("/") + 1;

        return path.substring(ind, path.length);
    }

    addDoc1(HCDocTypeCode) {
        ImagePickerIOS.openSelectDialog({},
            (uri, a, b) => toast(uri)
            , () => tdeb('Canceled'))
        ;
    }

    addDocIOS(HCDocTypeCode) {
        var ImagePicker = require('react-native-image-picker');

        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
          title: 'Select Document',
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.launchImageLibrary(options, (response) => {
          //toast('Response = ', JSON.stringify(response.uri));

          if (response.didCancel) {
            toast('User cancelled image picker');
          }
          else if (response.error) {
            toast('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            toast('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };

            this.setState({isLoading: true});
            RNFS.readFile(response.uri, "base64").then(res => {
                const {params} = this.props.navigation.state;

                User.SendUserDoc(params.user.UserCode, HCDocTypeCode, response.fileName, res).then(() => {
                    toastI("doc_added");
                    this.setState({refreshing: false, isLoading: false})
                    this.loadData(true);
                }).catch(() => {
                    //toast(JSON.stringify(err))
                    toastI("err");
                    this.setState({refreshing: false, isLoading: false})
                });

                //toast(res)
            }).catch(() => {
                toastI("err");
                this.setState({refreshing: false, isLoading: false});
            });
          }
        });
    }

    addDoc(HCDocTypeCode) {
        if(C.isAndroid) this.addDocAndroid(HCDocTypeCode);
        else this.addDocIOS(HCDocTypeCode);
    }

    addDocAndroid(HCDocTypeCode) {
        //toast('HCDocTypeCode = '+ HCDocTypeCode);

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.images()],
        },(error, response) => {
            if(!response || !response.uri || error) {
                toast("**Error: " + (error ? error : "Error in accessing Gallary"))
                return
            }

            this.setState({isLoading: true});
            RNFS.readFile(response.uri, "base64").then(res => {
                const {params} = this.props.navigation.state;

                User.SendUserDoc(params.user.UserCode, HCDocTypeCode, response.fileName, res).then(() => {
                    toastI("doc_added");
                    this.setState({refreshing: false, isLoading: false})
                    this.loadData(true);
                }).catch(() => {
                    //toast(JSON.stringify(err))
                    toastI("err");
                    this.setState({refreshing: false, isLoading: false})
                });

                //toast(res)
            }).catch(() => {
                toastI("err");
                this.setState({refreshing: false, isLoading: false});
            });
        });

        /*
        FilePickerManager.showFilePicker(null, (response) => {

            if (response.didCancel) {
                //toast('User cancelled file picker');
            }
            else if (response.error) {
                //toast('**Error: ' + response.error);
                toastI("err");
            }
            else {
                this.setState({isLoading: true});
                RNFS.readFile(response.path, "base64").then(res => {
                    const {params} = this.props.navigation.state;

                    //toast(JSON.stringify(response))
                    WebApi(WS.SendUserDoc, {
                        UserCode: params.user.Code,
                        HCDocTypeCode: HCDocTypeCode,
                        FileName: this.getFileName(response.path),
                        File: res
                    }).then(() => {
                        toastI("doc_added");
                        this.setState({refreshing: false, isLoading: false})
                        this.loadData(true);
                    }).catch(() => {
                        //toast(JSON.stringify(err))
                        toastI("err");
                        this.setState({refreshing: false, isLoading: false})
                    });

                    //toast(res)
                }).catch(() => {
                    toastI("err");
                    this.setState({refreshing: false, isLoading: false});
                });
            }
        });

        //*/
    }

    /*
    addDoc() {
        FilePicker.show(
            {
                title: "File Picker"
            },
            (response) => {
                //toast('Response = '+ JSON.stringify(response));
                this.setState({resp: response.fileName})
                if (response.didCancel) {
                    toast('User cancelled file chooser');
                }
                else if (response.error) {
                    toast('FileChooserManager Error: ' + response.error);
                }
                else {
                    var uri = decodeURIComponent(response.uri).toString();
                    toast(uri)
                    this.setState({refreshing: true})
                    RNFS.readFile(uri, "base64").then(res => {
                        const {params} = this.props.navigation.state;

                        WebApi(WS.SendUserDoc, {
                            UserCode: params.user.Code,
                            FileName: response.fileName,
                            File: res
                        }, res => {
                            toast(JSON.stringify(res))
                            this.setState({refreshing: false})
                            this.loadData(false)
                        }, err => {
                            toast(JSON.stringify(err))
                            this.setState({refreshing: false})
                        })

                        toast(res)
                    }).catch(err => {
                        toast(err.message)
                        this.setState({refreshing: false})
                    });

                }
            });
    }
    //*/

    /*
    addDoc2() {
        toast("Adding new document!");

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            toast("Response = ", response);

            if (response.didCancel) {
                toast("User cancelled photo picker");
            }
            else if (response.error) {
                toast("ImagePicker Error: ", response.error);
            }
            else if (response.customButton) {
                toast("User tapped custom button: ", response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({

                    ImageSource: source

                });
            }
        });



    //*/


    renderFooter() {
        return (
            <Footer>
                <FooterTab>
                    <Button disabled={this.state.isLoading} active={!this.state.isLoading} onPress={() =>  ActionSheet.show({
                            options: DocTypeActs,
                            cancelButtonIndex: DocTypeActs.length-1,
                            //destructiveButtonIndex: 1,
                            title: I18n.t("select_option")
                        },
                        buttonIndex => {
                            if (buttonIndex === DocTypeActs.length-1) {return;}
                            this.addDoc(DocTypes[buttonIndex].HCDocTypeCode)
                            //toast(DocTypes[buttonIndex].Title)
                        }
                    )}>
                        <Icon name="add"/>
                        <Text style={styles.text}>{I18n.t("add_doc")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }

    getFileExt(fileName) {
        var dot = fileName.lastIndexOf(".")+1
        return fileName.substring(dot, fileName.length).toLowerCase()
    }

    openFile(path, fileName, ext) {
        FileViewer.open(path)
    }

    openFile0(path, fileName, ext) {
      //toast(path)
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
    /*
      OpenFile.openDoc([{
            url: "file://"+path,
            fileName: fileName,
            fileType: ext,
            cache:true,
        }], (error, url) => {
            if (error) {
                //toast("Error: "+ error);
                toastI("err");
            } else {
                //toast("url: "+url)
            }
        })//*/
    }

    openDocIOS(doc) {
        //var ext = this.getFileExt(doc.FileName)
        this.setState({isLoading: true})
        OpenFile.openDoc([{
            url: CreateUri(WS.GetSingleUserDoc, {UserDocCode: doc.Code})+"&fileName="+doc.FileName,
            //url: 'http://cdn.asriran.com/files/fa/news_albums/603988/20767/resized/resized_836002_458.jpg',
            fileNameOptional: doc.FileName
          }], (error, url) => {
            this.setState({isLoading: false})
              if (error) {
                toastI("err");
              } else {
                console.log(url)
              }
            })
    }

    openDoc(doc) {
        if(C.isAndroid) this.openDocAndroid(doc);
        else this.openDocIOS(doc);
    }

    openDocAndroid(doc) {
        var ext = this.getFileExt(doc.FileName)

        var path = SavePath + "/DOC_" + doc.Code + "." + ext;

        RNFS.exists(path).then(res => {
            if(res) {
                this.openFile(path, doc.FileName, ext)
            } else {
                this.setState({isLoading: true})
                var df = RNFS.downloadFile({
                    fromUrl: CreateUri(WS.GetSingleUserDoc, {UserDocCode: doc.Code}),
                    //fromUrl: 'http://cdn.asriran.com/files/fa/news_albums/603988/20767/resized/resized_836002_458.jpg',
                    toFile: path
                });//.then(res => toast(JSON.stringify(res))).catch(err => JSON.stringify(err));

                df.promise.then(res => {

                    this.openFile(path, doc.FileName, ext)
                    this.setState({isLoading: false, refreshing: false})
                    //toast(JSON.stringify(res));
                }).catch(err => {
                    this.setState({isLoading: false, refreshing: false})
                    toast("1: " + JSON.stringify(err))
                });
            }
        })
    }

    verified(data) {
        return data.VerficationStatus == I18n.t('verified')
    }

    renderRow(data) {
        return (
            <ListItem
                style={{backgroundColor: !this.verified(data) ? C.dcolor2 : "#fff"}}
                thumbnail
                onPress={() => this.openDoc(data)}
                onLongPress={() =>  ActionSheet.show({
                        options: Acts,
                        cancelButtonIndex: 0,
                        destructiveButtonIndex: 1,
                        title: I18n.t("select_option")
                    },
                    buttonIndex => {
                        if(buttonIndex == 0) this.askToDelete(data)
                    }
                )}
            >
                <Left>
                    <Thumbnail square size={55} source={menu_data.menu_icons[data.HCDocTypeCode]} />
                </Left>
                <Body>
                <Text style={[styles.text, styles.size16, styles.c1]}>
                    {this.getDocType(data.HCDocTypeCode)}
                </Text>
                <Text style={[styles.text, styles.small]} numberOfLines={1} note>
                    {data.VerficationStatus}
                </Text>
                </Body>
                <Right>
                    <Button onPress={() => this.openDoc(data)} transparent>
                        <Text style={[styles.text, styles.small, styles.c3]}>{I18n.t("view")}</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    renderRow2(data) {
        return (
            <ListItem
                button
                onPress={() => this.openDoc(data)}
                onLongPress={() =>  ActionSheet.show({
                        options: Acts,
                        cancelButtonIndex: 0,
                        destructiveButtonIndex: 1,
                        title: I18n.t("select_option")
                    },
                    buttonIndex => {
                        if(buttonIndex == 0) this.askToDelete(data)
                    }
                )}
            >
                <Left>
                    <Text style={styles.text}>
                        {this.getDocType(data.HCDocTypeCode)}
                    </Text>
                    <Text note style={styles.text}>
                        {data.VerficationStatus}
                    </Text>
                </Left>
                <Right><Icon name={V.darrow}/></Right>
            </ListItem>
        )
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.loadData(false);
    }

    renderContent1() {
        return (
            <Text>{this.state.resp}</Text>
        )
    }

    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        <List
                            refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                            onRefresh={() => this.loadData(false)}/>}
                            dataArray={this.state.data}
                            renderRow={data => this.renderRow(data)}/>
                    </Content> : this.noData()
                }
            </Loader>
        );
    }


}

export default SingleDocsWalet;
