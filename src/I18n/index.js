// @flow

import I18n from 'react-native-i18n'

import en from './languages/en'
import fa from './languages/fa'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// English language is the main language for fall back:
I18n.translations = {
    en: fa,
    fa: fa,
}


//I18n.defaultLocale = 'en'
//I18n.locale = "fa"


/*
let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
    case 'fa':
        I18n.translations.fa = require('./languages/fa.json')
        break
    case 'zh':
        I18n.translations.zh = require('./languages/zh.json')
        break
}
*/

export default I18n;
