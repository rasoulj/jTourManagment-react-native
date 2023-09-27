import React, {Component} from "react";
import Loader from "../../utils/Loader";

import BaseNext from "../BaseNext";
import {CreateUri, WebApi, WS} from "../../services/Api";
import {toast, tdeb, openURL} from "../../utils/util";
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
    View,
    Body,
    ListItem,
    List,
    H2
} from "native-base";
import {Linking, Platform, RefreshControl} from "react-native";
import V from "../../theme/variables/platform";
import styles from "../styles";
import I18n from "../../I18n";
import OpenFile from "react-native-doc-viewer";


class SingleTours extends BaseNext {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            refreshing: false
        }
    }

    getTitle() {
        const {Title} = this.props.navigation.state.params;
        return Title;
    }

    componentDidMount() {
        this.loadData(true)
    }

    loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})

        const {CatCode} = this.props.navigation.state.params;

        WebApi(WS.GetTours, {}).then(res => {
            this.setState({data: res.filter(q => q.HCTourCatCode === CatCode), refreshing: false, isLoading: false})
        }).catch(err => {
            tdeb(err)
            this.setState({data: [], refreshing: false, isLoading: false})
            //toast('aaa' + I18n.t('err'));
        })
    }

    openDoc(data) {
        toast(data.Title)
    }



    renderRow(data) {
        return (
            <ListItem
                button
                onPress={() =>  openURL(data.Url)}
            >
                <Left>
                    <Text style={[styles.text, styles.c1, styles.size16]}>
                        {data.Title}
                    </Text>
                </Left>
                <Right>
                    <Icon style={styles.size24} name={V.darrow} />
                </Right>
            </ListItem>
        )
    }



    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        <List
                            dataArray={this.state.data}
                            renderRow={data => this.renderRow(data)}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.loadData(false)}/>}
                        />
                    </Content> : this.noData()
                }
            </Loader>
        )
    }

}

export default SingleTours;
