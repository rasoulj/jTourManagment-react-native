import React, {Component, Dimensions} from "react";
import {Alert, Image, Text, TouchableOpacity, ImageBackground} from "react-native";
import {Badge, Container, Content, Header, Icon, Left, List, ListItem, Right, Title, View,} from "native-base";
import C from "../../theme/variables/commonColor";
import {toast} from "../../utils/util";
import styles from "../styles";
import I18n from "../../I18n";
import store from "react-native-simple-store";
import Home from "../Home"
import menu_data from "./menu_data";
import RNRestart from "react-native-restart";
import {WebApi, WS} from "../../services/Api";
import MyProfile from "../Settings/MyProfile";

//const drawerImage = require("../../../assets/drawer-cover.png");

let mainScreen;
let busy = false;
let last = 0;


const imgStyle = {
    borderRadius: styles.normalFontSize(70),
    width: styles.normalFontSize(70),
    height: styles.normalFontSize(70),
    alignSelf: 'center',
    marginBottom: styles.normalFontSize(10),
    marginLeft: styles.normalFontSize(10)
}


const setUnReadCount = (UserCode) => {
    /*
    if(!mainScreen) return;
    if(busy) return;

    busy = true;
    WebApi(WS.GetUnreadUserMessagesCount, {UserCode: UserCode}).then(res => {
        var cnt = res.result*1;
        mainScreen.setUnRead(res.result);
        if(cnt > last) toast( (cnt-last)+' '+I18n.t('have_new_message') );
        last = cnt;
        busy = false;
    }).catch(() => {
        mainScreen.setUnRead("");
        busy = false;
    })
    //*/
};

