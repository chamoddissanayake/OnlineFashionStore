import React, { Component } from 'react'

export default class utils extends Component {


    static checkLoggedInUser() {
        var retrievedObject = localStorage.getItem('loggedInUser');

        if (retrievedObject != null) {

            var k = JSON.parse(retrievedObject);

            // this.setState(this.state.loggedInUserObj = k);

            console.log("" + k.type);
            // console.log("" + this.state.loggedInUserObj.type);

            return k;
        } else {
            console.log("User not logged");
            return null;
        }


    }


    static getCurrentDate(separator = '/') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }


    static isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
