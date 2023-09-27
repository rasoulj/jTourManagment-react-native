import React from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {Button, Container, Content, H3, Header, Icon, Left, Right, Text, Title} from "native-base";

import I18n from "../../I18n";

import menu_data, {guest_data, logged_datas, menu_icons, StoreName} from "../SideBar/menu_data";
//const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

import Base from "../Base";
import C from "../../theme/variables/commonColor";

import variable from "../../theme/variables/platform";
import store from "react-native-simple-store";
import {NavigationActions} from "react-navigation";
import {toast} from "../../utils/util";


//const launchscreenBg = require("../../../assets/launchscreen-bg.png");

class TripTours extends Base {
    getTitle() {
        return I18n.t('trip_tours');
    }

    doCommand(btn) {
        this.props.navigation.navigate('SingleTours', {Title: btn.name, CatCode: btn.cat})
    }

    renderContent() {
        return [
            {cat: 1, icon: 'md-bus', name: I18n.t('tour_domestic'), route: "alaki1"},
            {cat: 2, icon: 'md-plane', name: I18n.t('tour_abroad'), route: "alaki2"},
        ].map((btn, index) => Base.renderButton(index, btn, () => this.doCommand(btn)))
    }

}

export default TripTours;
