import React from "react";
import {Alert, Image, TouchableOpacity, View, Platform} from "react-native";
import {Button, Container, Content, H3, Header, Icon, Left, Right, Text, Title} from "native-base";
import I18n from "../../I18n";
import menu_data, {guest_data, logged_datas, menu_icons, StoreName} from "../SideBar/menu_data";
import Base from "../Base";
import C from "../../theme/variables/commonColor";
import variable from "../../theme/variables/platform";
import store from "react-native-simple-store";
import {NavigationActions} from "react-navigation";
import {toast, openURL} from "../../utils/util";
import RNRestart from 'react-native-restart';
import {ReservationLink} from "../../services/Api"

import firebase from "react-native-firebase";
import styles from "../styles";

//var firebase = C.isAndroid ? require('react-native-firebase') : null;


var SplashScreen = require('@remobile/react-native-splashscreen');


//const launchscreenBg = require("../../../assets/launchscreen-bg.png");



global.withMessage = false;

class Home extends Base {

    constructor(props) {
        super(props);

        this.state = {
            user: global.user
        };

        if(!global.user) {
            store.get(menu_data.StoreName).then(res => {
                    if (res) {
                        this.setState({user: res});
                        global.user = res;

                        console.log("res.LoginTimes: " + res.LoginTimes)

                        store.get("LoginTimes").then(lt => {
                            if(lt) return;
                            store.update("LoginTimes", "100");
                            if(res.LoginTimes <= 1) this.openProfile(res)
                        })


                    }
                }
            );
        }

    }

    openProfile(user) {
        const {navigate} = this.props.navigation;
        navigate("MyProfile", {user})
    }

    static openReservationLink() {
        openURL(ReservationLink())
    }

    componentDidMount() {

        store.get("FT").then(res => {
            if(res) {

                //console.log(res)
                return;
            }

            store.update("FT", "FT");
            RNRestart.Restart();
        })


        if(C.isAndroid) SplashScreen.hide();

	//TODO
        if(C.isAndroid) {
            firebase.messaging().getInitialNotification().then(obj => {
                //global.withMessage = true;
                if (obj.from && global.firstTime) {
                    this.doCommand(menu_data.logged_datas[10]);
                    global.firstTime = false;
                }
                //tdeb(obj.from);
            });
        }
	//*/

    }


    getTitle = () => this.state.user ? this.state.user.FullName : I18n.t("home");


    login(user) {
        store.update(menu_data.StoreName, user);

        //this.setState({user: user})
    }

    doCommand(btn) {
        const {navigate} = this.props.navigation;
        if (btn.command == 2) {
            this.logout();
        } else if(btn.command == 3) {
            Home.openReservationLink()
        } else {
            navigate(btn.route, {user: this.state.user});
        }

    }

    logout222() {
        store.delete(menu_data.StoreName)
        toast(I18n.t('by'));
        this.setState({user: undefined})
        global.user = null;
        RNRestart.Restart();
    }

    logout() {

        Alert.alert(
            I18n.t("ask"),
            I18n.t("ask_to_logout"),
            [
                {text: I18n.t("no"), style: "cancel"},
                {
                    text: I18n.t("yes"), onPress: () => {
                        global.user = null;
                        store.delete(menu_data.StoreName);
                        toast(I18n.t("by"));
                        this.setState({user: undefined, unReadCount: 0});
                        RNRestart.Restart();
                    }
                },
            ],
            {cancelable: false}
        );

    }


    getMenuData = () => (this.state.user ? menu_data.logged_datas : menu_data.guest_data).filter((p, i) => i != 0);

    renderContent() {
        return (
            <View style={{alignItems: 'center'}}>
                {!this.state.user &&
                <View style={{width: styles.normalFontSize(150), height: styles.normalFontSize(150)}}>
                    <Image source={require("../../../assets/icon/logo.png")}/>
                </View>
                }
                {this.getMenuData().map((btn, index) => Base.renderButton(index, btn, () => this.doCommand(btn)))}
                <View style={{marginTop: styles.normalFontSize(10), marginBottom: styles.normalFontSize(10)}} />
            </View>
        )

    }

}

export default Home;
