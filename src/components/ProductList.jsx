import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import ProductItem from './ProductItem';

import { getProducts } from '../repository';

import { Link } from 'react-router-dom';
import loadingStyles from '../css/loadingStyles.css';



export default class ProductList extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      products: [],
      allproducts: [],
      dataNotReceived: true,
      offset: 0,
      perPage: 6
    }

  }



  componentDidMount() {
    const indexOfLastPost = 1 * this.state.perPage;
    const indexOfFirstPost = indexOfLastPost - this.state.perPage;
    getProducts().then((allproducts) => this.setState({
      allproducts,
      products: allproducts.slice(indexOfFirstPost, indexOfLastPost),
      dataNotReceived: false,
      pageCount: Math.ceil(allproducts.length / this.state.perPage)
    }));

  }



  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);
    const indexOfLastPost = (selected + 1) * this.state.perPage;
    const indexOfFirstPost = indexOfLastPost - this.state.perPage;
    this.setState({
      offset: offset,
      products: this.state.allproducts.slice(indexOfFirstPost, indexOfLastPost),
    });
  };

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

        {!this.state.dataNotReceived ? (
          <div class="paginateSection">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>

        ) : null}

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