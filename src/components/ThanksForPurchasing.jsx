import React, { Component } from 'react'
import commentBoxStyles from '../css/thanksStyles.css';

export default class ThanksForPurchasing extends Component {

    componentDidMount() {


        this.clearCartItems();
    }
    clearCartItems() {
        localStorage.removeItem("cart");
    }

    goBackToMain = (event) => {
        const { location } = this.props;
        if (location.state && location.state.from) {
            this.props.history.push(location.state.from);
        } else {
            this.props.history.push('/');
        }
        window.location.reload();
    };

    render() {
        return (
            <div>
                <div class="thanks">
                    Thank for purchasing
                </div>



                <br /><br /><br /><br /><br />
                <div class="footerNavWrap clearfix">
                    <div class="btn btn-success pull-left btn-fyi" onClick={this.goBackToMain} ><span class="glyphicon glyphicon-chevron-left"></span> CONTINUE SHOPPING</div>
                    {/* <div class="btn btn-success pull-right btn-fyi">CHECKOUT<span class="glyphicon glyphicon-chevron-right"></span></div> */}
                </div>
            </div>
        )


    }
}
