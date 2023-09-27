import React, {Component} from "react";
import {View, StatusBar, Image} from "react-native";
import {
    Container,
    Button,
    H3,
    Header,
    Left,
    Text,
    Icon,
    Body,
    Title,
    Right,
    Content,
    Card,
    CardItem,
} from "native-base";

import styles from "../styles";
import V from "../../theme/variables/platform"

import I18n from "../../I18n";
import Base from "../Base";
import C from "../../theme/variables/commonColor";
//import {NavigationActions} from "react-navigation";
//import I18n from "../../I18n";
//import {Toast} from "native-base/index";
const logo = require("../../../assets/icon/logo2.png");


class BaseNext extends Component {

    getTitle() {
        return "(Unknown)"
    }

    noData() {
        return Base.renderNoData()
    }

    renderRightHeader() {
        return C.isAndroid ? (<Image  source={logo}/>) : (<View/>)
    }

    renderTitle(title) {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
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

    renderFooter() {
        return (undefined)
    }

    renderBody() {
        return (
            <Content padder>
                {this.renderContent()}
            </Content>
        )
    }

    renderContent() {
        return (<View/>)
    }

    render() {

        return (
            <Container style={styles.container}>
                {this.renderTitle(this.getTitle())}

                {this.renderBody()}

                {this.renderFooter()}
            </Container>
        );
    }


}

export default BaseNext;
