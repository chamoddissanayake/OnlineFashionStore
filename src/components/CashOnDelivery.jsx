import React, { Component } from 'react'
import cashOnDeliveryStyles from '../css/cashOnDeliveryStyles.css';
import utils from '../utils/utils';
import axios from 'axios';
const BASE_URL = 'http://localhost:5000';


export default class CashOnDelivery extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            totprice: 0,
            recepient: '',
            deliveryAddress: '',
            zip: 0
        };
        this.handleRecepient = this.handleRecepient.bind(this);
        this.handleDeliveryAddress = this.handleDeliveryAddress.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.handleCashOnDeliveryClicked = this.handleCashOnDeliveryClicked.bind(this);
    }

    handleRecepient(event) {
        this.setState({
            recepient: event.target.value
        });
    }
    handleDeliveryAddress(event) {
        this.setState({
            deliveryAddress: event.target.value
        });
    }
    handleZip(event) {
        this.setState({
            zip: event.target.value
        });
    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
        this.getTotPrice();
    }

    handleCashOnDeliveryClicked() {

        //Add to db - start

        let cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        let currentUser = localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")) : [];

        console.log(cartItems);
        console.log(currentUser.username);

        var tempArr = [];


        for (var asd = 0; asd < cartItems.length; asd++) {
            var aaa = cartItems[asd];
            tempArr.push(aaa._id);
        }

        console.log(tempArr);


        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        curTime: new Date().toLocaleString()
        var tempDetailsObj = new Object();
        console.log("mmfmfmfmfm");
        console.log(this.state);
        tempDetailsObj.username = currentUser.username;
        tempDetailsObj.itemsList = tempArr;
        tempDetailsObj.datetime = dateTime;
        tempDetailsObj.recepient = this.state.recepient;
        tempDetailsObj.deliveryAddress = this.state.deliveryAddress;
        tempDetailsObj.zip = this.state.zip;
        tempDetailsObj.email = this.state.loggedInUserObj.email;
        tempDetailsObj.amount = this.state.totprice;


        console.log("-----")
        console.log(tempDetailsObj);

        axios.post(`${BASE_URL}/api/purchased`, { tempDetailsObj: tempDetailsObj })
            .then((res) => {
                console.log("appsss");
                window.location.href = '/thanks';
                // this.setState({

                // });

            }).catch((error) => {
                console.log(error)
            });
        console.log("ammamammammamma");
        ///Add to db - end
    }

    getTotPrice() {
        var tot = localStorage.getItem('totprice');
        this.setState({ totprice: tot });

    }

    render() {
        return (
            <div>


                <div id="cashOnDeliveryHeading" >
                    <h2>Delevery Details</h2>
                </div>

                <table >
                    <tr>
                        <td>
                            {/* Table Left start */}
                            {/* Table left end */}
                        </td>
                        <td>
                            {/* Table right start */}
                            {/* Table right end */}
                        </td>
                    </tr>
                </table>




                <div id="cashOnDeliveryBody">

                    <div class="form-group">
                        <label for="inputUsername">Username</label>
                        <input type="text" class="form-control" id="inputUsername" placeholder="Username" value={this.state.loggedInUserObj.username} readonly />

                    </div>
                    <div class="form-group">
                        <label for="inputEmail">Email</label>
                        <input type="text" class="form-control" id="inputEmail" placeholder="Email" value={this.state.loggedInUserObj.email} readonly />

                    </div>
                    <div class="form-group">
                        <label for="inputRecepientName">Recepient Name</label>
                        <input type="text" class="form-control" id="inputRecepientName" onChange={this.handleRecepient} placeholder="Recepient Name" required />

                    </div>
                    <div class="form-group">
                        <label for="inputDeliveryAddress">Delivery Address</label>
                        <input type="text" class="form-control" id="inputDeliveryAddress" onChange={this.handleDeliveryAddress} placeholder="Delivery Address" required />

                    </div>
                    <div class="form-group">
                        <label for="inputZip">Zip</label>
                        <input type="number" class="form-control" id="inputZip" onChange={this.handleZip} placeholder="Zip" required />
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <label>Your Amount :</label>
                            </div>
                            <div class="col">
                                <input type="number" value={this.state.totprice} class="form-control" id="inputZip" readonly />
                            </div>
                        </div>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" required />
                        <label id="agreeTerms" class="form-check-label" for="exampleCheck1">Agree tearms and conditions</label>
                    </div>
                    <p>* Delivery Charges will be applied</p>

                    <button class="btn btn-primary" onClick={this.handleCashOnDeliveryClicked} >Place Order >>></button>

                </div>


            </div>
        )
    }
}
