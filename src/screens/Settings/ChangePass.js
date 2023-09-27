import React from "react";
import {Button, Container, Content, Footer, FooterTab, Form, Icon, Input, Item, Label, Text, View} from "native-base";
import {Image} from "react-native"
import RNRestart from 'react-native-restart';
import I18n from "../../I18n";
import BaseNext from "../BaseNext";
import styles from "../styles";
import {toast} from "../../utils/util";
import Loader from "../../utils/Loader";
import C from "../../theme/variables/commonColor";
import {WebApi, WS} from "../../services/Api";
import store from "react-native-simple-store";
import menu_data from "../SideBar/menu_data";
import {NavigationActions} from "react-navigation";


class ChangePass extends BaseNext {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            old_pass: '',
            pass1: '',
            pass2: '',
        };
    }

    notValidUserPass() {
        const {old_pass, pass1, pass2} = this.state;
        return !old_pass || !pass1 || !pass2 || pass1 !== pass2;
    }

    renderContent() {
        var nt = [styles.text, styles.c1, styles.small, styles.labelp];

        return (<View style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{width: styles.normalFontSize(150), height: styles.normalFontSize(150)}}>
                <Image source={require("../../../assets/icon/logo.png")}/>
            </View>
            <View style={{height: styles.normalFontSize(300), width: "100%"}}>

                <Form>
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("old_pass")}</Label>
                        <Input
                            style={[styles.text, styles.size16]}
                            value={this.state.old_pass}
                            secureTextEntry
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({old_pass: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                    <Item floatingLabel  style={styles.item}>
                        <Label style={nt}>{I18n.t("pass1")}</Label>
                        <Input
                            style={[styles.text, styles.size16]}
                            value={this.state.pass1}
                            secureTextEntry
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({pass1: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                    <Item floatingLabel  style={styles.item} last>
                        <Label style={nt}>{I18n.t("pass2")}</Label>
                        <Input
                            style={[styles.text, styles.size16]}
                            value={this.state.pass2}
                            secureTextEntry
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({pass2: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                </Form>
            </View>
        </View>);
    }


    renderFooter() {
        return (
            <Loader loading={this.state.isLoading}>
                <Footer>
                    <FooterTab>
                        <Button
                            active={true}
                            onPress={() => this.changePass()}
                            visible={!this.state.isLoading}
                            disabled={this.notValidUserPass()}
                        >
                            <Icon name="md-refresh"/>
                            <Text style={styles.text}>{I18n.t("reset")}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Loader>
        );
    }


    changePass() {
        const {old_pass, pass1, pass2} = this.state;
        const {params} = this.props.navigation.state;

        this.setState({isLoading: true})

        WebApi(WS.LoginUser, {
            CellPhone: params.user.CellPhone,
            Password: old_pass
        }).then(res => {
            if(!res.length) {
                toast(I18n.t('cur_pass_wrong'))
                this.setState({isLoading: true})
            } else WebApi(WS.SetNewPassword, {
                UserCode: params.user.Code,
                Password: pass1
            }).then(res => {
                toast(res.result)
                this.setState({
                    old_pass: '',
                    pass1: '',
                    pass2: '',
                    isLoading: false
                })
                this.props.navigation.goBack()
            }).catch(err => {
                toast(I18n.t('err'))
                this.setState({isLoading: false})
            })
        }).catch(err => {
            toast(I18n.t('err'))
            this.setState({isLoading: false})
        })
    }

    getTitle = () => I18n.t("change_pass");



}

export default ChangePass;
