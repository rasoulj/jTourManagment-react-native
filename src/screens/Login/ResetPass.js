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
import Login from "./index"
import User from "../../services/User";

class ResetPass extends BaseNext {
    constructor(props) {
        super(props)
        const {params} = this.props.navigation.state;
        this.state = {
            isLoading: false,
            user: params.user,
        };
    }

    notValidUserPass() {
        return !this.validUserName(this.state.user);
    }


    validUserName() {
        return User.isValidUser(this.state.user);
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
                        <Label style={nt}>{I18n.t("user")}</Label>
                        <Input
                            value={this.state.user}
                            style={[styles.text, {color: this.validUserName() ? "black" : "red"}]}
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({user: val})}
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
                            onPress={() => this.resetPass()}
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


    resetPass() {
        const {user} = this.state

        this.setState({isLoading: true})

        WebApi(WS.RequestNewPassword, {
            CellPhone: user[0] == "0" ? user : "0"+user
        }).then(res => {
            toast(res.result)
            this.setState({isLoading: false})
        }).catch(err => {
            this.setState({isLoading: false})
            toast(I18n.t('err'))
        })
    }

    getTitle = () => I18n.t("reset_pass");


}

export default ResetPass;
