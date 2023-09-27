import React, {Component} from "react";
import {View, Text} from "react-native";
/*
import {
    Container,
    Button,
    Text,
    Content
} from "native-base";

//*/
import styles from "../styles";
//import {NavigationActions} from "react-navigation";
import I18n from "../../I18n";
//import {Toast} from "native-base/index";

import Base from "../Base"


class Settings extends Base {
    getTitle() {
        return I18n.t('settings');
    }

    doCommand(btn) {
        const {params} = this.props.navigation.state;

        const {navigate} = this.props.navigation;
        navigate(btn.route, {user: params.user});
    }


    renderContent() {
        return [
            {name: I18n.t('change_pass'), route: 'ChangePass', icon: 'medical'},
            {name: I18n.t('my_profile'), route: 'MyProfile', icon: 'contact'},
        ].map((btn, index) => Base.renderButton(index, btn, () => this.doCommand(btn)))
    }

    renderFooter() {
        return <View>
            <Text style={styles.copyright}>{I18n.t('version')}</Text>
        </View>
    }
}

export default Settings;
