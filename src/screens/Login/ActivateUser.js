import React from "react";
import {Button, Container, Content, Footer, FooterTab, Form, Icon, Input, Item, Label, Text, View, Radio} from "native-base";
import {Image} from "react-native"
import RNRestart from 'react-native-restart';
import I18n from "../../I18n";
import BaseNext from "../BaseNext";
import styles from "../styles";
import {toast, toastI} from "../../utils/util";
import Loader from "../../utils/Loader";
import C from "../../theme/variables/commonColor";
import {WebApi, WS} from "../../services/Api";
import store from "react-native-simple-store";
import menu_data from "../SideBar/menu_data";
import {NavigationActions} from "react-navigation";
import firebase from "react-native-firebase";

class ActivateUser extends BaseNext {
    constructor(props) {
        super(props)
        //const {params} = this.props.navigation.state;
        this.state = {
            isLoading: false,
            actCode: ''
        };
    }

    renderContent() {
        var nt = [styles.text, styles.c1, styles.small, styles.labelp];
        return (<View style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={{height: styles.normalFontSize(400), width: "100%"}}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={[styles.text, {textAlign: 'left'}]}>{I18n.t('activation_message')}</Text>
                </View>
                <Form>
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("activation_code")}</Label>
                        <Input
                            value={this.state.actCode}
                            style={[styles.text, {color: this.state.actCode.length == 4 ? "black" : "red"}]}
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({actCode: val})}
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
                            onPress={() => this.activateUser()}
                            visible={!this.state.isLoading}
                            disabled={this.state.actCode.length != 4}
                        >
                            <Icon name="contact"/>
                            <Text style={styles.text}>{I18n.t("user_activation")}</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Loader>
        );
    }

    removeHist() {
        RNRestart.Restart();
    }

    loginFailed() {
        toastI('failed_to_enter');
        this.setState({isLoading: false});
    }

    doLogin(token) {
        const {user, pass} = this.props.navigation.state.params;
        const {navigation} = this.props;
        //this.setState({isLoading: true});

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

    activateUser() {
        const {actCode} = this.state
        const {user} = this.props.navigation.state.params

        this.setState({isLoading: true})

        WebApi(WS.ActivateUser, {
            CellPhone: user[0] == "0" ? user : "0"+user,
            ActivationCode: actCode,
        }).then(res => {
            toast(res.result)
            //this.setState({isLoading: false})
            this.login()
        }).catch(err => {
            toast(I18n.t('err'))
            this.setState({isLoading: false})
        })
    }



    getTitle = () => I18n.t("user_activation");


}

export default ActivateUser;
