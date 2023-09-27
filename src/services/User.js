import {WebApi, GetUserImageUrl} from "./Api"
var moment = require('moment-jalaali')

class User {
    static empty() {
        return {
            FullName: '',
            HCGenderCode: 1,
            NationalID: '',
            CellPhone: '',
            BirthDate: this.toDateG(new Date()),
            PassportNumber: '',
            AboutMe: ''
        }
    }
    

    static getLD(userID) {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth()
        var date = d.getDate()
        console.log(y + " * " + (m+1) + " * " + date + " * " + userID + " = " + (y*(m+1)*date*userID))  ;
        return y*(m+1)*date*userID;
    }

    static gc(s) {
        return !s || s == 'null' ? "" : s
    }

    static isValidUser(user) {
        for (var i = 0; i < user.length; i++) {
            if (user[i] < "0" || user[i] > "9") {
                return false;
            }
        }
        return (user.length == 10 && user[0] == "9") || (user.length == 11 && user[0] == "0" && user[1] == "9");
    }

    static toDate(d) {
        var m = moment(d)
        console.log("toDate: " + d)
        return [m.jYear(), m.jMonth()+1, m.jDate()].join('/')
    }

    static fromJDate(arr) {
        var m = moment(arr.join('/'), "jYYYY/jM/jD")
        return this.toDateG(m.toDate())
    }

    static toDateG(d) {
        return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-')
    }

    static jDate(date) {
        //console.log(date)
        /*
        var m = moment(date ? new Date(date) : Date.now())

        //var m = moment(Date.now())
        var ret = [m.jYear(), m.jMonth()+1, m.jDate()].join('/')

        console.log(date + " ==> " + ret)

        return ret
        //*/
        var d = new Date()

        if(date) {
            console.log(date)
            var p = date.split('-')
            d = new Date(p[0], p[1]-1, p[2])
        }

        return this.toDate(d)

    }

    static curDate() {
        return this.toDate(new Date())

    }
    static curDateG() {

        return this.toDate(new Date())

    }

    static isValidCodeMelli(code) {
        console.log("code: " + code)
        if(!code || !code.match('\[0-9]\{10}')) return false;
        var acc = 0;
        for(var i=10; i>=2; i--) acc += i*code[10-i];
        console.log("acc: " + acc)



        var rem = acc%11
        console.log("rem1: " + rem)
        if(rem >= 2) rem = 11 - rem

        console.log("rem2: " + rem)

        return rem == 1*code[9]
    }


    static calcAge(dateString) {
        if(!dateString) return 100
        var birthday = new Date(dateString.split('-').join('/'))
        return ((Date.now() - birthday) / (31557600000.0));
    }


    static CreateActiveUser(CreatorUserCode, JourneyCode, u) {
        return WebApi("CreateActiveUser", {...u, CreatorUserCode, JourneyCode});
    }

    static GetFellowTravelers(UserCode) {
        return WebApi("GetFellowTravelers", {UserCode});
    }

    static GetUserDocs(UserCode) {
        return WebApi("GetUserDocs", {UserCode})
    }

    static GetUserInfo(UserCode) {
        return WebApi("GetUserInfo", {UserCode});
    }

    static UpdateUser(user) {
        return WebApi("UpdateUser", user);
    }

    static GetJourneys(UserCode) {
        return WebApi("GetJourneys", {UserCode});
    }

    static GetJourneyFellowTravelers(JourneyCode) {
        return WebApi("GetJourneyFellowTravelers", {JourneyCode})
    }

    static RemoveUserDoc(UserDocCode) {
        return WebApi("RemoveUserDoc", {UserDocCode})
    }

    static SendUserDoc(UserCode, HCDocTypeCode, FileName, File) {
        return WebApi("SendUserDoc", {UserCode, HCDocTypeCode, FileName, File})
    }

    static AddJourneyFellowTravelerUser(JourneyCode, FellowTravelerUserCode) {
        return WebApi("AddJourneyFellowTravelerUser", {JourneyCode, FellowTravelerUserCode})
    }

    static RemoveJourneyFellowTravelerUser(JourneyCode, FellowTravelerUserCode) {
        return WebApi("RemoveJourneyFellowTravelerUser", {JourneyCode, FellowTravelerUserCode})
    }

    static GetUserScores(UserCode) {
        return WebApi("GetUserScores", {UserCode})
    }

    static GetJourneyUserDocs(UserCode, JourneyCode) {
        return WebApi("GetJourneyUserDocs", {UserCode, JourneyCode})
    }

    static isValid(user) {
        console.log('isValid')
        var age = this.calcAge(user.BirthDate);
        console.log(user)
        var bd = (age >= 18 && this.isValidUser(user.CellPhone)) || (age < 18 && (!user.CellPhone || user.CellPhone == '0')) || (age < 18 && this.isValidUser(user.CellPhone));
        return user.FullName && bd && user.HCGenderCode && this.isValidCodeMelli(user.NationalID);
    }

    static getImageUrl(UserCode) {
        return GetUserImageUrl(UserCode)
    }

}

export default User
