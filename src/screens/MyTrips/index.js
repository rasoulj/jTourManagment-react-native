import React, {Component, Dimensions} from "react";
import I18n from "../../I18n";
import Base from "../Base"
import {toast, tdeb, toastI} from "../../utils/util";
import {WebApi, WS} from "../../services/Api";
import styles from "../styles";
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
import Loader from "../../utils/Loader";
import moment from 'moment-jalaali'


class MyTrips extends Base {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            refreshing: false
        };
    }

    getTitle() {
        return I18n.t('my_trips');
    }

    static formatDate(m) {
        var two = (d) => d < 10 ? "0"+d : ""+d;
        return m.jYear()+"/"+two(m.jMonth()+1)+"/"+two(m.jDate());
    }

    static isPassed(data) {
        return MyTrips.formatDate(moment()) >= data.StartDate;
    }


    componentDidMount() {
        this.loadData(true)
    }

    static getRate(d) {
        return d.Trusteeship == null ? -1 : (d.Trusteeship+d.Guide+d.Transfer+d.Hotel+d.HotelAccess+d.Overall)/6+1;
    }

    static tripRate(rate) {
        return rate < 0 ? I18n.t('no_rate_yet') : rate.toFixed(2)+I18n.t('from_four');
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


    renderCard(d) {
        const nt = [styles.text, styles.c1, styles.small];
        var rate = MyTrips.getRate(d)
        var passed = MyTrips.isPassed(d)
        return (
            <Card style={styles.mb} key={'key'+d.JourneyCode}>
                <CardItem bordered>
                    <Text style={nt}>{d.Title}</Text>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Body>
                        <Button transparent onPress={() => tdeb(d)}>
                            <Icon name="ios-calendar-outline" />
                            <Text style={nt}>{d.StartDate}</Text>
                        </Button>
                        <Button transparent onPress={() => tdeb(d)}>
                            <Icon name="calendar" />
                            <Text style={nt}>{d.CDate}</Text>
                        </Button>
                        <Button transparent>
                            <Icon name="logo-github" />
                            <Text style={nt}>{d.DestinationCity}</Text>
                        </Button>
                        {rate >= 0 && <Button transparent onPress={() => this.regVote(d)}>
                            <Icon name="checkbox" />
                            <Text style={nt}>{MyTrips.tripRate(rate)}</Text>
                        </Button>}
                        </Body>
                    </Left>
                </CardItem>
                {rate < 0 && <CardItem bordered>
                    <Left>
                        <Body>
                        <Button transparent onPress={() => this.regVote(d)}>
                            <Icon style={passed ? styles.c3 : styles.c2} name="checkbox" />
                            <Text style={[styles.text, passed ? styles.c3 : styles.c2, styles.small]}>{I18n.t('req_vote')}</Text>
                        </Button>
                        </Body>
                    </Left>
                </CardItem>}
            </Card>
        )
    }

    regVote(data) {
        var passed = MyTrips.isPassed(data)

        if(!passed) {
            toastI('not_passed')
            return;
        }

        //console.log(data)

        //return
        var rate = MyTrips.getRate(data)

        this.props.navigation.navigate('SingleVoting', {
            data: data,
            updateUI: () => this.loadData(true),
            rate
        })
    }

    renderContent() {
        return (<Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        {this.state.data.map((d) => this.renderCard(d))}
                    </Content> : this.noData()
                }
            </Loader>)
    }

}

export default MyTrips;
