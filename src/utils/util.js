import { ToastAndroid, Linking} from "react-native";
import I18n from "../I18n";
import V from "../theme/variables/platform"
import C from "../theme/variables/commonColor"
import {Toast} from "native-base";
import styles from "../screens/styles"

const toast1 = (message) => {
    //ToastAndroid.show(message, ToastAndroid.LONG)
}

const toastI = (i18nCode) => {
    //ToastAndroid.show(I18n.t(i18nCode), ToastAndroid.LONG)
    toast(I18n.t(i18nCode))

}

const toast = (message) => {
    if(C.isAndroid) {
        ToastAndroid.show(message, ToastAndroid.LONG)
    } else {
        Toast.show({
            text: message,
            duration: 4000,
            buttonText: I18n.t("ok"),
            textStyle: {
                color: C.dcolor2,
                fontFamily: V.dfont,
            },
            style: {
                backgroundColor: C.dcolor1,
                alignItems: "center",
                justifyContent: "center"
            }
        });
    }
}

const openURL = (url) => {
    if(!url) {
        toast("Empty URL")
        return
    }
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            toast("Don't know how to open URI: " + url);
        }
    });
}

const tdeb = (message) => {
    //toast(JSON.stringify(message))
}

module.exports = {
    toast,
    toastI,
    tdeb,
    openURL
}

