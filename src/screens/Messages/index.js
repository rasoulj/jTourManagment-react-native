import React, {Component} from "react";
import Loader from "../../utils/Loader";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import C from "../../theme/variables/commonColor";
//import {setUnReadCount} from "../sidebar"

//import {ImageBackground, View, StatusBar} from "react-native";
/*
import {
    Container,
    Button,
    Text,
    Content
} from "native-base";

//*/
//import styles from "./styles";
//import {NavigationActions} from "react-navigation";
import I18n from "../../I18n";
//import {Toast} from "native-base/index";

import Base from "../Base"
import {WebApi, WS} from "../../services/Api";
import {toast} from "../../utils/util";
import styles from "../styles";
import V from "../../theme/variables/platform";
import {NativeModules, RefreshControl, Alert, Platform} from "react-native";
import {
    Button, Card, CardItem, Container, Content, Footer, FooterTab, H2, Header, Left, List, ListItem, Right,
    Text, Thumbnail, Title, View, ActionSheet, Body, Icon
} from "native-base";
import fa from "../../I18n/languages/fa";


const Acts = [
    I18n.t('delete'),
    I18n.t('cancel'),
]


class Messages extends Base {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            refreshing: false
        };
    }


    componentDidMount() {
        this.loadData(true)

        setInterval(() => this.loadData(false, true), 15000);
    }

    loadData(firstTime, live) {

        this.setState({refreshing: !firstTime && !live, isLoading: firstTime && !live})

        const {params} = this.props.navigation.state;

        WebApi(WS.GetUserMessages, {
            UserCode: params.user.Code
        }).then(res => {
            this.setState({data: res, refreshing: false, isLoading: false});
            //TODO:params.updateUI();
            //TODO:setUnReadCount(params.user.Code);
        }).catch(err => {
            this.setState({data: [], refreshing: false, isLoading: false});
            toast(JSON.stringify(err));
        });
    }


    getTitle() {
        return I18n.t('messages');
    }

    updateMessage(data, newStatus, th) {
        WebApi(WS.UpdateMessageStatus, {
            MessageCode: data.Code,
            HCMessageStatusCode: newStatus
        }).then(res => {
            this.loadData(false)
            th(data)
        })
    }

    showMessage(data) {
        //toast(data.MessageContent)
        this.props.navigation.navigate('SingleMessage', {message: data, delCommand: () => this.deleteDoc(data)})
    }


    openDoc(data) {
        if(data.HCMessageStatusCode == 2) this.showMessage(data)
        else this.updateMessage(data, 2, d => this.showMessage(d) )
    }

    askToDelete(doc) {
        Alert.alert(
            I18n.t('ask'),
            I18n.t('ask_to_del_doc'),
            [
                {text: I18n.t('no'), style: 'cancel'},
                {text: I18n.t('yes'), onPress: () => this.deleteDoc(doc)},
            ],
            { cancelable: false }
        )
    }

    deleteDoc(doc) {
        this.updateMessage(doc, 3, data => toast(I18n.t('successfuly_msg_deleted')))
    }


    renderRow(data) {
        return (
            <ListItem
                button
                onPress={() => this.openDoc(data)}
                onLongPress={() =>  ActionSheet.show({
                        options: Acts,
                        cancelButtonIndex: 0,
                        destructiveButtonIndex: 1,
                        title: I18n.t('select_option')
                    },
                    buttonIndex => {
                        if(buttonIndex == 0) this.askToDelete(data)
                    }
                )}
            >
                <Left>
                    <MCIcon name={data.HCMessageStatusCode == 1 ? 'email' : 'email-outline'} color={data.HCMessageStatusCode == 1 ? C.dcolor1 : C.dcolor2} size={styles.normalFontSize(30)} />
                    <Text style={[styles.text, styles.c1, styles.size16]}>
                        {data.SDate}
                    </Text>
                    <Text note style={[styles.text, styles.small]}>
                        {this.trimText(data.MessageContent, 20)}
                    </Text>
                </Left>
                <Right><Icon style={styles.size24} name={V.darrow}/></Right>
            </ListItem>
        )
    }

    trimText(text, maxLen) {
        var len = text.length;

        return len <= maxLen ? text : text.substring(0, maxLen) + "...";
    }

    renderRight() {
        return (
            <Button
                        transparent
                        onPress={() => this.loadData(false)}
                    >
                        <Icon name="refresh"/>
                    </Button>
        )
    }

    renderContent() {
        var all = this.state.data.filter(p => p.HCMessageStatusCode != 3)
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {
                    all.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        <List
                            refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                            onRefresh={() => this.loadData(false)}/>}
                            dataArray={all}
                            renderRow={data => this.renderRow(data)}/>
                    </Content> : this.noData()
                }
            </Loader>
        );
    }


    renderContent0() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>


                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        <List
                            refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                            onRefresh={() => this.loadData(false)}/>}
                            dataArray={this.state.data.filter(p => p.HCMessageStatusCode != 3)}
                            renderRow={data => this.renderRow(data)}/>
                    </Content>
            </Loader>
        );
    }



}

export default Messages;
