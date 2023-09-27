import React, {Component} from "react";
import {RefreshControl} from "react-native";
import Loader from "../../utils/Loader";
import {WebApi, WS} from "../../services/Api"

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
    View
} from "native-base";

import {toast, toastI} from "../../utils/util";

import styles from "../styles";
import I18n from "../../I18n";

import Base from "../Base"
///import MyTrips from "../../screens/jur_my_trips"
import C from "../../theme/variables/commonColor"
import V from "../../theme/variables/platform"
import User from "../../services/User";

class DocsWalet extends Base {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            refreshing: false
        }

    }

    componentDidMount() {
        this.loadData(true)
    }

    loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})

        const {params} = this.props.navigation.state;

        var uu = params.user
        uu.isMain = true
        uu.UserCode = uu.Code
        var ff = [uu]

        console.log("params.user.Code: " + params.user.Code)

        User.GetFellowTravelers(params.user.Code).then(res => {
            this.setState({data: ff.concat(res), refreshing: false, isLoading: false})
        }).catch(err => {
            this.setState({data: ff, refreshing: false, isLoading: false})
            toast(I18n.t('err'));
        })
    }


    getTitle() {
        return I18n.t('docs_walet');
    }

    renderRow(data) {
        console.log(data)
        return (
            <ListItem
                button
                onPress={() => this.gotoSingle(data)}
            >
                <Left>
                    <Text style={[styles.text, styles.size16, styles.c1]}>
                        {data.FullName}
                    </Text>
                    <Text note style={[styles.text, styles.small, styles.c2]}>
                        {!data.isMain ? I18n.t('CoPassenger') : ""}
                    </Text>
                </Left>
                <Right>
                    <Icon style={styles.size24} name={V.darrow} />
                </Right>
            </ListItem>
        )
    }



    gotoSingle(data) {

        this.props.navigation.navigate('SingleDocsWalet', {
            user: data,
        })
    }


    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        <List
                            dataArray={this.state.data}
                            renderRow={data => this.renderRow(data)}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                            onRefresh={() => this.loadData(false)}/>}
                        />
                    </Content> : this.noData()
                }
            </Loader>
        )
    }

}

export default DocsWalet;
