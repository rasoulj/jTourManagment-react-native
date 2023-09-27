
import { toast, tdeb } from "../utils/util";
import { NetInfo } from "react-native";

const WS = {
    LoginUser: "LoginUser",
    GetJourneys: "GetJourneys",
    SendSignedContract: "SendSignedContract",
    GetUserDocs: "GetUserDocs",
    SendUserDoc: "SendUserDoc",
    GetSingleUserDoc: "GetSingleUserDoc",
    RemoveUserDoc: "RemoveUserDoc",
    GetJourneyUserDocs: "GetJourneyUserDocs",
    GetSingleJourneyUserDoc: "GetSingleJourneyUserDoc",
    SendAnswers: "SendAnswers",
    GetTours: "GetTours",
    SendMessage: "SendMessage",
    GetJourneyContract: "GetJourneyContract",
    GetUserMessages: "GetUserMessages",
    UpdateMessageStatus: "UpdateMessageStatus",
    RequestNewPassword: "RequestNewPassword",
    SetNewPassword: "SetNewPassword",
    CreateUser: "CreateUser",
    GetSettings: "GetSettings",
    GetUnreadUserMessagesCount: "GetUnreadUserMessagesCount",
    UpdateToken: "UpdateToken",
    ActivateUser: "ActivateUser"
};


const veryBaseUrl = "http://www.four-season.ir/"
//const veryBaseUrl = "http://saloomeh.netsima.ir/"
const baseUrl = veryBaseUrl + "WS.aspx";
//const baseUrl = "http://four-season.ir/WS.aspx";


function WebApi(funcName, params) {

    return new Promise(
        function (resolve, reject) {

            NetInfo.isConnected.fetch().then((isConnected) => { // Get network status again to make sure its not changed after getting merchant data
                if (isConnected || true) {
                    //tdeb(isConnected);
                    const data = new FormData();
                    data.append("FuncName", funcName);
                    Object.keys(params).forEach(p => data.append(p, params[p]))


                    fetch(baseUrl, {method: "POST", body: data }).then((res) => {
                        var json = JSON.parse(res._bodyText)
                        resolve(json)
                    }).catch((err) => {
                        reject(err.toString());
                    })

                } else {
                    reject("Error: No network.");
                }
            });
        });
}

function CreateUri(funcName, params) {
    var keys = Object.keys(params).map( key => key + "=" + params[key] ).join("&");
    var values = "?FuncName=" + funcName + "&" + keys;


    return baseUrl + values;
}

function CreateLDUri(route, ld) {
    return veryBaseUrl + "?LD="+ ld + "&NextPage=" + route
}

function ReservationLink() {
    return veryBaseUrl + "ReservationLink.aspx"
}

function GetUserImageUrl(Code) {
    var r = Math.floor(Math.random() * 100000)
    return Code ? veryBaseUrl + 'HandlePic.aspx?Code=' + Code+"&fileName="+r+".png" : veryBaseUrl + "images/man.png"
}

module.exports = {
    WebApi,
    WS,
    CreateUri,
    GetUserImageUrl,
    CreateLDUri,
    ReservationLink
};
