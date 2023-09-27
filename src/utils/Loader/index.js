import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, Text, View, Image } from 'react-native'
import C from "../../theme/variables/commonColor"


import I18n from "../../I18n"
import styles from "../../screens/styles";

export default class Loader extends Component {
    render() {
        const {loading, children, color, size} = this.props
        if (loading) {
            return <View style={{alignItems: 'center', paddingTop: 10}}>
                <Image source={require('../../../assets/load.gif')}  style={{width: styles.normalFontSize(80), height: styles.normalFontSize(80)}}/>
            </View>
            /*
            if (color) {
                return <ActivityIndicator size={size ? size : 40} color={color} />
            } else {
                return <ActivityIndicator size={size ? size : 40} color={C.dcolor1} />
            }
            //*/
        }
        return children ? <View>{children}</View> : <Text>{I18n.t('loading')}</Text>
    }
}
