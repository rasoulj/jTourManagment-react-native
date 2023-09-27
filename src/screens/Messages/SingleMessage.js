import BaseNext from "../BaseNext";
import React, {Component, Dimensions} from "react";
import {
    Container,
    Header,
    Title,

    Content,
    Button,
    Icon,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Left,
    Right,

    Body,
    ListItem,
    List,
    H2,
    Footer,
    FooterTab
} from "native-base";
import {toast} from "../../utils/util"
import I18n from "../../I18n";
import styles from "../styles";



class SingleMessage extends BaseNext {
    constructor(props) {
        super(props);
    }


    getTitle() {
        const {message} = this.props.navigation.state.params;
        return I18n.t('message_from') + ' ' + message.Sender;
    }

    renderContent() {
        const {message} = this.props.navigation.state.params;
        const nt = [styles.text, styles.c1, styles.small];
        return (
            <Card style={styles.mb}>
                <CardItem bordered>
                    <Left>
                        <Body>
                        <Button transparent>
                            <Icon name="ios-contact"/>
                            <Text style={nt}>{message.Sender}</Text>
                        </Button>
                        <Button transparent>
                            <Icon name="calendar"/>
                            <Text style={nt}>{message.SDate}</Text>
                        </Button>

                        </Body>
                    </Left>
                </CardItem>
                <CardItem bordered>
                    <Text numberOfLines={50} style={nt}>{message.MessageContent}</Text>
                </CardItem>
            </Card>
        );
    }

    renderFooter() {
        const {message, delCommand} = this.props.navigation.state.params;
        const {navigation} = this.props;
        return (
            <Footer>
                <FooterTab>
                    <Button active={true} onPress={() =>  navigation.goBack()}>
                        <Icon name="md-return-right"/>
                        <Text style={styles.text}>{I18n.t("return")}</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button active={true} onPress={() =>  {
                        navigation.goBack();
                        delCommand()
                    }}>
                        <Icon name="close"/>
                        <Text style={styles.text}>{I18n.t("delete")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }

}

export default SingleMessage;
