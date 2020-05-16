import React, { Component } from 'react'
import axios from 'axios';
import { postSelectedProduct } from '../repository';
import CommentBox from './CommentBox';
import utils from '../utils/utils';
import commentBoxStyles from '../css/selectItemStyles.css';
const BASE_URL = 'http://localhost:5000';


export default class selectItem extends Component {

    constructor(props) {

        super(props);
        this.handleWishlistClick = this.handleWishlistClick.bind(this);
        this.state = {
            currentID: this.props.match.params.id,
            selectedProduct: {},
            quantity: 1,
            loggedInUserObj: {},
            dataNotReceived: true

        }

    }
    componentDidMount() {

        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());

        postSelectedProduct(this.state.currentID)
            .then((product) => {
                // this.setState(product);
                // this.setState(this.state.selectedProduct.push(product));

                this.setState({
                    selectedProduct: product[0],
                    dataNotReceived: false
                });
            }).catch((error) => {
                console.log(error);
                this.setState(
                    this.state.dataNotReceived = false
                );
            });

        // axios.post(`${BASE_URL}/api/selectitem`, { id: this.state.currentID })
        //     .then(response => response.data);
    }
    handleWishlistClick(product) {
        console.log("Wishlist clicked");
        console.log(product._id);
        // console.log(this.state.loggedInUserObj.username);

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
                alert("Item was added to your wishlist");
            })
            .catch(err => {
                alert("Error Occurred");
                Promise.reject('Something Went Wrong!')
            });



    }


    addToCart = () => {
        if (this.state.loggedInUserObj != null) {

            let cart = localStorage.getItem('cart')

                ? JSON.parse(localStorage.getItem('cart')) : [];

            let currentObj = this.state.selectedProduct;
            currentObj.needQuantity = this.state.quantity;


            if (this.state.selectedProduct.available_quantity > 0) {
                cart.push(currentObj)
            };
            localStorage.setItem('cart', JSON.stringify(cart));

        } else {
            window.location.href = '/login';
        }
    }



    handleInputChange = event =>

        this.setState({ [event.target.name]: event.target.value })



    render() {

        const { selectedProduct } = this.state;

        const sliderImagestyle = {
            height: "300px",

        };


        const sliderCaroselStyle = {
            width: "100%"
        };

        const sliderContainerStyle = {
            width: "100%"
        };

        return (
            <div>
                <div class="loadingClass">
                    {this.state.dataNotReceived ? (
                        <div class="itemLoading">
                            <img src="https://gifimage.net/wp-content/uploads/2017/11/gif-caricamento-11.gif"
                                alt="Loading..." height="300" width="300" />
                        </div>
                    ) : null}
                </div>


                {!this.state.dataNotReceived ? (
                    <div class="pageContent">

                        <h2>{selectedProduct.name}</h2>
                        <table>
                            <tr>
                                <td>
                                    {/* Large table left side - start */}
                                    {/* //Slider - start */}
                                    <div class="container" style={sliderContainerStyle}>

                                        <div id="myCarousel" class="carousel slide" data-ride="carousel" style={sliderCaroselStyle} >

                                            <ol class="carousel-indicators">
                                                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                                                <li data-target="#myCarousel" data-slide-to="1"></li>
                                                <li data-target="#myCarousel" data-slide-to="2"></li>
                                                <li data-target="#myCarousel" data-slide-to="3"></li>
                                            </ol>


                                            <div class="carousel-inner">
                                                <div class="item active">
                                                    <img src={selectedProduct.imageURL_main} alt="Image Not Found" style={sliderImagestyle} />
                                                </div>

                                                <div class="item">
                                                    <img src={selectedProduct.imageURL_1} alt="Image Not Found" style={sliderImagestyle} />
                                                </div>

                                                <div class="item">
                                                    <img src={selectedProduct.imageURL_2} alt="Image Not Found" style={sliderImagestyle} />
                                                </div>

                                                <div class="item">
                                                    <img src={selectedProduct.imageURL_3} alt="Image Not Found" style={sliderImagestyle} />
                                                </div>
                                            </div>

                                            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                                                <span class="glyphicon glyphicon-chevron-left"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                                                <span class="glyphicon glyphicon-chevron-right"></span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                    {/* Slider - End */}
                                    {/* Large table left side - End */}
                                </td>
                                <td>
                                    {/* Large table right side - start */}

                                    {/* Details - start */}
                                    <div id="detailsDiv">

                                        <table>
                                            <tr>
                                                <td>
                                                    <label class="boldLbl">Product Category :</label>
                                                </td>
                                                <td>
                                                    {selectedProduct.category}
                                                </td>
                                            </tr>
                                            {/* <tr>
                                        <td>
                                            Product Brand :
                                        </td>
                                        <td>
                                            {selectedProduct.brand}
                                        </td>
                                    </tr> */}
                                            <tr>
                                                <td>
                                                    <label class="boldLbl"> Product Name :</label>
                                                </td>
                                                <td>
                                                    {selectedProduct.name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label class="boldLbl">Product Description :</label>
                                                </td>
                                                <td>
                                                    {selectedProduct.description}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label class="boldLbl">Product Price :</label>

                                                </td>
                                                <td>
                                                    {selectedProduct.price}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label class="boldLbl">Available Quantity :</label>
                                                </td>
                                                <td>
                                                    {selectedProduct.available_quantity}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>

                                                    {/* Add To wishlist */}
                                                    {/* {this.state.loggedInUserObj.type == "member" && <span> */}
                                                    <div title="Add this Item to wishlist">
                                                        <div onClick={() => this.handleWishlistClick(selectedProduct)}  >
                                                            <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/241/red-heart_2764.png"
                                                                alt="Add to wishlist" height="30" width="30" />
                                                        </div>

                                                    </div>
                                                    {/* </span>} */}

                                                </td>
                                                <td>
                                                    {/* Add to cart button - Start */}
                                                    <span>

                                                        {selectedProduct.available_quantity > 0 ?

                                                            <div>

                                                                <button className="btn btn-sm btn-warning float-right"

                                                                    onClick={this.addToCart}>Add to cart</button>




                                                                <input type="number" value={this.state.quantity} name="quantity" min="0" max={selectedProduct.available_quantity}

                                                                    onChange={this.handleInputChange} className="float-right"

                                                                    style={{ width: "60px", marginRight: "10px", borderRadius: "3px" }} />

                                                            </div> :

                                                            <p className="text-danger"> product is out of stock </p>

                                                        }

                                                    </span>
                                                    {/* Add to cart button - End */}
                                                </td>
                                            </tr>

                                        </table>

                                    </div>
                                    {/* Details - End */}
                                    {/* Large table right side - end */}
                                </td>
                            </tr>
                        </table>

                        <br />


                        {
                            !utils.isEmpty(this.state.loggedInUserObj) && <span>
                                <div id="commentDiv">
                                    <CommentBox selectedProduct={selectedProduct} />
                                </div>
                            </span>
                        }
                        {
                            utils.isEmpty(this.state.loggedInUserObj) && <span>
                                <h4>Hi, Guest. You can add your thoughts about this product. Please Log ...</h4>
                            </span>
                        }
                    </div>
                ) : null}





            </div>
        )
    }
}
