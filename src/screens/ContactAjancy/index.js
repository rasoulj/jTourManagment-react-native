import React, {Component} from "react";
import {Linking, View} from "react-native";
import {WebApi, WS} from "../../services/Api";
import call from "react-native-phone-call";

import {
    Container,
    Button,
    Text,
    Content,
    Footer,
    FooterTab,
    Textarea,
    Icon
} from "native-base";
import C from "../../theme/variables/commonColor";

import {toast, toastI, openURL} from "../../utils/util";
import Loader from "../../utils/Loader";

//*/
//import styles from "./styles";
//import {NavigationActions} from "react-navigation";
import I18n from "../../I18n";
//import {Toast} from "native-base/index";

import Base from "../Base"
import styles from "../styles";


class ContactAjancy extends Base {
    constructor(props) {
        super(props);
        this.state = {
            hints: "",
            data: [],
            refreshing: false,
            isLoading: false
        }
    }

    componentDidMount() {
        this.loadData(true)
    }


    loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})

        WebApi(WS.GetSettings, {}).then(res => {
            this.setState({data: res, refreshing: false, isLoading: false})
        }).catch(err => {
            this.setState({data: [], refreshing: false, isLoading: false})
            toastI('err');
        })
    }


    getTitle() {
        return I18n.t("contact_with_ajency");
    }

    testRas2() {
        //SendIntentAndroid.sendPhoneDial('+55 48 9999-9999');
    }




    doCommand(btn) {
        const {route} = btn
        if(route.startsWith("http")) openURL(route)
        else {
            call({
                number: route,
                prompt: false
            }).catch(err => toast(I18n.t("err")))
        }
    }



    renderContent() {

        return (
            <View>
                {
                    this.state.data.map((btn, index) => Base.renderButton(index, btn, () => this.doCommand(btn)))
                }
                <View style={{marginTop: styles.normalFontSize(10), marginBottom: styles.normalFontSize(10), borderBottomColor: C.dcolor1, borderBottomWidth: 0.5,}} />
                <Textarea
                    style={[styles.text, styles.c1, styles.size16]}
                    value={this.state.hints}
                    rowSpan={5}
                    bordered
                    onChangeText={(val) => this.setState({hints: val})}
                    placeholder={I18n.t("your_message")} />

            </View>
        )

    }


    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        {this.state.data.map((btn, index) => Base.renderButton(index, btn, () => this.doCommand(btn)))}
                        <View style={{marginTop: styles.normalFontSize(10), marginBottom: styles.normalFontSize(10), borderBottomColor: C.dcolor1, borderBottomWidth: 0.5,}} />
                        <Textarea
                            style={[styles.text, styles.c1, styles.size16]}
                            value={this.state.hints}
                            rowSpan={5}
                            bordered
                            onChangeText={(val) => this.setState({hints: val})}
                            placeholder={I18n.t("your_message")} />

                    </Content> : this.noData()
                }
            </Loader>
        )
    }


    sendAnswers() {
        const {user} = this.props.navigation.state.params;

        WebApi(WS.SendMessage, {
            UserCode: user.Code,
            Message: this.state.hints
        }).then(res => {
            toast(I18n.t("message_sent"))
            this.setState({hints: ""})
        }).catch(err => I18n.t("err"))
    }


    renderFooter() {
        return (
            <Footer>
                <FooterTab>
                    <Button active={this.state.hints.length !== 0} disabled={this.state.hints.length === 0} onPress={() => this.sendAnswers()}>
                        <Icon name="md-send"/>
                        <Text style={styles.text}>{I18n.t("send_message")}</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button active={this.state.hints.length !== 0} disabled={this.state.hints.length === 0} onPress={() => this.setState({hints: ""})}>
                        <Icon name="md-refresh-circle"/>
                        <Text style={styles.text}>{I18n.t("clear")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }



}

export default ContactAjancy;
