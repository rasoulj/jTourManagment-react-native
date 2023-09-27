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
import MyTrips from "../MyTrips"
import C from "../../theme/variables/commonColor"
import V from "../../theme/variables/platform"

class Voting extends Base {
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

        WebApi(WS.GetJourneys, {
            UserCode: params.user.Code
        }).then(res => {
            this.setState({data: res, refreshing: false, isLoading: false})
        }).catch(err => {
            this.setState({data: [], refreshing: false, isLoading: false})
            toast(I18n.t('err'));
        })
    }


    getTitle() {
        return I18n.t('voting_for_qos2');
    }

    renderRow(data) {
        var rate = MyTrips.getRate(data)
        var passed = MyTrips.isPassed(data)

        return (
            <ListItem
                button
                onPress={() => this.regVote(data)}
            >
                <Left>
                    <Text style={[styles.text, styles.size16, styles.c1]}>
                        {data.Title}
                    </Text>
                    <Text note style={[styles.text, styles.small, rate < 0 && passed ? styles.c3 : styles.c2]}>
                        {rate < 0 ? I18n.t('req_vote') : data.StartDate}
                    </Text>
                </Left>
                <Right>
                    <Icon style={styles.size24} name={V.darrow} />
                </Right>
            </ListItem>
        )
    }



    regVote(data) {
        var passed = MyTrips.isPassed(data)

        if(!passed) {
            toastI('not_passed')
            return;
        }
        //*/

        var rate = MyTrips.getRate(data)
        //if(rate >= 0) toastI("already_voted")
        //else
        this.props.navigation.navigate('SingleVoting', {
            data: data,
            updateUI: () => this.loadData(true),
            rate
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

export default Voting;
