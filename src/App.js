import React from "react";
import { I18nManager, Easing, Animated } from "react-native";
import {Root} from "native-base";
import C from "./theme/variables/commonColor"

import {StackNavigator, DrawerNavigator} from "react-navigation";
/*
import Header from "./screens/Header/";
import Header1 from "./screens/Header/1";
import Header2 from "./screens/Header/2";
import Header3 from "./screens/Header/3";
import Header4 from "./screens/Header/4";
import Header5 from "./screens/Header/5";
import Header6 from "./screens/Header/6";
import Header7 from "./screens/Header/7";
import Header8 from "./screens/Header/8";
import BasicFooter from "./screens/footer/basicFooter";
import IconFooter from "./screens/footer/iconFooter";
import IconText from "./screens/footer/iconText";
import BadgeFooter from "./screens/footer/badgeFooter";
import Default from "./screens/button/default";
import Outline from "./screens/button/outline";
import Rounded from "./screens/button/rounded";
import Block from "./screens/button/block";
import Full from "./screens/button/full";
import Custom from "./screens/button/custom";
import Transparent from "./screens/button/transparent";
import IconBtn from "./screens/button/iconBtn";
import Disabled from "./screens/button/disabled";
import BasicCard from "./screens/card/basic";
import NHCardImage from "./screens/card/card-image";
import NHCardShowcase from "./screens/card/card-showcase";
import NHCardList from "./screens/card/card-list";
import NHCardHeaderAndFooter from "./screens/card/card-header-and-footer";
import BasicFab from "./screens/fab/basic";
import MultipleFab from "./screens/fab/multiple";
import FixedLabel from "./screens/form/fixedLabel";
import InlineLabel from "./screens/form/inlineLabel";
import FloatingLabel from "./screens/form/floatingLabel";
import PlaceholderLabel from "./screens/form/placeholder";
import StackedLabel from "./screens/form/stacked";
import RegularInput from "./screens/form/regular";
import UnderlineInput from "./screens/form/underline";
import RoundedInput from "./screens/form/rounded";
import IconInput from "./screens/form/iconInput";
import SuccessInput from "./screens/form/success";
import ErrorInput from "./screens/form/error";
import DisabledInput from "./screens/form/disabledInput";
import RowNB from "./screens/layout/row";
import ColumnNB from "./screens/layout/column";
import NestedGrid from "./screens/layout/nested";
import CustomRow from "./screens/layout/customRow";
import CustomCol from "./screens/layout/customCol";
import BasicListSwipe from "./screens/listSwipe/basic-list-swipe";
import MultiListSwipe from "./screens/listSwipe/multi-list-swipe";
import NHBasicList from "./screens/list/basic-list";
import NHListDivider from "./screens/list/list-divider";
import NHListSeparator from "./screens/list/list-separator";
import NHListHeader from "./screens/list/list-headers";
import NHListIcon from "./screens/list/list-icon";
import NHListAvatar from "./screens/list/list-avatar";
import NHListThumbnail from "./screens/list/list-thumbnail";
import RegularPicker from "./screens/picker/regularPicker";
import PlaceholderPicker from "./screens/picker/placeholderPicker";
import PlaceholderPickerNote from "./screens/picker/placeholderPickernote";
import BackButtonPicker from "./screens/picker/backButtonPicker";
import HeaderPicker from "./screens/picker/headerPicker";
import HeaderStylePicker from "./screens/picker/headerStylePicker";
import CustomHeaderPicker from "./screens/picker/customHeaderPicker";
import BasicTab from "./screens/tab/basicTab";
import ConfigTab from "./screens/tab/configTab";
import ScrollableTab from "./screens/tab/scrollableTab";
import BasicSegment from "./screens/segment/SegmentHeader";
import RegularActionSheet from "./screens/actionsheet/regular";
import IconActionSheet from "./screens/actionsheet/icon";
import AdvSegment from "./screens/segment/segmentTab";
import SimpleDeck from "./screens/deckswiper/simple";
import AdvancedDeck from "./screens/deckswiper/advanced";
//*/

/*
import Anatomy from "./screens/anatomy/";
import Footer from "./screens/footer/";
import NHBadge from "./screens/badge/";
import NHButton from "./screens/button/";
import NHCard from "./screens/card/";
import NHCheckbox from "./screens/checkbox/";
import NHDeckSwiper from "./screens/deckswiper/";
import NHFab from "./screens/fab/";
import NHForm from "./screens/form/";
import TextArea from "./screens/form/textArea";
import NHIcon from "./screens/icon/";
import ListSwipe from "./screens/listSwipe/";
import BasicIcon from "./screens/icon/basic";
import IconState from "./screens/icon/state";
import SpecificIcon from "./screens/icon/specific";
import NHLayout from "./screens/layout/";
import NHList from "./screens/list/";
import NHRadio from "./screens/radio/";
import NHSearchbar from "./screens/searchbar/";
import NHSpinner from "./screens/spinner/";
import NHPicker from "./screens/picker/";
import NHTab from "./screens/tab/";
import NHThumbnail from "./screens/thumbnail/";
import NHTypography from "./screens/typography/";
//*/
import {SideBar} from "./screens/SideBar";
/*
import Segment from "./screens/segment";
import Toast from "./screens/toast";
import Actionsheet from "./screens/actionsheet";
//*/

