import React, { Component } from 'react';

import Login from './components/Login';

import Products from './components/ProductList';

import Cart from './components/Cart';

import Checkout from './components/Checkout';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { isAuthenticated } from './repository';

import addItem from './components/addItem';

import viewItems from './components/viewItems';

import editItems from './components/editItems';

import StoreManagerDashbord from './components/StoreManagerDashbord';





class App extends Component {



  logOut() {

    localStorage.removeItem('x-access-token');

  }



  render() {

    const auth = isAuthenticated();

    return (

      <Router>

        <div>

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

              <Link className="navbar-brand" to="/">ShoppingCart</Link>

              <button className="navbar-toggler" type="button"

                data-toggle="collapse" data-target="#navbarNavAltMarkup"

                aria-controls="navbarNavAltMarkup" aria-expanded="false"

                aria-label="Toggle navigation">

                <span className="navbar-toggler-icon"></span>

              </button>

              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                <div className="navbar-nav">

                  <Link className="nav-item nav-link" to="/">Products</Link><br />

                  <Link className="nav-item nav-link" to="/cart">Cart</Link><br />

                  <Link className="nav-item nav-link" to="/storeManager">StoreManagerDashbord</Link><br />

                  {(auth) ? <Link className="nav-item nav-link" to="/checkout">

                    Checkout</Link> : ''}

                  {(auth) ?

                    (<a className="nav-item nav-link" href="/"

                      onClick={this.logOut}>Log out</a>) :

                    (<Link className="nav-item nav-link float-right"

                      to="/login">Log in</Link>)

                  }

                </div>

              </div>

            </div>

          </nav>

          <div className="container">

            <br />

            <Route exact path="/" component={Products} />

            <Route exact path="/cart" component={Cart} />

            <Route exact path="/add" component={addItem} />

            <Route exact path="/checkout" component={Checkout} />

            <Route exact path="/viewItems" component={viewItems} />

            <Route exact path="/'/editItems/:id'" component={editItems} />

            <Route exact path="/storeManager" component={StoreManagerDashbord} />

            {(!auth) ? <Route exact path="/login" component={Login} /> : ''}

          </div>

        </div>

      </Router>

    );

  }

}



export default App;