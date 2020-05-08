import React, { Component } from 'react'
import paymentGatewayStyles from '../css/paymentGatewayStyles.css';



export default class PaymentGateway extends Component {



    constructor(props) {
        super(props);
        this.state = {
            typeImg: ''
        }
    }


    componentDidMount() {
        console.log("--")
        console.log(this.props.location.search)
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
                                                        <input type="text" class="form-control" placeholder="Name on the card" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <div class="form-group">
                                                        <label>CARD NUMBER</label>
                                                        <div class="input-group">
                                                            <input type="tel" class="form-control" placeholder="Valid Card Number" />
                                                            <span class="input-group-addon"><span class="fa fa-credit-card"></span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-7 col-md-7">
                                                    <div class="form-group">
                                                        <label><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>
                                                        <input type="tel" class="form-control" placeholder="MM / YY" />
                                                    </div>
                                                </div>
                                                <div class="col-xs-5 col-md-5 pull-right">
                                                    <div class="form-group">
                                                        <label>CV CODE</label>
                                                        <input type="tel" class="form-control" placeholder="CVC" />
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div class="panel-footer">
                                        <div class="row">
                                            <div class="col-xs-12">
                                                <button class="btn btn-warning btn-lg btn-block">Process payment</button>
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
