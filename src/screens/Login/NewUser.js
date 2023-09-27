import React from "react";
import {Button, Container, Content, Footer, FooterTab, Form, Icon, Input, Item, Label, Text, View, Radio} from "native-base";
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

class NewUser extends BaseNext {
    constructor(props) {
        super(props)
        //const {params} = this.props.navigation.state;
        this.state = {
            isLoading: false,
            user: '',
            fullName: '',
            gender: 1,
            pass1: '',
            pass2: '',
        };
    }

    notValidUserPass() {
        return !this.validUserName(this.state.user) || this.state.pass1 != this.state.pass2 || !this.state.pass1 || this.state.pass1.length < 4;
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
            <View style={{height: styles.normalFontSize(400), width: "100%"}}>

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
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("full_name")}</Label>
                        <Input
                            value={this.state.fullName}
                            style={[styles.text, styles.size16]}
                            keyboardType='default'
                            onChangeText={(val) => this.setState({fullName: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                    <Item floatingLabel  style={styles.item}>
                        <Label style={nt}>{I18n.t("pass")}</Label>
                        <Input
                            style={[styles.text, styles.size16]}
                            value={this.state.pass1}
                            secureTextEntry
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({pass1: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                    <Item floatingLabel  style={styles.item} last>
                        <Label style={nt}>{I18n.t("repass")}</Label>
                        <Input
                            style={[styles.text, styles.size16]}
                            value={this.state.pass2}
                            secureTextEntry
                            keyboardType='numeric'
                            onChangeText={(val) => this.setState({pass2: val})}
                            disabled={this.state.isLoading}/>
                    </Item>
                    <Item style={styles.item} last>
                        <Label style={nt}>{I18n.t("gender")+':   '}</Label>

                        <Label style={nt}>{I18n.t("male")+'  '}</Label>
                        <Radio selected={this.state.gender == 1} onPress={() => this.setState({gender: 1})} />
                        <Label style={nt}>{'     ' + I18n.t("female")+'  '}</Label>
                        <Radio selected={this.state.gender == 2} onPress={() => this.setState({gender: 2})} />
                    </Item>
                </Form>

            </View>
        </View>);
    }


    renderFooter() {
        return (<Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.createNewUser()} disabled={this.notValidUserPass()}>
                            <Icon name="person-add"/>
                            <Text style={styles.text}>{I18n.t("create_new_user")}</Text>
                        </Button>

                    </FooterTab>
                </Footer>
            </Loader>
        );
    }

    createNewUser() {
        const {user, gender, fullName, pass1} = this.state

        this.setState({isLoading: true})

        WebApi(WS.CreateUser, {
            CellPhone: user[0] == "0" ? user : "0"+user,
            FullName: fullName,
            HCGenderCode: gender,
            Password: pass1
        }).then(res => {
            this.setState({isLoading: false})
            //toast(res.result)
            if(res.success == "1") {
                this.props.navigation.navigate("ActivateUser", {user: this.state.user, pass: pass1})
            } else toast(res.result)

        }).catch(err => {
            toast(I18n.t('err'))
            this.setState({isLoading: false})
        })
        //*/
    }

    getTitle = () => I18n.t("create_new_user");


}

export default NewUser;