import i18n from "./I18n"

import Home from "./screens/Home/";
import ContactAjancy from "./screens/ContactAjancy/";
import Login from "./screens/Login";
import ResetPass from "./screens/Login/ResetPass";
import NewUser from "./screens/Login/NewUser";
import ActivateUser from "./screens/Login/ActivateUser";
import Contract from "./screens/Contract/";
import SignScreen from "./screens/Contract/SignScreen";
import ContractText from "./screens/Contract/ContractText";
import DocsWalet from "./screens/DocsWalet/";
import MyTrips from "./screens/MyTrips/";
import MyScores from "./screens/MyScores/";
import Settings from "./screens/Settings/";
import ChangePass from "./screens/Settings/ChangePass";
import TripDocs from "./screens/TripDocs/";
import Voting from "./screens/Voting/";
import SingleVoting from "./screens/Voting/SingleVoting";
import TripTours from "./screens/TripTours/"
import SingleTours from "./screens/TripTours/SingleTours"
import GiftRoom from "./screens/GiftRoom/"
import Messages from "./screens/Messages/"
import SingleMessage from "./screens/Messages/SingleMessage"
import SingleTripDocs from "./screens/TripDocs/SingleTripDocs"
import MyProfile from "./screens/Settings/MyProfile"
import MyFellows from "./screens/MyFellows"
import SingleFellow from "./screens/MyFellows/SingleFellow"
import SingleJurneyFellows from "./screens/MyFellows/SingleJurneyFellows"
import SingleDocsWalet from "./screens/DocsWalet/SingleDocsWalet"


//I18nManager.forceRTL(true)

