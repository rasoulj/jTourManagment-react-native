import React, {Component} from "react";
import V from "../../theme/variables/platform";
import I18n from "../../I18n";
import Loader from "../../utils/Loader";
import {WebApi, WS} from "../../services/Api"
import Base from "../Base"
import {toast, toastI} from "../../utils/util";
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

    Footer,
    FooterTab,
    ListItem,
    List,
    H2,
    ActionSheet
} from "native-base";

import {Alert, RefreshControl} from "react-native";
import styles from "../styles";
import User from "../../services/User"
import BaseNext from "../BaseNext";
var moment = require('moment-jalaali')

const MoreActs = [
    {FullName: I18n.t('new_user2'), UserCode: -1},
    {FullName: I18n.t('cancel'), UserCode: -2},
]

const Acts = [
    I18n.t("delete"),
    I18n.t("cancel"),
]


class SingleJurneyFellows extends BaseNext {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            refreshing: false,
            availOptions: []
        }

    }

    //allOptions = []

    componentDidMount() {
        this.loadData(true)
    }

    getFellows(data) {
        User.GetFellowTravelers(this.props.navigation.state.params.creator.Code).then(res => {
            var allOptions = res.concat(MoreActs)
            this.setState({
                data: data,
                availOptions: allOptions.filter(p => data.findIndex(d => p.UserCode == d.UserCode) < 0),
                refreshing: false, isLoading: false
            })
        }).catch(() => {
            //this.allOptions = MoreActs
            this.setState({data: [], availOptions: MoreActs, refreshing: false, isLoading: false})
        })
    }

     loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})
        const {data} = this.props.navigation.state.params;

        User.GetJourneyFellowTravelers(data.Code).then(res => {
            //this.setState({data: res, refreshing: false, isLoading: false})
            this.getFellows(res)
        }).catch(err => {
            //this.setState({data: [], refreshing: false, isLoading: false})
            this.getFellows([])
            toast(I18n.t('err'));
        })

        //*/
    }

    getTitle() {
        const {data} = this.props.navigation.state.params;
        return data.Title;
    }

    deleteDoc(user) {
        const {data} = this.props.navigation.state.params;
        User.RemoveJourneyFellowTravelerUser(data.Code, user.UserCode).then(res => {
            toast(res.result)
            this.loadData(false)
        }).catch(() => toastI('err'))
    }

    askToDelete(doc) {
        Alert.alert(
            I18n.t("ask"),
            I18n.t("ask_to_del_fellow"),
            [
                {text: I18n.t("no"), style: "cancel"},
                {text: I18n.t("yes"), onPress: () => this.deleteDoc(doc)},
            ],
            {cancelable: false}
        )
    }


    renderRow(data) {
        //console.log(data)
        return (
            <ListItem
                button
                onPress={() => this.gotoFellow(data, false)}
                onLongPress={() =>  ActionSheet.show({
                        options: Acts,
                        cancelButtonIndex: 0,
                        destructiveButtonIndex: 1,
                        title: I18n.t("select_option")
                    },
                    buttonIndex => {
                        if(buttonIndex == 0) this.askToDelete(data)
                    }
                )}
            >
                <Left>
                    <Text style={[styles.text, styles.c1, styles.size16]}>
                        {data.FullName}
                    </Text>
                    {/*<Text note style={[styles.text, styles.small]}>
                        {data.StartDate}
                    </Text>*/}
                </Left>
                <Right>
                    <Icon style={styles.size24} name={V.darrow} />
                </Right>
            </ListItem>
        )
    }

    gotoFellow(cuser, isNew) {
        const {data, creator} = this.props.navigation.state.params;
        this.props.navigation.navigate('SingleFellow', {
            jurney: data,
            user: cuser,
            creator: creator,
            isNew: isNew,
            loadData: () => this.loadData(false)
        })
    }

    doCommand(buttonIndex, opts) {
        if(buttonIndex == opts.length - 1) return;
        else if(buttonIndex == opts.length - 2) this.gotoFellow(null, true);
        else {
            const {data, creator} = this.props.navigation.state.params;
            User.AddJourneyFellowTravelerUser(data.Code, opts[buttonIndex].UserCode).then(res => {
                console.log(res)
                toast(res.result)
                this.loadData(false)
            }).catch(() => toastI('err'))
        }
    }

    renderFooter() {
        return (
            <Footer>
                <FooterTab>
                    {/*<Button active={true} onPress={() =>  this.gotoFellow(null, true)}>*/}
                    <Button disabled={this.state.isLoading} active={!this.state.isLoading} onPress={() =>  ActionSheet.show({
                            options: this.state.availOptions.map(d => d.FullName),
                            cancelButtonIndex: this.state.availOptions.length-1,
                            title: I18n.t("select_option")
                        },
                        buttonIndex => this.doCommand(buttonIndex, this.state.availOptions)
                    )}>
                        <Icon name="person-add"/>
                        <Text style={styles.text}>{I18n.t("add_fellow")}</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
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

export default SingleJurneyFellows;
