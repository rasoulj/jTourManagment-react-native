import React from "react";

import {
    Button,
    Container,
    Content,
    Text,
    View,
    Icon,
    Footer,
    FooterTab,
    Textarea,
    Card,
    CardItem,
    Body,
    Left,
    Right,
    Form,
    Item,
    Label,
    Input
} from "native-base";

import {SegmentedControls} from "../../utils/react-native-radio-buttons/lib";
import {toast} from "../../utils/util";

import styles from "../styles";
import I18n from "../../I18n";

import C from "../../theme/variables/commonColor";
import V from "../../theme/variables/platform";
import BaseNext from "../BaseNext";
import {WebApi, WS} from "../../services/Api";

const options = [
    I18n.t("opt1"),
    I18n.t("opt2"),
    I18n.t("opt3"),
    I18n.t("opt4"),
];

const questions = [
    I18n.t("q1"),
    I18n.t("q2"),
    I18n.t("q3"),
    I18n.t("q4"),
    I18n.t("q5"),
    I18n.t("q6"),

];

class SingleVoting extends BaseNext {
    constructor(props) {
        super(props);

        const {data} = this.props.navigation.state.params;

        console.log(data)

        this.state = {
            selectedOption: [data.Trusteeship, data.Guide, data.Transfer, data.Hotel, data.HotelAccess, data.Overall].map(q => options[q]),
            hints: data.OtherComments,
            rate: this.props.navigation.state.params.rate
        };
    }



    getSelIndex(opt) {
        return options.findIndex(d => d === opt);
    }

    getTitle() {
        const {data} = this.props.navigation.state.params;
        return data.Title;
    }

    setSelectedOption(d, index) {
        this.state.selectedOption[index] = d;
        this.setState({selectedOption: this.state.selectedOption})

        console.log(this.state.selectedOption)
    }

    renderQuestion(index) {
        return (
            <View key={"key_"+index} style={{marginBottom: styles.normalFontSize(20)}}>
                <Text style={[styles.text, styles.c1, styles.size16]}>{questions[index]}</Text>
                <SegmentedControls
                    tint={C.dcolor1}
                    selectedTint={"white"}
                    backTint={C.dcolor2}
                    options={options}
                    allowFontScaling={false} // default: true
                    onSelection={d =>  this.setSelectedOption(d, index)}
                    selectedOption={this.state.selectedOption[index]}
                    optionStyle={[styles.text, styles.size16]}
                    enabled={this.state.rate < 0}
                    //optionContainerStyle={{flex: 1}}
                />
            </View>
        );
    }

    renderCounter() {
        const {JourneyNo, CreatorUser} = this.props.navigation.state.params.data;
        const nt = [styles.text, styles.c1, styles.small];
        const nt3 = [styles.text, styles.c3, styles.small];
        const lt = [styles.text, styles.c1, styles.size24];
        return (
            <Card style={styles.mb}>
                <CardItem bordered>
                    <Left>
                        <Body>
                        <Button transparent>
                            <Icon style={lt} name="contact"/>
                            <Text style={nt}>{I18n.t('CreatorUser')}</Text>
                            <Text style={nt3}>{CreatorUser}</Text>
                        </Button>
                        {JourneyNo && <Button transparent>
                            <Icon style={lt} name="quote"/>
                            <Text style={nt}>{I18n.t('JourneyNo')}</Text>
                            <Text style={nt3}>{JourneyNo}</Text>
                        </Button>}

                        </Body>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    renderContent() {
        var nt = [styles.text, {color: this.props.readOnly ? C.dcolor1 : C.dcolor3}, styles.small];

        return (
            <View style={{flex: 1, marginBottom: styles.normalFontSize(30)}}>
                {this.renderCounter()}
                {questions.map((q, i) => this.renderQuestion(i))}
                <Form>
                    <Item floatingLabel style={[styles.item, {height: styles.normalFontSize(130)}]}>
                        <Label style={nt}>{I18n.t("other_hints")}</Label>
                        <Input
                            multiline = {true}
                            numberOfLines = {5}
                            value={this.state.hints}
                            style={[styles.text, styles.size16]}
                            keyboardType='default'
                            onChangeText={(val) => this.setState({hints: val})}
                            disabled={this.state.rate >= 0}/>
                    </Item>
                </Form>
            </View>

        )
    }

    resetAnswers() {
        this.setState({
            selectedOption: questions.map(q => ""),
            hints: ""
        })
    }

    sendAnswers() {
        const {UserCode, Code} = this.props.navigation.state.params.data;
        const {updateUI} = this.props.navigation.state.params;

        var vals = this.state.selectedOption.map(this.getSelIndex).join(',') + '|' + this.state.hints
        WebApi(WS.SendAnswers, {
            JourneyCode: Code,
            UserCode: UserCode,
            Answer: vals
        }).then(res => {
            toast(I18n.t('answers_sent'));
            this.props.navigation.goBack()
            updateUI()
        }).catch(err => {
            toast(I18n.t('err'));
        });

    }

    anyChecked() {
        return this.state.selectedOption.some(q => q && q.length != 0) || (this.state.hints && this.state.hints.length > 0)
    }

    allChecked() {
        return this.state.selectedOption.every(q => q && q.length != 0)
    }

    renderFooter() {

        return this.state.rate < 0 ? <Footer>
                <FooterTab>
                    <Button active={this.allChecked()} disabled={!this.allChecked()} onPress={() => this.sendAnswers()}>
                        <Icon name="md-send"/>
                        <Text style={styles.text}>{I18n.t("send")}</Text>
                    </Button>
                </FooterTab>
                <FooterTab>
                    <Button active={this.anyChecked()} disabled={!this.anyChecked()} onPress={() => this.resetAnswers()}>
                        <Icon name="md-refresh-circle"/>
                        <Text style={styles.text}>{I18n.t("clear")}</Text>
                    </Button>
                </FooterTab>
            </Footer> : <View/>

    }


}

export default SingleVoting;
