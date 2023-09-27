import React, {Component} from "react";
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
    FooterTab,
    Header,
    Left,
    Body,
    Title,
    Right

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
//import PersianDatePicker from '../../utils/PersianDatePicker';
import User from "../../services/User";
import UserView from "./UserView";



class SingleFellow extends BaseNext {
    getTitle() {
        return this.state.user.FullName ? this.state.user.FullName : I18n.t('new_user');
    }

    constructor(props) {
        super(props)

        const {params} = this.props.navigation.state;

        console.log("UserCode: " + JSON.stringify(params.user))

        var user = params.user ? params.user : User.empty()

        this.state = {
            readOnly: !params.isNew,

            user: user,
            isNew: params.isNew,
            isLoading: false,
            isValid: User.isValid(user)
        }
    }


    /*
    setUserParam(param, val) {
        var user = this.state.user;
        user[param] = val;
        var newState = {user: this.state.user}
        this.setState(newState)

    }
    //*/

    userChanged(user) {
        this.setState({isValid: User.isValid(user)})
    }

    renderContent() {
        return (<UserView
            readOnly={this.state.readOnly}
            user={this.state.user}
            userChanged={user => this.userChanged(user)}
            ref={ref => this.userView = ref}
        />)
    }

    renderTitle(title) {
        const {loadData} = this.props.navigation.state.params;
        return (
            <Header>
                <Left>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack()
                        loadData()
                    }}>
                        <Icon name="arrow-forward" />
                    </Button>
                </Left>
                <Body>
                <Title style={{fontFamily: V.dfont}}>{title}</Title>
                </Body>
                <Right>
                    {this.renderRightHeader()}
                </Right>
            </Header>
        )
    }

    edit(goNext) {

        if (this.state.readOnly) {
            this.setState({readOnly: false})
            return;
        }


        const {loadData, isNew, jurney, creator} = this.props.navigation.state.params;
        const {navigation} = this.props;

        var command = isNew ? User.CreateActiveUser(creator.Code, jurney.Code, this.state.user) : User.UpdateUser(this.state.user);

        this.setState({isLoading: true})

        command.then(res => {
            //toast(JSON.stringify(res))

            toast(res.result)
            this.setState({isLoading: false})

            if (res.success == 1) {
                if(goNext) {
                    this.userView.clearUser()
                    //loadData()
                } else {
                    navigation.goBack();
                    loadData()
                }
            }
        }).catch(err => {
            this.setState({isLoading: false})
            toast("Error: " + JSON.stringify(err))
        });


    }

    renderFooter() {
        const {navigation} = this.props;

        return (<Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
            <Footer>
                {this.state.isNew && <FooterTab>
                    <Button disabled={!this.state.isValid} onPress={() =>  this.edit(true)}>
                        <Icon name={'arrow-forward'}/>
                        <Text style={styles.text}>{I18n.t("save_next")}</Text>
                    </Button>
                </FooterTab>}

                {!this.state.isNew && <FooterTab>
                    <Button onPress={() =>  navigation.navigate('SingleDocsWalet', {user: this.state.user})}>
                        <Icon name={'md-briefcase'}/>
                        <Text style={styles.text}>{I18n.t("docs_walet")}</Text>
                    </Button>
                </FooterTab>}



                <FooterTab>
                    <Button disabled={!this.state.isValid && !this.state.readOnly} onPress={() =>  this.edit()}>
                        <Icon name={this.state.readOnly ? 'create' : 'checkmark'}/>
                        <Text style={styles.text}>{I18n.t(this.state.readOnly ? "edit" : "save")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Loader>);
    }

    /*
    renderRightHeader() {
        return (<View style={{flexDirection: 'row'}}>
            <Button transparent onPress={() => this.edit()}>
                <Icon name={this.state.readOnly ? 'create' : 'checkmark'} />
            </Button>
        </View>)
    }
    //*/

}

export default SingleFellow;
