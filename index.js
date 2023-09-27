import React, {Component} from "react";
//import {Icon} from "react-native";
import { AppRegistry, I18nManager, Alert } from "react-native";

import firebase from "react-native-firebase";
import I18n from "./src/I18n";
import App from "./App";
import "./src/global"
import {CreateUri, WebApi, WS} from "./src/services/Api";
import {tdeb} from "./src/utils/util"
//import styles from "./src/screens/styles.js"
global.firstTime = true;


	
onAd = message => {
	if (global && global.dropdown) {
		global.dropdown.alertWithType("success", I18n.t("you_have_new_message"), message);
	}
};



firebase.messaging().onMessage(message => {
    //if(!message.opened_from_tray) Alert.alert(I18n.t('you_have_new_message'), message.fcm.body);
    //tdeb(message.fcm.body)
    //
	onAd(message.fcm.body);
});


firebase.messaging().onTokenRefresh(newToken => {
    if(!global || !global.user) return;

    WebApi(WS.UpdateToken, {
        UserCode: global.user.Code,
        Token: newToken
    });

});





I18nManager.forceRTL(true);

AppRegistry.registerComponent("NativebaseKitchenSink", () => App);


