import React, { Component } from 'react';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import utils from '../utils/utils';

export default class CartLogo extends Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            ccou: 0
        };

    }

    loadCou() {
        this.setState({
            ccou: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length : 0
        })
        setTimeout(
            function () {
                this.loadCou();
            }.bind(this),
            1000
        );
    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
        this.loadCou();
    }


    render() {
        return (
            <div>

                {!utils.isEmpty(this.state.loggedInUserObj) && <span>
                    {/* <p style={{ color: "white" }} >Hi {this.state.loggedInUserObj.username}</p> */}


                    <Link className="nav-item nav-link float-right" to="/cart">
                        <img src="https://f1.pngfuel.com/png/797/375/618/supermarket-cartoon-shopping-cart-shopping-centre-grocery-store-online-shopping-yellow-orange-area-png-clip-art.png"
                            alt="Cart" height="35" width="35" />
                        {this.state.ccou}
                    </Link>

                </span>}


            </div>
        )
    }
}
