const React = require("react-native");
const {Platform, Dimensions} = React;
import {PixelRatio} from "react-native"

import V from "../theme/variables/platform";
import C from "../theme/variables/commonColor"

const normalFontSize = (size) => size* Math.max(V.deviceHeight, V.deviceWidth)/592;
//const normalFontSize = (size) => PixelRatio.getPixelSizeForLayoutSize(size/2);

export default {
    normalFontSize,
    labelp: {paddingTop: normalFontSize(3)},
    headerMain: {
        height: V.deviceHeight / 3.5,
        marginBottom: normalFontSize(10),
        //backgroundImage: require("../../../assets/drawer-cover.png")
    },
    copyright: {
        fontFamily: V.dfont,
        fontSize: normalFontSize(13),
        color: "#999",
        textAlign: 'center',
        paddingBottom: normalFontSize(10)


    },
    container: {
        backgroundColor: "#fff"
    },
    headerMain2: {
        height: V.deviceHeight / 4,
        backgroundColor: C.dcolor1
        //backgroundImage: require("../../assets/cover.png")
    },
    mb: {
        marginBottom: normalFontSize(15)
    },
    drawerCover: {
        alignSelf: "stretch",
        height: V.deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: normalFontSize(10)
    },
    drawerImage: {
        position: "absolute",
        left: Platform.OS === "android" ? V.deviceWidth / 20 : V.deviceWidth / 9,
        top: Platform.OS === "android" ? 0 : V.deviceHeight / 12,
        //width: 100,
        //height: 100,
        resizeMode: "cover"
    },
    userName: {
        position: "absolute",
        left: Platform.OS === "android" ? V.deviceWidth / 20 : V.deviceWidth / 9,
        top: Platform.OS === "android" ? V.deviceWidth - 30 : V.deviceHeight / 12,
        //width: 100,
        //height: 100,

        color: "white",
        fontSize: normalFontSize(18)
    },
    text: {
        fontFamily: V.dfont,
    },
    item: {
        height: normalFontSize(50),

    },
    small_text: {
        fontFamily: V.dfont,
        color: C.dcolor1,
        fontSize: normalFontSize(13),
        fontWeight: Platform.OS === "ios" ? "500" : "400",
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? normalFontSize(13) : normalFontSize(13),
        fontWeight: "400",
        color: '#fff',
        textAlign: "center",
        fontFamily: V.dfont,
        marginTop: Platform.OS === "android" ? -3 : undefined
    },
    menuBtn: {
        flex: 1,
        height: V.deviceHeight / 15,
        marginTop: normalFontSize(10),
        marginBottom: normalFontSize(10)
    },
    sketch_container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee',
    },
    c1: {
        color: C.dcolor1,
    },
    c2: {
        color: C.dcolor2,
    },
    c3: {
        color: C.dcolor3,
    },
    c4: {
        color: C.dcolor4,
    },
    signature: {
        flex: 1,
        borderColor: C.dcolor1,
        borderWidth: normalFontSize(4),
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: normalFontSize(50),
        backgroundColor: "#eeeeee",
        margin: normalFontSize(10)
    },
    size16: {
        fontSize: normalFontSize(16),
        fontWeight: Platform.OS === "ios" ? "500" : "400",
    },

    small: {
        fontSize: normalFontSize(13),
        fontWeight: Platform.OS === "ios" ? "500" : "400",
    },

    size24: {
        fontSize: normalFontSize(24),
        fontWeight: Platform.OS === "ios" ? "500" : "400",
    },



    /*

        text: {//SideBar
            fontWeight: Platform.OS === "ios" ? "500" : "400",
            fontSize: normalFontSize(16),
            marginLeft: 20,
            fontFamily: V.dfont,
            color: C.dcolor1
        },



        text: {
            fontWeight: Platform.OS === "ios" ? "500" : "400",
            fontSize: 16,
            marginLeft: 20,
            fontFamily: variable.dfont
        },


        text: { //tour.js
            color: C.dcolor1,
            bottom: 6,
            marginTop: 5,
            fontFamily: variable.dfont
        }


     */

};


