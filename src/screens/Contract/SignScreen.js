import React, {Component} from "react";
import SignatureCapture from "react-native-signature-capture";

import {
    Button,
    Icon,
    Footer,
    FooterTab,
    Text,
    View
} from "native-base";

import BaseNext from "../BaseNext";
import styles from "../styles";
import I18n from "../../I18n";

import {Dimensions, PixelRatio, Platform} from "react-native";



class SignScreen extends BaseNext {

    constructor(props) {
        super(props)
        this.state = {
            empty: true,
            deviceHeight: Dimensions.get("window").height,
            deviceWidth: Dimensions.get("window").width,
        }
    }

    getTitle() {
        return I18n.t("sign");
    }

    sign2() {
        this.canvas.saveImage();
        const {navigation} = this.props;
        navigation.state.params.signed("DATA", navigation.state.params.contract)
        navigation.goBack()
    }

    sign() {

        this.canvas.saveImage()
    }

    _onSaveEvent(data) {
        const {navigation} = this.props;
        navigation.state.params.signed(data.encoded, navigation.state.params.contract);
        navigation.goBack();
    }

    clear() {
        this.canvas.resetImage();
        this.setState({empty: true});
    }

    painted() {
        this.setState({empty: false});
    }

    renderFooter() {
        const nt = [styles.text]
        return (
            <Footer>
                <FooterTab>
                    <Button active={true} disabled={this.state.empty} onPress={() => this.sign()} >
                        <Icon name="md-book" />
                        <Text style={nt}>{I18n.t("sign")}</Text>
                    </Button>
                    <Button active={true} disabled={this.state.empty} onPress={() => this.clear()}>
                        <Icon name="close" />
                        <Text style={nt}>{I18n.t("clear")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }



    renderContent() {
        var por = this.state.deviceWidth < this.state.deviceHeight;
        var c1 = 0.92;
        var c2 = 0.72;
        if(!por) {
            c1 = 0.72;
            c2 = 0.92;
        }
        return (
            <View style={styles.signature}>
                <SignatureCapture
                    style={[{width: this.state.deviceWidth * c1, height: c2 * this.state.deviceHeight}]}
                    ref={ref => this.canvas = ref}
                    onSaveEvent={(data) => this._onSaveEvent(data)}
                    onDragEvent={() => this.painted()}
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={ por ? "portrait" : "landscape"}/>
            </View>
        )
    }
    //*/
}

export default SignScreen;
