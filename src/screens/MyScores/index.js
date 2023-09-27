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
    H2,

} from "native-base";
import Loader from "../../utils/Loader";
import moment from 'moment-jalaali'
import User from "../../services/User";
import C from "../../theme/variables/commonColor"

class MyScores extends Base {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            refreshing: false
        };
    }

    getTitle() {
        return I18n.t('my_scores');
    }

    componentDidMount() {
        this.loadData(true)
    }

    loadData(firstTime) {

        this.setState({refreshing: !firstTime, isLoading: firstTime})

        const {user} = this.props.navigation.state.params;

        User.GetUserScores(user.Code).then(res => {
            this.setState({data: res, refreshing: false, isLoading: false})
        }).catch(err => {
            this.setState({data: [], refreshing: false, isLoading: false})
            toast(I18n.t('err'));
        })
    }


    renderCard(d, summery) {
        const nt = [styles.text, styles.c1, styles.small];
        return (
            <Card style={styles.mb} key={'key'+d.Code}>
                <CardItem bordered style={{backgroundColor: summery ? C.dcolor1 : 'white'}}>
                    <Text style={[nt, {color: (!summery ? C.dcolor1 : 'white')}]}>{d.Title}</Text>
                </CardItem>
                {!summery && <CardItem bordered>
                    <Left>
                        <Body>
                        <Button transparent>
                            <Icon name="calendar" />
                            <Text style={nt}>{d.ScoreDate}</Text>
                        </Button>
                        <Button transparent>
                            <Icon name="logo-github" />
                            <Text style={nt}>{d.CityName}</Text>
                        </Button>
                        </Body>
                    </Left>
                </CardItem>}
                <CardItem bordered>
                    <Left>
                        <Body>
                        <Button transparent>
                            <Icon name="medal" />
                            <Text style={nt}>{d.Score}</Text>
                        </Button>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    renderContent() {
        return (
            <Loader loading={this.state.isLoading} style={{marginTop: styles.normalFontSize(50)}}>
                {this.state.data.length ?
                    <Content bounces={true} style={{flex: 1, backgroundColor: "#fff", top: -1}}>
                        {this.state.data.map((d) => this.renderCard(d))}
                        {this.renderCard({Title: I18n.t('score_summery'), Score: this.state.data.reduce((s, a) => s+a.Score, 0)}, true)}
                    </Content> : this.noData()
                }
            </Loader>
        )
    }

}

export default MyScores;
