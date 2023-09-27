import React, {Component} from "react";
import {TouchableOpacity, View, Image} from "react-native";
import {
    Body, Button, Card, CardItem, Container, Content, H3, Header, Icon, Left, Right, Text,
    Title,
} from "native-base";
import DropdownAlert from "react-native-dropdownalert";
import V from "../../theme/variables/platform";
//TODO: import firebase from "react-native-firebase";

import styles from "../styles";
import I18n from "../../I18n";

import {guest_data, logged_datas, menu_icons, StoreName} from "../SideBar/menu_data";
import C from "../../theme/variables/commonColor";

const logo = require("../../../assets/icon/logo2.png");


class Base extends Component {

    getTitle() {
        return "(Unknown)";
    }

    noData() {
        return Base.renderNoData();
    }



    static renderNoData() {
        const nt = [styles.text, styles.c1, styles.small];
        const lt = [styles.text, styles.c1, styles.size24];
        return (
            <View style={{flex: 1, flexDirection: "row"}}>
                <Card style={styles.mb}>
                    <CardItem bordered>
                        <Left>
                            <Body>
                            <Button transparent>
                                <Icon style={lt} name="md-warning"/>
                                <Text style={nt}>{I18n.t("no_data")}</Text>
                            </Button>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </View>
        );
    }

	onClose(data) {
        // data = {type, title, message, action}
        // action means how the alert was closed.
        // returns: automatic, programmatic, tap, pan or cancel
    }


    static renderButton(index, btn, doCommand) {


        const bw = styles.normalFontSize(1.5);
        const st1 = {alignItems: "center", justifyContent: "center"};
        var cb = index % 2 == 1 ? C.dcolor1 : C.dcolor2;
        var cf = index % 2 == 0 ? C.dcolor1 : C.dcolor2;

        return (
            <View key={btn.route} style={{
                flex: 1,
                marginTop: styles.normalFontSize(5),
                marginBottom: styles.normalFontSize(5),
                flexDirection: "column",
                backgroundColor: cb,
                borderRadius: styles.normalFontSize(5)
            }}>
                <TouchableOpacity onPress={doCommand}>
                    <View style={styles.menuBtn}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}>
                            <View style={[st1, {width: "15%"}]}>
                                {/*<Image source={menu_data.menu_icons[btn.img]} style={{width: 32, height: 32}}/>*/}
                                <Icon name={btn.icon} style={[styles.size24, {color: cf}]}/>
                            </View>
                            <View style={[st1, {width: "75%", alignItems: "flex-start"}]}>
                                <Text style={[styles.text, styles.size16, {color: cf}]}>{btn.name}</Text>
                            </View>
                            <View style={[st1, {width: "10%", alignItems: "center"}]}>
                                <Icon name={V.darrow} style={[styles.size24, {color: cf}]}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

	renderImage() {
		return (<Icon name="ios-mail" style={styles.c1} />);
    }

    renderRight() {
        return C.isAndroid ? (<Image  source={logo}/>) : (<View/>)
    }

    renderTitle(title) {
        return (
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                <Title style={{fontFamily: V.dfont}}>{title}</Title>
                </Body>
                <Right>
                    {this.renderRight()}
                </Right>
				<DropdownAlert
                    ref={ref => global.dropdown = ref}
                    onClose={data => this.onClose(data)}
                    messageStyle={[styles.text, styles.c1]}
                    titleStyle={[styles.text, styles.c1]}
                    messageNumOfLines={10}
					renderImage= {() => this.renderImage()}
                    successColor="#D3A0BC"
                    inactiveStatusBarBackgroundColor="#512943"
                />

            </Header>
        );
    }

    renderBody() {
        return (
            <Content padder>
                {this.renderContent()}
            </Content>
        );
    }

    renderContent() {
        return (<View/>);
    }

    renderFooter() {
        return (undefined);
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

export default Base;
