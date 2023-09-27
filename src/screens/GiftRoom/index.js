//import React, {Component} from "react";
//import {ImageBackground, View, StatusBar} from "react-native";
/*
import {
    Container,
    Button,
    Text,
    Content
} from "native-base";

//*/
//import styles from "./styles";
//import {NavigationActions} from "react-navigation";
import I18n from "../../I18n";
//import {Toast} from "native-base/index";

import Base from "../Base"
import {CreateLDUri} from "../../services/Api"
import {openURL, toast} from "../../utils/util"
import User from "../../services/User"

class GiftRoom extends Base {
    getTitle() {
        return I18n.t('gift_room');
    }

    doCommand(btn) {
        const {user} = this.props.navigation.state.params;
        var url = CreateLDUri(btn.route, User.getLD(user.UserCode))
        console.log(url)
        openURL(url)
    }


    renderContent() {
        return [
            {name: I18n.t('Lottery'), route: 'Lottery', icon: 'ribbon'},
            {name: I18n.t('MyRewards'), route: 'MyRewards', icon: 'ios-rose'},
            {name: I18n.t('SelectReward'), route: 'SelectReward', icon: 'md-rose'},
            {name: I18n.t('MyRewardsEx'), route: 'MyRewardsEx', icon: 'ios-rose-outline'},
        ].map((btn, index) => Base.renderButton(index, btn, () => this.doCommand(btn)))
    }

}

export default GiftRoom;
