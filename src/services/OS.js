import {DocumentPicker, DocumentPickerUtil} from "react-native-document-picker";

import C from "../theme/variables/commonColor"
import {WebApi, WS} from "./Api";
import {toast, toastI} from "../utils/util";

const l = (e, p) => {
    if(e) e(p)
}

const selectDocIOS = (cb, ecb) => {
    var ImagePicker = require('react-native-image-picker');

    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
        title: 'Select Document',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.launchImageLibrary(options, (response) => {
        //toast('Response = ', JSON.stringify(response.uri));

        if (response.didCancel) {
            l(ecb, 'User cancelled image picker');
        }
        else if (response.error) {
            l(ecb, 'ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            l(ecb, 'User tapped custom button: ', response.customButton);
        }
        else {
            l(cb, response.uri)
            let source = { uri: response.uri };
        }
    });
}

const selectDocAndroid = (cb, ecb) => {

    try {

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.images()],
        }, (error, response) => {

            if (error) {
                l(ecb, "**ERROR: " + error);
            } else l(cb, response.uri)
            //*/
        });
        //*/
        /*
        DocumentPicker.show2({
            filetype: [DocumentPickerUtil.images()],
        }).then(response => {
            //l(cb, response.uri)
            toast(response.uri)
        }).catch(err => toast(err));
        //*/
    } catch (err) {
        l(ecb, "ERROR3: " + err);
    }


    //return uri
}

const selectDoc = (cb, ecb) => {
    if(C.isAndroid) selectDocAndroid(cb, ecb)
    else selectDocIOS(cb, ecb)
}

module.exports = {
    selectDoc
};
