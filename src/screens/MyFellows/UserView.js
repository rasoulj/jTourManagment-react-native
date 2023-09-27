import React,{Component} from 'react';

import {ImageBackground, View, StatusBar, Image, TouchableOpacity, TextInput} from "react-native";
import Loader from "../../utils/Loader";

import {
    Container,
    Button,
    Text,
    Content,
    Icon,
    Form,
    Item,
    Label,
    Input,
    Radio,
    Footer,
    FooterTab

} from "native-base";
var moment = require('moment-jalaali')
//*/
//import styles from "./styles";
//import {NavigationActions} from "react-navigation";
import I18n from "../../I18n";
//import {Toast} from "native-base/index";
import BaseNext from "../BaseNext";
import V from "../../theme/variables/platform"
import styles from "../styles";
import {toast, toastI} from "../../utils/util";
import Login from "../Login";
import C from "../../theme/variables/commonColor";
import PersianDatePicker from '../../utils/PersianDatePicker';
import User from "../../services/User";




export default class UserView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user
        }
    }

    clearUser() {
        //this.setState({user: User.empty()})
        var em = User.empty()
        Object.keys(em).forEach(key => this.setUserParam(key, em[key], true))

        if(this.props.userChanged) this.props.userChanged(this.state.user)
    }

    setUserParam(param, val, silent) {
        var user = this.state.user;
        user[param] = val;
        var newState = {user: this.state.user}
        this.setState(newState)
        if(this.props.userChanged && !silent) this.props.userChanged(user)
    }

    validUserName() {
        return User.isValidUser(this.state.user.CellPhone);
    }

    mand() {
        return this.props.readOnly ? "" : ' ' + I18n.t("mand")
    }


    render() {
        var nt = [styles.text, {color: this.props.readOnly ? C.dcolor1 : C.dcolor3}, styles.small, styles.labelp];
        var nt2 = [styles.text, {color: C.dcolor1}, styles.small];
        var nt3 = [styles.text, {color: C.dcolor4}, styles.small];


        return (<View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{height: styles.normalFontSize(520), width: "100%"}}>

                <Form>
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("full_name")+this.mand()}</Label>
                        <Input
                            value={this.state.user.FullName}
                            style={[styles.text, styles.size16, {color: C.dcolor1}]}
                            keyboardType='default'
                            onChangeText={(val) => this.setUserParam('FullName', val)}
                            disabled={this.props.readOnly}/>
                    </Item>
                    <Item style={styles.item} last>
                        <Label style={nt}>{I18n.t("gender")+':   '}</Label>

                        <Label style={nt2}>{I18n.t("male")+'  '}</Label>
                        <Radio selected={this.state.user.HCGenderCode == 1} onPress={() => this.setUserParam('HCGenderCode', 1)} disabled={this.props.readOnly}  />
                        <Label style={nt2}>{'     ' + I18n.t("female")+'  '}</Label>
                        <Radio selected={this.state.user.HCGenderCode == 2} onPress={() => this.setUserParam('HCGenderCode', 2)} disabled={this.props.readOnly} />
                    </Item>
                    {!this.props.isProfile && !this.props.readOnly && <Text style={nt3}>({I18n.t('phone_mand_18')})</Text>}
                    {!this.props.isProfile && <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("user")+this.mand()}</Label>
                        <Input
                            value={this.state.user.CellPhone}
                            style={[styles.text, styles.size16, {color: this.validUserName() ? C.dcolor1 : C.dcolor4}]}
                            keyboardType='numeric'
                            onChangeText={(val) => this.setUserParam('CellPhone', val)}
                            disabled={this.props.readOnly}/>
                    </Item>}

                    <Item style={styles.item}>
                        <Label style={nt}>{I18n.t("birth_date")}</Label>
                        <PersianDatePicker
                            disabled={this.props.readOnly}
                            minDate="1300/1/1"
                            selectedDate={User.jDate(this.state.user.BirthDate)}
                            maxDate={User.curDate()}
                            onConfirm={darr =>  this.setUserParam("BirthDate", User.fromJDate(darr))}
                        />
                        {/*
                        <Input
                            value={this.props.fullName}
                            style={[styles.text, styles.size16]}
                            keyboardType='default'
                            onChangeText={(val) => this.setState({fullName: val})}
                            disabled={true}
                            onPress={() => this.showPicker()}
                        />*/}
                    </Item>
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("NationalID")+this.mand()}</Label>
                        <Input
                            value={this.state.user.NationalID}
                            style={[styles.text, styles.size16, {color: User.isValidCodeMelli(this.state.user.NationalID) ? C.dcolor1 : C.dcolor4}]}
                            keyboardType='numeric'
                            onChangeText={(val) => this.setUserParam('NationalID', val)}
                            disabled={this.props.readOnly}/>
                    </Item>
                    <Item floatingLabel style={styles.item}>
                        <Label style={nt}>{I18n.t("PassportNumber")}</Label>
                        <Input
                            value={User.gc(this.state.user.PassportNumber)}
                            style={[styles.text, styles.size16, {color: C.dcolor1}]}
                            keyboardType='numeric'
                            onChangeText={(val) => this.setUserParam('PassportNumber', val)}
                            disabled={this.props.readOnly}/>
                    </Item>

                    <Item floatingLabel style={[styles.item, {height: styles.normalFontSize(130)}]}>
                        <Label style={nt}>{I18n.t("about_me")}</Label>
                        <Input
                            multiline = {true}
                            numberOfLines = {5}
                            value={User.gc(this.state.user.AboutMe)}
                            style={[styles.text, styles.size16]}
                            keyboardType='default'
                            onChangeText={(val) => this.setUserParam('AboutMe', val)}
                            disabled={this.props.readOnly}/>
                    </Item>
                </Form>

            </View>


        </View>)
    }

}
