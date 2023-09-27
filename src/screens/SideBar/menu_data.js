import I18n from "../../I18n";

const trip_tours = {
    name: I18n.t("trip_tours"),
    route: "TripTours",
    icon: "md-globe",
    bg: "#C5F442",
    img: 4
};

const home = {
    name: I18n.t("home"),
    route: "Home",
    icon: "home",
    bg: "#C5F442",
    img: 0
};

const ReservationLink = {
    name: I18n.t("ReservationLink"),
    route: "ReservationLink",
    icon: "cloud",
    bg: "#C5F442",
    img: 0,
    command: 3,
};

export default {
    StoreName: "User",

    menu_icons: [
        require("../../../assets/icon/0.png"),
        require("../../../assets/icon/1.png"),
        require("../../../assets/icon/2.png"),
        require("../../../assets/icon/3.png"),
        require("../../../assets/icon/4.png"),
        require("../../../assets/icon/5.png"),
        require("../../../assets/icon/6.png"),
        require("../../../assets/icon/7.png"),
        require("../../../assets/icon/8.png"),
        require("../../../assets/icon/9.png"),
        require("../../../assets/icon/10.png"),
        require("../../../assets/icon/11.png"),
        require("../../../assets/icon/12.png"),
        require("../../../assets/icon/13.png"),
        require("../../../assets/icon/14.png"),
        require("../../../assets/icon/15.png"),
        require("../../../assets/icon/16.png"),
    ],

    guest_data: [
        home,
        {
            name: I18n.t("login"),
            route: "Login",
            icon: "md-log-in",
            bg: "#C5F442",
            img: 11,
            command: 1,
        },
        trip_tours,
        ReservationLink
    ],

    logged_datas: [
        home,
        {
            name: I18n.t("contract"),
            route: "Contract",
            icon: "md-book",
            bg: "#C5F442",
            img: 1
        },
        {
            name: I18n.t("trip_docs"),
            route: "TripDocs",
            icon: "paper",
            bg: "#C5F442",
            img: 2
        },
        {
            name: I18n.t("docs_walet"),
            route: "DocsWalet",
            icon: "md-briefcase",
            bg: "#477EEA",
            img: 3
        },
        {
            name: I18n.t("my_fellows"),
            route: "MyFellows",
            icon: "people",
            bg: "#477EEA",
            img: 4
        },
        {
            name: I18n.t("my_scores"),
            route: "MyScores",
            icon: "medal",
            bg: "#477EEA",
            img: 4
        },
        trip_tours,
        ReservationLink,
        {
            name: I18n.t("contact_with_ajency"),
            route: "ContactAjancy",
            icon: "md-call",
            bg: "#4DCAE0",
            img: 5
        },
        {
            name: I18n.t("voting_for_qos"),
            route: "Voting",
            icon: "checkbox",
            bg: "#1EBC7C",
            img: 6
        },
        {
            name: I18n.t("my_trips"),
            route: "MyTrips",
            icon: "md-plane",
            bg: "#B89EF5",
            img: 7
        },
        {
            name: I18n.t("gift_room"),
            route: "GiftRoom",
            icon: "rose",
            bg: "#B89EF5",
            img: 7
        },
        {
            name: I18n.t('messages'),
            route: "Messages",
            icon: "mail",
            bg: "#F00",
            types: 2,
            img: 8
        },
        {
            name: I18n.t("settings"),
            route: "Settings",
            icon: "settings",
            bg: "#EB6B23",
            img: 9
        },
        {
            name: I18n.t('logout'),
            route: "Home",
            icon: "md-log-out",
            bg: "#C5F442",
            command: 2,
            img: 10
        },
    ],

    getMenuData: () => global.user ? this.logged_datas : this.guest_data,

    datas: [
        {
            name: I18n.t("contract"),
            route: "Anatomy",
            icon: "md-book",
            bg: "#C5F442"
        },
        {
            name: I18n.t("trip_docs"),
            route: "Actionsheet",
            icon: "paper",
            bg: "#C5F442"
        },
        {
            name: I18n.t("docs_walet"),
            route: "Header",
            icon: "phone-portrait",
            bg: "#477EEA",
            types: "8"
        },
        {
            name: I18n.t("trip_tours"),
            route: "Footer",
            icon: "phone-portrait",
            bg: "#DA4437",
            types: "4"
        },
        {
            name: I18n.t("contact_with_ajency"),
            route: "NHBadge",
            icon: "notifications",
            bg: "#4DCAE0"
        },
        {
            name: I18n.t("voting_for_qos"),
            route: "NHButton",
            icon: "radio-button-off",
            bg: "#1EBC7C",
        },
        {
            name: I18n.t("my_trips"),
            route: "NHCard",
            icon: "keypad",
            bg: "#B89EF5",
            types: "5"
        },
        {
            name: I18n.t('Logout'),
            route: "Home",
            icon: "phone-portrait",
            bg: "#C5F442",
            logout: true
        },
        {
            name: I18n.t("settings"),
            route: "NHCheckbox",
            icon: "checkmark-circle",
            bg: "#EB6B23"
        },
        {
            name: "Deck Swiper",
            route: "NHDeckSwiper",
            icon: "swap",
            bg: "#3591FA",
            types: "2"
        },
        {
            name: "Fab",
            route: "NHFab",
            icon: "help-buoy",
            bg: "#EF6092",
            types: "2"
        },
        {
            name: "Form & Inputs",
            route: "NHForm",
            icon: "call",
            bg: "#EFB406",
            types: "12"
        },
        {
            name: "Icon",
            route: "NHIcon",
            icon: "information-circle",
            bg: "#EF6092"
        },
        {
            name: "Layout",
            route: "NHLayout",
            icon: "grid",
            bg: "#9F897C",
            types: "5"
        },
        {
            name: "List",
            route: "NHList",
            icon: "lock",
            bg: "#5DCEE2",
            types: "7"
        },
        {
            name: "ListSwipe",
            route: "ListSwipe",
            icon: "swap",
            bg: "#C5F442",
            types: "2"
        },
        {
            name: "Picker",
            route: "NHPicker",
            icon: "arrow-dropdown",
            bg: "#F50C75"
        },
        {
            name: "Radio",
            route: "NHRadio",
            icon: "radio-button-on",
            bg: "#6FEA90"
        },
        {
            name: "SearchBar",
            route: "NHSearchbar",
            icon: "search",
            bg: "#29783B"
        },
        {
            name: "Segment",
            route: "Segment",
            icon: "menu",
            bg: "#0A2C6B",
            types: "2"
        },
        {
            name: "Spinner",
            route: "NHSpinner",
            icon: "navigate",
            bg: "#BE6F50"
        },
        {
            name: "Tabs",
            route: "NHTab",
            icon: "home",
            bg: "#AB6AED",
            types: "3"
        },
        {
            name: "Thumbnail",
            route: "NHThumbnail",
            icon: "image",
            bg: "#cc0000",
            types: "2"
        },
        {
            name: "Toast",
            route: "Toast",
            icon: "albums",
            bg: "#C5F442"
        },
        {
            name: "Typography",
            route: "NHTypography",
            icon: "paper",
            bg: "#48525D"
        }
    ]

};
