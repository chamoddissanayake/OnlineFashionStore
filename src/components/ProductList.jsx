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
       
        <center>
        <img src="https://thumbs.dreamstime.com/b/products-colorful-stuck-stripes-text-alphabets-written-over-background-79309192.jpg" class="d-block " alt="..." width="300" height="100" /><br></br>

          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" width="200" height="300">

            <div class="carousel-inner">
              <div class="carousel-item active" data-interval="2000">
                <img src="https://images-na.ssl-images-amazon.com/images/I/71OP3u2709L._UL1500_.jpg" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://cdn.shopify.com/s/files/1/1384/4105/products/white-saree-with-pink-border-3_1024x1024.jpg?v=1571439253" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://rukminim1.flixcart.com/image/332/398/jj4ln680-1/kids-dress/e/k/k/3-4-years-babin001a-unique-collection-original-imaf6qsskwgjg2fp.jpeg?q=50" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsUfnI99ZAXRyqcK2I9Bf_Mm_IXoCz-U2asbc4AHV2WAF27kkz&usqp=CAU" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsbcU2vIrpPcWlgWCm9b_vCDbfLWWoI_HVwx-3BE0RN-tY8ho4&usqp=CAU" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://i.pinimg.com/originals/4d/28/d6/4d28d694f098412b1b24b02ee4f26a64.jpg" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_prCCfWrvzIWxANdmXvNXbP6lQlYvAxoi2XQ1TB6r3nonq7NT&usqp=CAU" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1dWC4xSjsItEqSwpwV2zXOtwcIbt_J7Igfa68-N2eJYcsVFgq&usqp=CAU" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://img.looksgud.com/upload/item-image/524/b8g9/b8g9-starword-fashion-dresses-for-womenwomens-clothing-dress-for_500x500_0.jpg" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://5.imimg.com/data5/XX/QV/MY-20341496/wedant-fashion-purple-color-formal-shirt-500x500.png" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="2000">
                <img src="https://4.imimg.com/data4/VN/LH/MY-7374997/mens-fashion-shirts-250x250.jpg" class="d-block " alt="..." width="200" height="300" />
              </div>

              <div class="carousel-item" data-interval="1000">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYIrfoWxPfX-66KhyTef1lifY4mnLRgzt9Fgg2RQ2dOAgwlidp&usqp=CAU" class="d-block " alt="..." width="200" height="300" />
              </div>
            </div>



            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>

            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>

          </div>
        </center><br></br>


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