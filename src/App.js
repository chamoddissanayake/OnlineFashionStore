import React, { Component } from 'react';

import Loginxx from './components/Loginxx';

import Products from './components/ProductList';

import Cart from './components/Cart';

import Checkout from './components/Checkout';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { isAuthenticated } from './repository';

import addItem from './components/addItem';

import viewItems from './components/viewItems';

import editItems from './components/editItems';

import StoreManagerDashbord from './components/StoreManagerDashbord';

import Wishlist from './components/Wishlist';

import selectItem from './components/selectItem';
import utils from './utils/utils';
import Logout from './components/Logout';
import PaymentMethod from './components/paymentMethod';
import PaymentGateway from './components/PaymentGateway';
import CashOnDelivery from './components/CashOnDelivery';
import CartLogo from './components/CartLogo';
import ThanksForPurchasing from './components/ThanksForPurchasing';
import mainStyle from './css/mainStyle.css';
import newUserRegistration from './components/newUserRegistration';



class App extends Component {


  constructor() {
    super();
    this.state = {
      loggedInUserObj: {},
    };

  }


  logOut() {

    localStorage.removeItem('x-access-token');

  }
  // checkLoggedInUser() {

  //   var retrievedObject = localStorage.getItem('loggedInUser');

  //   if (retrievedObject != null) {

  //     var k = JSON.parse(retrievedObject);

  //     this.setState(this.state.loggedInUserObj = k);



  //     console.log("" + k.type);
  //     console.log("" + this.state.loggedInUserObj.type);
  //   } else {
  //     console.log("User not logged");
  //   }


  // }

  componentDidMount() {
    // this.checkLoggedInUser();
    this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());

  }



  render() {
    const auth = isAuthenticated();
    return (

      <Router>

        <div>
          {/* {this.state.loggedInUserObj.type}
          {localStorage.getItem("loggedInUser").type} */}

          <nav className="navigationBarCustom navbar  navbar-dark bg-info" >

            <div className="container">

              <div className="navbar-brand" to="/">Online Fashion Store</div>

              <button className="navbar-toggler" type="button"

                data-toggle="collapse" data-target="#navbarNavAltMarkup"

                aria-controls="navbarNavAltMarkup" aria-expanded="false"

                aria-label="Toggle navigation">

                <span className="navbar-toggler-icon"></span>

              </button>

              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                <div className="navbar-nav">
                  <span class="customButtonsInNavBar">

                  </span>
                  <Link className="naviButCust naviButton nav-item nav-link" to="/">Products</Link><br />

                  {this.state.loggedInUserObj.type == "member" && <span>
                    <Link className="naviButCust naviButton nav-item nav-link" to="/cart">Cart</Link><br />
                  </span>}

                  {this.state.loggedInUserObj.type == "manager" && <span>
                    <Link className="naviButCust naviButton nav-item nav-link" to="/storeManager">StoreManagerDashbord</Link><br />
                  </span>}

                  {this.state.loggedInUserObj.type == "member" && <span>
                    <Link className="naviButCust naviButton nav-item nav-link" to="/wishlist">My Wishlist</Link><br />
                  </span>}

                  {/* {(auth) ? <Link className="nav-item nav-link" to="/checkout">

                    Checkout</Link> : ''} */}

                  {/* {(auth) ?

                    (<a className="nav-item nav-link" href="/"

                      onClick={this.logOut}>Log out</a>) :

                    (<Link className="nav-item nav-link float-right"

                      to="/login">Log in</Link>)

                  } */}
                  {/* 
                  {!utils.isEmpty(this.state.loggedInUserObj) && <span>
                    <Link className="nav-item nav-link" to="/checkout">Checkout</Link>
                  </span>} */}

                  {!utils.isEmpty(this.state.loggedInUserObj) && <span>
                    <Link className="naviButCust naviButton nav-item nav-link" to="/logout">Logout</Link>
                  </span>}

                  {utils.isEmpty(this.state.loggedInUserObj) && <span>
                    <Link className="naviButCust naviButton nav-item nav-link float-right" to="/login">Log in</Link>
                  </span>}



                </div>

              </div>

            </div>

            {!utils.isEmpty(this.state.loggedInUserObj) && <span>
              <p style={{ color: "white" }} >Hi {this.state.loggedInUserObj.username}</p>
            </span>}

            <CartLogo></CartLogo>

          </nav>



          <div className="container">

            <br />

            <Route exact path="/" component={Products} />

            <Route exact path="/cart" component={Cart} />

            <Route exact path="/add" component={addItem} />

            <Route exact path="/checkout" component={Checkout} />

            <Route exact path="/viewItems" component={viewItems} />

            <Route exact path="/editItems/:id" component={editItems} />

            <Route exact path="/storeManager" component={StoreManagerDashbord} />

            <Route exact path="/wishlist" component={Wishlist} />

            {/* <Route exact path="/selectItem" component={selectItem} /> */}
            <Route exact path="/selectItem/:id" component={selectItem} />


            {(!auth) ? <Route exact path="/login" component={Loginxx} /> : ''}

            <Route exact path="/logout" component={Logout} />

            <Route exact path="/paymentMethod" component={PaymentMethod} />

            <Route exact path="/paymentGateway" component={PaymentGateway} />

            <Route exact path="/cashOnDelivery" component={CashOnDelivery} />
            <Route exact path="/thanks" component={ThanksForPurchasing} />
            <Route exact path="/newUser" component={newUserRegistration} />

          </div>

        </div>

      </Router>

    );

  }

}



export default App;