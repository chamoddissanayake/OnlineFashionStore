import React, { Component } from 'react'
import cashOnDeliveryStyles from '../css/cashOnDeliveryStyles.css';
import utils from '../utils/utils';
import axios from 'axios';


export default class CashOnDelivery extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            totprice: 0,
            recepient: '',
            deliveryAddress: '',
            zip: 0,
            agree: false,
            loading: false
        };
        this.handleRecepient = this.handleRecepient.bind(this);
        this.handleDeliveryAddress = this.handleDeliveryAddress.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.handleCashOnDeliveryClicked = this.handleCashOnDeliveryClicked.bind(this);

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleCheckboxChange(event) {
        this.setState({ agree: event.target.checked });
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

        //Validate
        if (this.state.recepient == '' || this.state.deliveryAddress == '' || this.state.zip == '') {
            alert('Please fill all fields');
        } else if (this.state.agree == false) {
            alert('Please agree with terms and conditions');
        } else {
            this.setState({
                loading: true
            });
            //Add to db - start

            let cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
            let currentUser = localStorage.getItem("loggedInUser") ? JSON.parse(localStorage.getItem("loggedInUser")) : [];

            console.log(cartItems);
            console.log(currentUser.username);

            var tempArr = [];


            for (var asd = 0; asd < cartItems.length; asd++) {
                var aaa = cartItems[asd];
                var tempObj = new Object();
                tempObj._id = aaa._id;
                tempObj.needQuantity = aaa.needQuantity;
                tempObj.available_quantity = aaa.available_quantity;
                tempArr.push(tempObj);
            }

            console.log(tempArr);


            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;

            curTime: new Date().toLocaleString()
            var tempDetailsObj = new Object();
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


            axios.post(`/api/purchased`, { tempDetailsObj: tempDetailsObj })
                .then((res) => {
                    this.setState({
                        loading: true
                    });
                    console.log("appsss");
                    window.location.href = '/thanks';
                    // this.setState({

                    // });

                }).catch((error) => {
                    this.setState({
                        loading: true
                    });
                    console.log(error)
                });

            ///Add to db - end


        }






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
                        <td class="tableleft">
                            {/* Table Left start */}
                            <img src="https://news.usc.edu/files/2015/10/delivery_WEB-1200x800.jpg" width="300px" height="300px" />
                            {/* Table left end */}
                        </td>
                        <td class="tableright">
                            {/* Table right start */}
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
                                        <div id="colprice" class="col">
                                            <label class="price">{this.state.totprice}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={this.handleCheckboxChange} />
                                    <label id="agreeTerms" class="form-check-label" for="exampleCheck1">Agree tearms and conditions</label>
                                </div>
                                <p>* Delivery Charges will be applied</p>

                                <button id="customSubmitButton" class="btn btn-primary" onClick={this.handleCashOnDeliveryClicked} >Place Order >>></button>
                                {this.state.loading ? (
                                    <div class="itemLoading">
                                        <img src="https://www.bmimages.com/images/WaitCover.gif"
                                            alt="Loading..." height="20" width="20" />
                                    </div>
                                ) : null}
                            </div>
                            {/* Table right end */}
                        </td>
                    </tr>
                </table>







            </div>
        )
    }
}
