import React, {Component} from "react";
import V from "../../theme/variables/platform";
import I18n from "../../I18n";
import Loader from "../../utils/Loader";
import {WebApi, WS} from "../../services/Api"
import Base from "../Base"
import {toast} from "../../utils/util";
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
    H2
} from "native-base";
import {RefreshControl} from "react-native";
/*
import {
    Container,
    Button,
    Text,
    Content
} from "native-base";

//*/
import styles from "../styles";
import SingleTripDocs from "./SingleTripDocs";
//import {NavigationActions} from "react-navigation";

class TripDocs extends Base {
    constructor(props) {
        super(props);
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


    getTitle = () => I18n.t('trip_docs')

    renderRow(data) {
        return (
            <ListItem
                button
                onPress={() => this.props.navigation.navigate('SingleTripDocs', {Title: data.Title, UserCode: data.UserCode, Code: data.Code})}
            >
                <Left>
                    <Text style={[styles.text, styles.c1, styles.size16]}>
                        {data.Title}
                    </Text>
                    <Text note style={[styles.text, styles.small]}>
                        {data.StartDate}
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
                            refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                            onRefresh={() => this.loadData(false)}/>}
                        />
                    </Content> : this.noData()
                }
            </Loader>
        )
    }
}

export default TripDocs;
