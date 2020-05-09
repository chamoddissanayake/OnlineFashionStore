import React, { Component } from 'react'
import paymentGatewayStyles from '../css/paymentGatewayStyles.css';
export const CARD_NUMBER_REGEX = /^[0-9]{0,16}$/;


export default class PaymentGateway extends Component {



    constructor(props) {
        super(props);
        this.state = {
            typeImg: '',
            owner: '',
            cardNo: '',
            expDate: '',
            cvcCode: 0
        }
    }


    componentDidMount() {
        console.log("--")
        console.log(this.props.location.search);
        this.findType();
        this.handleChangeOwner = this.handleChangeOwner.bind(this);
        this.handleChangeCardNo = this.handleChangeCardNo.bind(this);
        this.handleChangeExpDate = this.handleChangeExpDate.bind(this);
        this.handleChangeCVCCode = this.handleChangeCVCCode.bind(this);
        this.handleProcessPaymentClicked = this.handleProcessPaymentClicked.bind(this);

    }

    findType() {
        if (this.props.location.search == '?type=visa') {
            this.setState({ typeImg: 'https://firebasestorage.googleapis.com/v0/b/fashionstore-276105.appspot.com/o/payment%2Fvisa.png?alt=media&token=7b49edee-3b0b-4990-9ba0-759d34033c34' });
        } else if (this.props.location.search == '?type=master') {
            this.setState({ typeImg: 'https://firebasestorage.googleapis.com/v0/b/fashionstore-276105.appspot.com/o/payment%2Fmaster.png?alt=media&token=781b9692-1711-46d6-8051-ea802ed31ef5' });
        } else if (this.props.location.search == '?type=amex') {
            this.setState({ typeImg: 'https://firebasestorage.googleapis.com/v0/b/fashionstore-276105.appspot.com/o/payment%2Famex.png?alt=media&token=b425e3cd-94c6-4dfd-b119-cd3d82af42b6' });
        } else if (this.props.location.search == '?type=hnb') {
            this.setState({ typeImg: 'https://firebasestorage.googleapis.com/v0/b/fashionstore-276105.appspot.com/o/payment%2Fhnb.png?alt=media&token=5486385c-11d0-4d24-9dcc-e3e730ec339b' });
        }

    }

    handleProcessPaymentClicked() {

        console.log(this.state.owner);
        console.log(this.state.cardNo);
        console.log(this.state.expDate);
        console.log(this.state.cvcCode);

        let cardNumber = this.state.cardNo;
        cardNumber = this.formatCardNumber(cardNumber);

        if (this.state.owner == '') {
            alert('Please enter name');
        } else if (this.state.cardNo == 0) {
            alert('Please enter card number');
        } else if (this.state.expDate == '') {
            alert('please enter expire date');
        } else if (this.state.cvcCode == '') {
            alert('please enter cvc code');
        } else if (!(cardNumber.match(/^-{0,1}\d+$/))) {
            //not valid integer (positive or negative)
            alert('Not a valid card number');
        } else {
            //valid number
            //check number has 16 digits
            if (cardNumber.length == 16) {
                //All validation correct
                // alert('correct');
                let cvcCode = this.state.cvcCode;
                if (cvcCode.length == 3) {
                    window.location.href = '/thanks';
                } else {
                    alert('Incorrect CVC Number');
                }
            } else {
                alert('Invalid card number');
            }
        }
    }




    checkNullOrUndefined(value) {
        return value === null || value === undefined;
    }
    checkNullOrUndefinedOrEmptyString(value) {
        return this.checkNullOrUndefined(value) || value === '';
    }

    formatCardNumber(cardNumber) {
        if (!this.checkNullOrUndefinedOrEmptyString(cardNumber)) {
            let card = cardNumber.trim();
            let vals = card.split(' ');
            let number = '';
            vals.forEach((val) => {
                number += val;
            });
            console.log(number);
            return number;
        }
        return '';
    }





    handleChangeOwner(event) {
        this.setState({ owner: event.target.value });
    }

    handleChangeCardNo(event) {
        this.setState({ cardNo: event.target.value });
    }
    handleChangeExpDate(event) {
        this.setState({ expDate: event.target.value });
    }
    handleChangeCVCCode(event) {
        this.setState({ cvcCode: event.target.value });
    }


    render() {
        return (
            <div>
                {/* {console.log(this.props.location)} */}

                <div class="container">

                    <div class="page-header">
                        <h1>Payment Gateway </h1>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-md-4 col-md-offset-4">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <div class="row">
                                            <h3 class="text-center">Payment Details</h3>
                                            {/* <img class="img-responsive cc-img" src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png" /> */}
                                            <img class="img-responsive cc-img" src={this.state.typeImg} />
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <form role="form">
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="form-group">
                                                        <label>CARD OWNER</label>
                                                        <input type="text" class="form-control" onChange={this.handleChangeOwner} placeholder="Name on the card" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="form-group">
                                                        <label>CARD NUMBER</label>
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" onChange={this.handleChangeCardNo} placeholder="Valid Card Number" />
                                                            <span class="input-group-addon"><span class="fa fa-credit-card"></span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-7 col-md-7">
                                                    <div class="form-group">
                                                        <label><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>
                                                        <input type="tel" class="form-control" placeholder="MM / YY" onChange={this.handleChangeExpDate} />
                                                    </div>
                                                </div>
                                                <div class="col-xs-5 col-md-5 pull-right">
                                                    <div class="form-group">
                                                        <label>CV CODE</label>
                                                        <input type="tel" class="form-control" placeholder="CVC" onChange={this.handleChangeCVCCode} />
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div class="panel-footer">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <button class="btn btn-warning btn-lg btn-block" onClick={this.handleProcessPaymentClicked} >Process payment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>






            </div>
        )
    }
}
