import React from 'react';

import { Link } from 'react-router-dom';
import utils from '../utils/utils';

import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

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

    axios.post(`${BASE_URL}/api/addWishlist`, { objToWishlist })

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

    let cart = localStorage.getItem('cart')

      ? JSON.parse(localStorage.getItem('cart')) : {};

    let id = this.props.product.id.toString();

    cart[id] = (cart[id] ? cart[id] : 0);

    let qty = cart[id] + parseInt(this.state.quantity);

    if (this.props.product.available_quantity < qty) {

      cart[id] = this.props.product.available_quantity;

    } else {

      cart[id] = qty

    }

    localStorage.setItem('cart', JSON.stringify(cart));

  }
  // clickWishlistIcon = (product) => {
  //   console.log("Wishlist Clicked");
  //   // console.log(product_Id);

  // }


  render() {



    const { product } = this.props;

    return (

      <div className="card" style={{ marginBottom: "10px" }}>


        <table>
          <tr>
            <td>
              {/* Display image- start */}
              <Link to={"/selectItem/" + product._id}>
                <img src={product.imageURL_main} alt="Image Not Found" height="250" width="200" />
              </Link>


              {/* Display image- end */}
            </td>
            <td>
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

                    <input type="number" value={this.state.quantity} name="quantity" min="0" max={product.available_quantity}

                      onChange={this.handleInputChange} className="float-right"

                      style={{ width: "60px", marginRight: "10px", borderRadius: "3px" }} />

                  </div> :

                  <p className="text-danger"> product is out of stock </p>

                }

                {this.state.loggedInUserObj.type == "member" && <span>
                  <div onClick={() => this.handleWishlistClick(product)}  >
                    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/241/red-heart_2764.png"
                      alt="Add to wishlist" height="30" width="30" />
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