const Drawer = DrawerNavigator(
    {
        Home: {
            screen: Home,
            /*
            navigationOptions: ({navigation}) => ({
                drawerLockMode: 'locked-closed'
            })
            //*/
        },


        ContactAjancy: {screen: ContactAjancy},
        Contract: {screen: Contract},
        DocsWalet: {screen: DocsWalet},
        MyTrips: {screen: MyTrips},
        Settings: {screen: Settings},
        TripDocs: {screen: TripDocs},
        TripTours: {screen: TripTours},
        Voting: {screen: Voting},
        Messages: {screen: Messages},
        GiftRoom: {screen: GiftRoom},
        Login: {screen: Login},
        MyFellows: {screen: MyFellows},
        MyScores: {screen: MyScores},

        /*
        Anatomy: {screen: Anatomy},
        Header: {screen: Header},
        Footer: {screen: Footer},
        NHBadge: {screen: NHBadge},
        NHButton: {screen: NHButton},
        NHCard: {screen: NHCard},
        NHCheckbox: {screen: NHCheckbox},
        NHDeckSwiper: {screen: NHDeckSwiper},
        NHFab: {screen: NHFab},
        NHForm: {screen: NHForm},
        NHIcon: {screen: NHIcon},
        BasicIcon: {screen: BasicIcon},
        IconState: {screen: IconState},
        SpecificIcon: {screen: SpecificIcon},
        NHLayout: {screen: NHLayout},
        NHList: {screen: NHList},
        ListSwipe: {screen: ListSwipe},
        NHRadio: {screen: NHRadio},
        NHSearchbar: {screen: NHSearchbar},
        NHSpinner: {screen: NHSpinner},
        NHPicker: {screen: NHPicker},
        NHTab: {screen: NHTab},
        NHThumbnail: {screen: NHThumbnail},
        NHTypography: {screen: NHTypography},
        Segment: {screen: Segment},
        Toast: {screen: Toast},
        Actionsheet: {screen: Actionsheet}
        //*/
    },
    {
        initialRouteName: "Home",
        drawerPosition:  C.isAndroid ? (i18n.locale.substr(0, 2) === "fa" ? "left" : "right") : "left",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
    {
        Home: {screen: Home},



        Drawer: {screen: Drawer},
        //Anatomy: {screen: Anatomy},
        //Header: {screen: Header},

        ContactAjancy: {screen: ContactAjancy},
        Contract: {screen: Contract},
        DocsWalet: {screen: DocsWalet},
        MyTrips: {screen: MyTrips},
        Settings: {screen: Settings},
        TripDocs: {screen: TripDocs},
        TripTours: {screen: TripTours},
        Voting: {screen: Voting},
        GiftRoom: {screen: GiftRoom},
        Messages: {screen: Messages},

        SignScreen: {screen: SignScreen},
        ContractText: {screen: ContractText},
        SingleTripDocs: {screen: SingleTripDocs},
        SingleVoting: {screen: SingleVoting},
        SingleTours: {screen: SingleTours},
        SingleMessage: {screen: SingleMessage},
        ResetPass: {screen: ResetPass},
        ChangePass: {screen: ChangePass},
        MyProfile: {screen: MyProfile},
        NewUser: {screen: NewUser},
        ActivateUser: {screen: ActivateUser},
        SingleFellow: {screen: SingleFellow},
        SingleJurneyFellows: {screen: SingleJurneyFellows},
        SingleDocsWalet: {screen: SingleDocsWalet},

        /*
        Header1: {screen: Header1},
        Header2: {screen: Header2},
        Header3: {screen: Header3},
        Header4: {screen: Header4},
        Header5: {screen: Header5},
        Header6: {screen: Header6},
        Header7: {screen: Header7},
        Header8: {screen: Header8},


        BasicFooter: {screen: BasicFooter},
        IconFooter: {screen: IconFooter},
        IconText: {screen: IconText},
        BadgeFooter: {screen: BadgeFooter},

        Default: {screen: Default},
        Outline: {screen: Outline},
        Rounded: {screen: Rounded},
        Block: {screen: Block},
        Full: {screen: Full},
        Custom: {screen: Custom},
        Transparent: {screen: Transparent},
        IconBtn: {screen: IconBtn},
        Disabled: {screen: Disabled},


        BasicCard: {screen: BasicCard},
        NHCardImage: {screen: NHCardImage},
        NHCardShowcase: {screen: NHCardShowcase},
        NHCardList: {screen: NHCardList},
        NHCardHeaderAndFooter: {screen: NHCardHeaderAndFooter},

        SimpleDeck: {screen: SimpleDeck},
        AdvancedDeck: {screen: AdvancedDeck},

        BasicFab: {screen: BasicFab},
        MultipleFab: {screen: MultipleFab},

        FixedLabel: {screen: FixedLabel},
        InlineLabel: {screen: InlineLabel},
        FloatingLabel: {screen: FloatingLabel},
        PlaceholderLabel: {screen: PlaceholderLabel},
        StackedLabel: {screen: StackedLabel},
        RegularInput: {screen: RegularInput},
        UnderlineInput: {screen: UnderlineInput},
        RoundedInput: {screen: RoundedInput},
        IconInput: {screen: IconInput},
        SuccessInput: {screen: SuccessInput},
        ErrorInput: {screen: ErrorInput},
        DisabledInput: {screen: DisabledInput},
        TextArea: {screen: TextArea},

        RowNB: {screen: RowNB},
        ColumnNB: {screen: ColumnNB},
        NestedGrid: {screen: NestedGrid},
        CustomRow: {screen: CustomRow},
        CustomCol: {screen: CustomCol},

        NHBasicList: {screen: NHBasicList},
        NHListDivider: {screen: NHListDivider},
        NHListSeparator: {screen: NHListSeparator},
        NHListHeader: {screen: NHListHeader},
        NHListIcon: {screen: NHListIcon},
        NHListAvatar: {screen: NHListAvatar},
        NHListThumbnail: {screen: NHListThumbnail},

        BasicListSwipe: {screen: BasicListSwipe},
        MultiListSwipe: {screen: MultiListSwipe},

        RegularPicker: {screen: RegularPicker},
        PlaceholderPicker: {screen: PlaceholderPicker},
        PlaceholderPickerNote: {screen: PlaceholderPickerNote},
        BackButtonPicker: {screen: BackButtonPicker},
        HeaderPicker: {screen: HeaderPicker},
        HeaderStylePicker: {screen: HeaderStylePicker},
        CustomHeaderPicker: {screen: CustomHeaderPicker},

        BasicTab: {screen: BasicTab},
        ConfigTab: {screen: ConfigTab},
        ScrollableTab: {screen: ScrollableTab},

        BasicSegment: {screen: BasicSegment},
        AdvSegment: {screen: AdvSegment},

        RegularActionSheet: {screen: RegularActionSheet},
        IconActionSheet: {screen: IconActionSheet}
        //*/
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
        /*
        transitionConfig: () => ({
            transitionSpec: {
                duration: 750,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps

                const thisSceneIndex = scene.index
                const width = layout.initWidth

                const translateX = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex],
                    outputRange: [width, 0],
                })

                return {transform: [{translateX}]}
            },
        }),
        //*/
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
