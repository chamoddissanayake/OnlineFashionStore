import React, { Component } from 'react'
import commentBoxStyles from '../css/cashOnDeliveryStyles.css';
import utils from '../utils/utils';


export default class CashOnDelivery extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            totprice: 0
        };

    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
        this.getTotPrice();
    }

    handleCashOnDeliveryClicked() {

        window.location.href = '/thanks';
    }
    getTotPrice() {
        var tot = localStorage.getItem('totprice');
        this.setState({ totprice: tot });

    }

    render() {
        return (
            <div>


                <div id="cashOnDeliveryHeading" >
                    <h2>Cash On Delevery</h2>
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
                    <form id="cashOnDeliveryForm">
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
                            <input type="text" class="form-control" id="inputRecepientName" placeholder="Recepient Name" required />

                        </div>
                        <div class="form-group">
                            <label for="inputDeliveryAddress">Delivery Address</label>
                            <input type="text" class="form-control" id="inputDeliveryAddress" placeholder="Delivery Address" required />

                        </div>
                        <div class="form-group">
                            <label for="inputZip">Zip</label>
                            <input type="number" class="form-control" id="inputZip" placeholder="Zip" required />
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
                            <label class="form-check-label" for="exampleCheck1">Agree tearms and conditions</label>
                        </div>
                        <p>* Delivery Charges will be applied</p>
                        <button type="submit" class="btn btn-primary" onClick={this.handleCashOnDeliveryClicked} >Place Order >>></button>

                    </form>
                </div>


            </div>
        )
    }
}
