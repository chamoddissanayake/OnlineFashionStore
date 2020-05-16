import React from 'react';

import ProductItem from './ProductItem';

import { getProducts } from '../repository';

import { Link } from 'react-router-dom';
import loadingStyles from '../css/loadingStyles.css';


export default class ProductList extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      products: [],
      dataNotReceived: true
    }

  }



  componentDidMount() {

    getProducts().then((products) => this.setState({
      products,
      dataNotReceived: false

    }));

  }



  render() {

    const { products } = this.state;

    return (

      <div className=" container">

        <h3 className="card-title">List of Available Products</h3><hr />

        {this.state.dataNotReceived ? (
          <div class="mainLoading">
            <img src="https://gifimage.net/wp-content/uploads/2017/11/gif-caricamento-11.gif"
              alt="Loading..." height="300" width="300" />
          </div>
        ) : null}



        {products.map((product, index) => <ProductItem product={product} key={index} />)}

        <hr />

        {/* <Link to="/checkout">

          <button className="btn btn-success float-right">Checkout</button>

        </Link>

        <Link to="/cart">

          <button className="btn btn-primary float-right"

            style={{ marginRight: "10px" }}>View Cart</button>

        </Link>
         */}
        <br /><br /><br />



      </div>

    );

  }

}