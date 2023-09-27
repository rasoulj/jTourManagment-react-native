import React, {Component} from "react";
import {ImageBackground, View, StatusBar, Image, TouchableOpacity, TextInput, Alert} from "react-native";
//import PersianDatePicker from '../../utils/PersianDatePicker';
import UserView from "../MyFellows/UserView"

const Acts = [
    I18n.t("delete"),
    I18n.t("cancel"),
]

const imgStyle = {
    borderRadius: styles.normalFontSize(150),
    borderColor: C.dcolor3,
    width: styles.normalFontSize(150),
    height: styles.normalFontSize(150),
    alignSelf: 'center',
}

import {selectDoc} from "../../services/OS"
var RNFS = require("react-native-fs");
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
    ActionSheet

} from "native-base";

import Loader from "../../utils/Loader";
import I18n from "../../I18n";
import BaseNext from "../BaseNext";
import V from "../../theme/variables/platform"
import styles from "../styles";
import {toast, tdeb} from "../../utils/util";
import C from "../../theme/variables/commonColor";
import User from "../../services/User";
import store from "react-native-simple-store";
import menu_data from "../SideBar/menu_data";
import RNRestart from 'react-native-restart';

class MyProfile extends BaseNext {
    getTitle() {
        return I18n.t('my_profile');
    }

    constructor(props) {
        super(props)

        const {user} = this.props.navigation.state.params;

        console.log(user)

        this.state = {
            user: user,
            readOnly: true,
            image: '',
            isLoading: false,
            Code: user.Code,
            isValid: User.isValid(user)
        }



    }

    /*
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState({isLoading: true})
        const {user} = this.props.navigation.state.params;

        console.log(user)


        User.GetUserInfo(user.Code).then(res => {
            this.setState({user: res[0], isLoading: false});
            //this.setState({isLoading: true})

        }).catch(() => this.setState({user: User.empty(), isLoading: false}))
    }
    //*/

    setUserParam(param, val) {
        var user = this.state.user;
        user[param] = val;
        var newState = {user: this.state.user}
        this.setState(newState)
    }


    setImage() {

        selectDoc(uri => {
            RNFS.readFile(uri, "base64").then(res => {
                this.setState({image: res})
                console.log(res)
            })
        }, err => toast(err))
    }

    askToDelete(doc) {
        Alert.alert(
            I18n.t("ask"),
            I18n.t("ask_to_del_fellow"),
            [
                {text: I18n.t("no"), style: "cancel"},
                {text: I18n.t("yes"), onPress: () => this.setState({image: "DELETE"})},
            ],
            {cancelable: false}
        )
    }

    static getImage(Code, image) {
        //var image = this.state.image

        if(!image) return User.getImageUrl(Code);
        else return image == "DELETE" ? User.getImageUrl(0) : 'data:image/png;base64,' + image

    }


    renderContent() {
        var nt = [styles.text, {color: this.state.readOnly ? C.dcolor1 : C.dcolor3}, styles.small];
        var nt2 = [styles.text, {color: C.dcolor1}, styles.small];

        var img = (<Image style={[imgStyle, {borderWidth: this.state.readOnly ? 0 : 2}]} source={{uri: MyProfile.getImage(this.state.Code, this.state.image)}}/>)

        return (<View style={{flex: 1, flexDirection: 'column'}}>

            <View style={{width: styles.normalFontSize(150), height: styles.normalFontSize(150), alignSelf: 'center', paddingTop: styles.normalFontSize(10), paddingBottom: styles.normalFontSize(15), alignItems: 'center'}}>
                {this.state.readOnly ? img : <TouchableOpacity   onPress={() => this.setImage()} onLongPress={() =>  ActionSheet.show({
                        options: Acts,
                        cancelButtonIndex: 0,
                        destructiveButtonIndex: 1,
                        title: I18n.t("select_option")
                    },
                    buttonIndex => {
                        if(buttonIndex == 0) this.askToDelete()
                    }
                )} >
                    {img}
                </TouchableOpacity>}
            </View>

            <UserView
                isProfile={true}
                readOnly={this.state.readOnly}
                user={this.state.user}
                userChanged={user => this.setState({isValid: User.isValid(user)})}
            />

        </View>)
    }
    //*/


    renderFooter() {
        return (<Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
            <Footer>
                <FooterTab>
                    <Button disabled={!(this.state.isValid || this.state.readOnly)} onPress={() =>  this.edit()}>
                        <Icon name={this.state.readOnly ? 'create' : 'checkmark'}/>
                        <Text style={styles.text}>{I18n.t(this.state.readOnly ? "edit" : "save")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Loader>);
    }

    edit() {

        if (this.state.readOnly) {
            this.setState({readOnly: false})
            return;
        }
        const {navigation} = this.props;

        var user = this.state.user;

        //user.UserCode = user.Code
        //if(this.state.image)
        user.File = this.state.image

        this.setState({isLoading: true})

        User.UpdateUser(this.state.user).then(res => {
            //toast(JSON.stringify(res))
            this.setState({isLoading: false})
            toast(res.result)

            if (res.success == 1) {
                store.update(menu_data.StoreName, user);
                RNRestart.Restart();
            }
        }).catch(err => {
            this.setState({isLoading: false})
            toast("Error: " + JSON.stringify(err))
        });


    }
}

export default MyProfile;
