import React, {Component} from "react";
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Title,
    Footer,
    FooterTab,
    Text,
    View
} from "native-base";
import BaseNext from "../BaseNext"
import {Image} from 'react-native'
import {CreateUri, WS} from "../../services/Api"
import I18n from "../../I18n";

import V from "../../theme/variables/platform";


class ContractText extends BaseNext {
    getTitle() {
        return I18n.t("contract_text");
    }

    renderBody() {
        return (
            <Content>
                {this.renderContent()}
            </Content>
        )
    }


    renderContent() {
        const {Code} = this.props.navigation.state.params.contract;
        var uri = CreateUri(WS.GetJourneyContract, {JourneyCode: Code})
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <View style={{ width: V.deviceWidth, height: 2.588*V.deviceWidth}}>
                    <Image style={{width: V.deviceWidth,  height: 2.588*V.deviceWidth}} source={{uri: uri}}></Image>
                </View>
            </View>
        )
    }
}

export default ContractText;
