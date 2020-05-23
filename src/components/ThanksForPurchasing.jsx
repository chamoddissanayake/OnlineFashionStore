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



                <div className="thankImg">
                    <img src="https://073bddbe7aa062defd37fde3-cwzdvdpfea.netdna-ssl.com/wp-content/uploads/2019/09/shipping_challenges_ecommerce_mts_9.9.19-1.jpg" width="80%" height="80%" />
                </div>

                <br /><br />
                <div class="footerNavWrap clearfix">
                    <div class="btn btn-success pull-left btn-fyi" onClick={this.goBackToMain} ><span class="glyphicon glyphicon-chevron-left"></span> CONTINUE SHOPPING</div>
                    {/* <div class="btn btn-success pull-right btn-fyi">CHECKOUT<span class="glyphicon glyphicon-chevron-right"></span></div> */}
                </div>
            </div>
        )


    }
}