//import LoginScreen from "../login"

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            unReadCount: ""
        };


        mainScreen = this;

        store.get(menu_data.StoreName).then((res) => {
                if (res) {
                    this.setState({user: res});
                }
            }
        );


        /*
        setInterval(() => this.updateUnReadCount(), 60000)
        setTimeout(() => this.updateUnReadCount(), 3000)
        //*/
    }

    setUnRead(unRead) {
        //this.setState({unReadCount: unRead})
    }


    updateUnReadCount() {
        //if (!this.state.user) return;
        //setUnReadCount(this.state.user.Code);
    }

    updateUnReadCount2() {
        if (!this.state.user) {
            return;
        }

        WebApi(WS.GetUserMessages, {
            UserCode: this.state.user.Code
        }).then(res => {
            var cnt = res.filter(p => p.HCMessageStatusCode == 1).length;
            if (cnt === this.state.unReadCount) {
                return;
            } else if (cnt > this.state.unReadCount) {
                toast((cnt - this.state.unReadCount) + " " + I18n.t("have_new_message"));
            }
            this.setState({unReadCount: cnt});
        }).catch(err => {
            this.setState({unReadCount: 0});
            //toast(err);
        });

    }

    getUserDisplayName() {
        return this.state.user ? this.state.user.FullName : I18n.t("guest");
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

    login(user) {
        this.setState({showLoginPage: false, user: user});
        global.user = user;

        store.update(menu_data.StoreName, user);

        this.updateUnReadCount();
    }


    doCommand(data) {
        if (data.command == 2) {
            this.logout();
        } else if(data.command == 3) {
            Home.openReservationLink()
        } else {
            this.props.navigation.navigate(data.route, {
                user: this.state.user,
                updateUI: () => this.updateUnReadCount()
            });
        }
    }

    renderRow(data) {

        return (<ListItem
            style={{borderBottomColor: C.dcolor1, borderBottomWidth: styles.normalFontSize(1), marginEnd: styles.normalFontSize(15), backgroundColor: C.dcolor2}}
            button
            noBorder
            onPress={() => this.doCommand(data)}
        >
            <Left>
                {
                    <Icon
                        active
                        name={data.icon}
                        style={[styles.c1, styles.size24, {
                            marginLeft: styles.normalFontSize(10),
                            width: styles.normalFontSize(24)
                        }]}
                    />}
                {false &&
                <Image source={menu_data.menu_icons[data.img]} style={{width: styles.normalFontSize(30), height: styles.normalFontSize(30)}}/>
                }
                <Text style={[styles.text, styles.c1, styles.size16, {marginLeft: styles.normalFontSize(20)}]}>
                    {data.name}
                </Text>
            </Left>
            {false && data.types &&
            <Right style={{flex: 1}}>
                <Badge
                    style={{
                        borderRadius: 3,
                        height: styles.normalFontSize(25),
                        width: styles.normalFontSize(72),
                        backgroundColor: data.bg
                    }}>
                    <Text ref={r => this.unReadBadge = r}
                          style={styles.badgeText}
                    >4</Text>
                </Badge>
            </Right>}
        </ListItem>);
    }

    renderHeader = () => {
        const bw = 1.5;
        const st1 = {
            borderBottomColor: C.dcolor1,
            //borderBottomWidth: bw,
            alignItems: "center",
            justifyContent: "flex-end"
        };
        var hin = this.state.user ? menu_data.logged_datas[10] : menu_data.guest_data[1];

        return (
            <ImageBackground source={require("../../../assets/cover.png")} style={styles.headerMain2}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}>

                    <View style={[st1, {width: "35%"}]}>
                        {/*<Icon style={[styles.text, styles.c2, styles.size24, {paddingBottom: styles.normalFontSize(10)}]} name="contact"/>*/}
                        <Image style={imgStyle} source={{uri: MyProfile.getImage(this.state.user ? this.state.user.Code : 0)}}/>
                    </View>
                    <View style={[st1, {width: "65%", alignItems: "flex-start"}]}>
                        <Text
                            style={[styles.text, styles.c2, styles.size16, {paddingBottom: styles.normalFontSize(10)}]}>{this.getUserDisplayName()}</Text>{/*I18n.t("user_managment")*/}
                    </View>
                    {false && <View style={[st1, {width: "8%", justifyContent: "flex-start"}]}>
                        <TouchableOpacity onPress={() => this.doCommand(menu_data.logged_datas[8])}>
                            {this.state.unReadCount > 0 &&
                            <Badge
                                style={{
                                    borderRadius: 3,
                                    height: styles.normalFontSize(35),
                                    width: styles.normalFontSize(35),
                                    backgroundColor: "red",
                                    alignItems: "center",
                                    justifyContent: "flex-end"
                                }}>
                                <Text style={styles.badgeText}>{this.state.unReadCount}</Text>
                            </Badge>}
                        </TouchableOpacity>
                    </View>}

                    {false && <View style={[st1, {width: "26%", alignItems: "center"}]}>
                        <View style={{
                            flex: 1,
                            margin: styles.normalFontSize(4),
                            padding: styles.normalFontSize(15),
                            borderRightColor: C.dcolor1,
                            borderRightWidth: bw,
                            justifyContent: "center"
                        }}>
                            <TouchableOpacity onPress={() => this.doCommand(hin)}>
                                <Icon name={hin.icon} style={[styles.text, styles.c1, styles.size24]}/>
                            </TouchableOpacity>

                        </View>

                    </View>}
                </View>
            </ImageBackground>
        );
    };

    getMenuData = () => (this.state.user ? menu_data.logged_datas : menu_data.guest_data);


    render() {

        return (
            <Container>
                {/*<LoginScreen
                    visible={this.state.showLoginPage}
                    closeReq={() => this.setState({showLoginPage: false})}
                    login={(user) => this.login(user)}
                />*/}
                <Content bounces={true} style={{flex: 1, backgroundColor: C.dcolor2, top: -1}}>
                    {this.renderHeader()}
                    <List dataArray={this.getMenuData()} renderRow={data => this.renderRow(data)}/>
                    {/*<List dataArray={datas} renderRow={data => this.renderRow(data)} />*/}
                </Content>
            </Container>
        );
    }
}

module.exports = {
    SideBar,
    setUnReadCount
};
