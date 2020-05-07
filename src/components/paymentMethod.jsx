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


    handleRadioChange(event) {
        // console.log(event.currentTarget.value);
        if (event.currentTarget.value == 'vi') {
            window.location.href = '/paymentGateway?type=visa';
        } else if (event.currentTarget.value == 'masa') {
            window.location.href = '/paymentGateway?type=master';
        } else if (event.currentTarget.value == 'ame') {
            window.location.href = '/paymentGateway?type=amex';
        } else if (event.currentTarget.value == 'vis') {
            window.location.href = '/paymentGateway?type=hnb';
        } else if (event.currentTarget.value == 'ez') {
            window.location.href = '/cashOnDelivery';
        }





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
                                <div class="btn-group paymentBtnGroup btn-group-justified"  >
                                    <label class="btn paymentMethod active">
                                        <div class="method visa"></div>
                                        <input type="radio" name="options" value="vi" onChange={this.handleRadioChange} />


                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method master-card"></div>
                                        <input type="radio" name="options" value="masa" onChange={this.handleRadioChange} />
                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method amex"></div>
                                        <input type="radio" name="options" value="ame" onChange={this.handleRadioChange} />
                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method vishwa"></div>
                                        <input type="radio" name="options" value="vis" onChange={this.handleRadioChange} />
                                    </label>
                                    <label class="btn paymentMethod">
                                        <div class="method ez-cash"></div>
                                        <input type="radio" name="options" value="ez" onChange={this.handleRadioChange} />
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



            </div>
        )
    }
}