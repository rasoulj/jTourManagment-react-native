import React from "react";
import {Button, Container, Content, Footer, FooterTab, Form, Icon, Input, Item, Label, Text, View} from "native-base";
import {Image} from "react-native";
import RNRestart from "react-native-restart";
import I18n from "../../I18n";
import BaseNext from "../BaseNext";
import styles from "../styles";
import {toast} from "../../utils/util";
import Loader from "../../utils/Loader";
import C from "../../theme/variables/commonColor";
import {WebApi, WS} from "../../services/Api";
import store from "react-native-simple-store";
import menu_data from "../SideBar/menu_data";
import firebase from "react-native-firebase";
import User from "../../services/User";
//var firebase = C.isAndroid ? require('react-native-firebase') : null;
var moment = require('moment-jalaali')



class Login extends BaseNext {
    getTitle = () => I18n.t("login");

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user: "",
            pass: "",

        };
    }

    loginFailed() {
        toast(I18n.t("login_failed"));
        this.setState({isLoading: false});
    }


    notValidUserPass() {
        return !this.state.pass || !this.validUserName(this.state.user);
    }

    validUserName() {
        return User.isValidUser(this.state.user);
    }

    /*
    static isValidUser(user) {
        for (var i = 0; i < user.length; i++) {
            if (user[i] < "0" || user[i] > "9") {
                return false;
            }
        }
        return (user.length == 10 && user[0] == "9") || (user.length == 11 && user[0] == "0" && user[1] == "9");
    }

    static curDate() {
        var m = moment(Date.now())
        return [m.jYear(), m.jMonth(), m.jDate()].join('/')
    }

    static isValidCodeMelli(code) {
        if(!code || !code.match('\[0-9]\{10}')) return false;
        var acc = 0;
        for(var i=10; i>=2; i--) acc = i*code[i-1];

        var rem = (1*code[0])%11
        if(rem >= 2) rem = 11 - rem
        return rem == 1*code[0]
    }
    //*/

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
            <View style={{height: styles.normalFontSize(500), width: "100%"}}>

                <Form>
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("user")}</Label>
                        <Input
                            value={this.state.user}
                            style={[styles.text, styles.size16, {color: this.validUserName() ? C.dcolor1 : C.dcolor4}]}
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({user: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label style={nt}>{I18n.t("pass")}</Label>
                        <Input
                            style={[styles.text, styles.size16]}
                            value={this.state.pass}
                            secureTextEntry
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({pass: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                </Form>
                {this.renderLoginButton()}
                <Button style={[{marginTop: styles.normalFontSize(10), alignItems: "center"}]}
                        onPress={() => this.props.navigation.navigate("ResetPass", {user: this.state.user})} block
                        transparent>
                    <Text style={[styles.text, styles.small]}>{I18n.t("forget_pass")}</Text>
                </Button>
                <Button style={[{marginTop: styles.normalFontSize(10), alignItems: "center"}]}
                        onPress={() => this.props.navigation.navigate("NewUser")} block
                        transparent>
                    <Text style={[styles.text, styles.small]}>{I18n.t("i_am_new_user")}</Text>
                </Button>
            </View>
        </View>);
    }


    removeHist() {
        RNRestart.Restart();
    }

    doLogin(token) {
        const {user, pass} = this.state;
        const {navigation} = this.props;
        this.setState({isLoading: true});

        WebApi(WS.LoginUser, {
            CellPhone: user[0] == "0" ? user : "0" + user,
            Password: pass,
            Token: token
        }).then(res => {
            if (!res.length) {
                this.loginFailed();
            } else {
                store.update(menu_data.StoreName, res[0]);
                setTimeout(() => {
                    this.removeHist();
                    toast(I18n.t("welcome"));
                    this.setState({isLoading: false});
                    //navigation.goBack();
                    //setTimeout( () => navigation.navigate("MyProfile", {user: res[0]}), 20)
                }, 3000);
                //navigation.state.params.login(res[0])
            }
        }).catch(err => {
            this.loginFailed();
        });
    }


    login() {
        if(C.isAndroid) {
            firebase.messaging().getToken().then(token => this.doLogin(token));
        } else this.doLogin('(From iOS)')
    }

    renderLoginButton() {
        return (
            <Loader loading={this.state.isLoading}>
            <Button
                full
                active={true}
                onPress={() => this.login()}
                visible={!this.state.isLoading}
                disabled={this.notValidUserPass()}
                style={{marginTop: styles.normalFontSize(10)}}
            >
                <Icon name="log-in"/>
                <Text style={styles.text}>{I18n.t("login")}</Text>
            </Button>
            </Loader>
        );
    }

    renderFooter2() {
        return (
            <Loader loading={this.state.isLoading}>
                <Footer>
                    <FooterTab>{this.renderLoginButton()}
                    </FooterTab>
                </Footer>
            </Loader>
        );
    }

}

export default Login;
