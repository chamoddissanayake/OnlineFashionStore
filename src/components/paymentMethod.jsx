import React, { Component } from 'react'
import commentBoxStyles from '../css/paymentMethodStyles.css';

export default class paymentMethod extends Component {

    goBackToMain = (event) => {
        const { location } = this.props;
        if (location.state && location.state.from) {
            this.props.history.push(location.state.from);
        } else {
            this.props.history.push('/');
        }
        window.location.reload();
    };


    // handleRadioChange(event) {

    // }

    handleVisaClick() {
        console.log("Handle visa clicked");
        window.location.href = '/paymentGateway?type=visa';
    }
    handleMasterClick() {
        console.log("Handle Master clicked");
        window.location.href = '/paymentGateway?type=master';
    }
    handleAmexClick() {
        console.log("Handle Amex clicked");
        window.location.href = '/paymentGateway?type=amex';
    }
    handleHNBClick() {
        console.log("Handle HNB clicked");
        window.location.href = '/paymentGateway?type=hnb';
    }
    handleCashOnDeliveryClick() {
        console.log("Handle Cash On Delivery clicked");
        window.location.href = '/paymentGateway?type=cash';
    }








    render() {
        return (
            <div>


                <div class="container">
                    <div class="row">
                        <div class="paymentCont">
                            <div class="headingWrap">
                                <h3 class="headingTop text-center">Select Your Payment Method</h3>
                            </div>
                            <div class="paymentWrap">
                                <div class="btn-group paymentBtnGroup btn-group-justified" data-toggle="buttons" >
                                    <label class="btn paymentMethod active">
                                        <div class="method visa"></div>
                                        <input type="radio" name="options" value="visa" onChange={this.handleRadioChange} />


                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method master-card"></div>
                                        <input type="radio" name="options" onChange={this.handleRadioChange} />
                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method amex"></div>
                                        <input type="radio" name="options" onChange={this.handleRadioChange} />
                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method vishwa"></div>
                                        <input type="radio" name="options" onChange={this.handleRadioChange} />
                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method ez-cash"></div>
                                        <input type="radio" name="options" onChange={this.handleRadioChange} />
                                    </label>

                                </div>
                            </div>
                            <div class="footerNavWrap clearfix">
                                <div class="btn btn-success pull-left btn-fyi" onClick={this.goBackToMain} ><span class="glyphicon glyphicon-chevron-left"></span> CONTINUE SHOPPING</div>
                                {/* <div class="btn btn-success pull-right btn-fyi">CHECKOUT<span class="glyphicon glyphicon-chevron-right"></span></div> */}
                            </div>
                        </div>

                    </div>
                </div>


                <button onClick={this.handleVisaClick} >--Visa--</button>
                <button onClick={this.handleMasterClick} >--Master--</button>
                <button onClick={this.handleAmexClick} >--Amex--</button>
                <button onClick={this.handleHNBClick} >--HNB--</button>
                <button onClick={this.handleCashOnDeliveryClick} >--Cash On Delivery--</button>




            </div>
        )
    }
}
