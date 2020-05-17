import React from 'react';

import { Link } from 'react-router-dom';
import utils from '../utils/utils';
import commentBoxStyles from '../css/productItemStyles.css';

import axios from 'axios';

export default class ProductItem extends React.Component {

  constructor(props) {

    super(props);
    this.handleWishlistClick = this.handleWishlistClick.bind(this);
    this.state = {
      quantity: 1,
      loggedInUserObj: {}
    }
  }

  componentDidMount() {
    this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
  }

  handleWishlistClick(product) {
    console.log("Wishlist clicked");
    console.log(product._id);
    console.log(this.state.loggedInUserObj.username);
    console.log(utils.getCurrentDate());

    //Insert wishlist to db
    var objToWishlist =
    {
      username: this.state.loggedInUserObj.username,
      productId: product._id,
      addedDate: utils.getCurrentDate()
    };

    axios.post(`/api/addWishlist`, { objToWishlist })

      .then(response => {
        // console.log(response.data);


        if (response.data == true) {
          alert("Item was added to your wishlist");
        } else {
          alert("Error occurred while adding to your wishlist");
        }
      })
      .catch(err => {
        alert("Error Occurred");
        Promise.reject('Something Went Wrong!')
      });


  }

  handleInputChange = event =>

    this.setState({ [event.target.name]: event.target.value })



  addToCart = () => {

    if (this.state.loggedInUserObj != null) {

      let cart = localStorage.getItem('cart')

        ? JSON.parse(localStorage.getItem('cart')) : [];

      let currentObj = this.props.product;
      currentObj.needQuantity = this.state.quantity;

      console.log(this.props.product.available_quantity);
      if (this.props.product.available_quantity > 0) {
        cart.push(currentObj)
      };
      localStorage.setItem('cart', JSON.stringify(cart));

    } else {
      window.location.href = '/login';
    }

  }
  // clickWishlistIcon = (product) => {
  //   console.log("Wishlist Clicked");
  //   // console.log(product_Id);

  // }



  render() {



    const { product } = this.props;

    return (

      <div className="card" id="currentCard" >


        <table>
          <tr>
            <td id="table-left-side">
              {/* Display image- start */}
              <Link to={"/selectItem/" + product._id}>
                <img id="productImg" src={product.imageURL_main} alt="Image Not Found" height="250" width="200" />
              </Link>


              {/* Display image- end */}
            </td>
            <td id="table-right-side" >
              {/* Display Details - start */}
              <div className="card-body">

                <p className="card-text">{product.category}</p>

                <p className="card-text">{product.brand}</p>

                <h4 className="card-title">{product.name}</h4>

                <p className="card-text">{product.description}</p>

                <h5 className="card-text"><small>price: </small>${product.price}</h5>

                <span className="card-text">

                  <small>Available Quantity: </small>{product.available_quantity}

                </span>

                {product.available_quantity > 0 ?

                  <div>

                    <button className="btn btn-sm btn-warning float-right"

                      onClick={this.addToCart}>Add to cart</button>

                    <input type="number" value={this.state.quantity} name="quantity" min="0" max={product.available_quantity} class="form-control"

                      onChange={this.handleInputChange} className="float-right"

                      style={{ width: "60px", marginRight: "10px", borderRadius: "3px" }} ></input>

                  </div> :

                  <p className="text-danger"> product is out of stock </p>

                }

                {this.state.loggedInUserObj.type == "member" && <span>
                  <div title="Add this Item to wishlist">
                    <div onClick={() => this.handleWishlistClick(product)}  >
                      <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/241/red-heart_2764.png"
                        alt="Add to wishlist" height="30" width="30" />
                    </div>
                  </div>

                </span>}

              </div>
              {/* Display Details - end */}
            </td>
          </tr>
          <br />
        </table>



      </div>

    )

  }

}