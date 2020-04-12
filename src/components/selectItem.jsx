import React, { Component } from 'react'
import axios from 'axios';
import { postSelectedProduct } from '../repository';
import CommentBox from './CommentBox';
import utils from '../utils/utils';

const BASE_URL = 'http://localhost:5000';

export default class selectItem extends Component {

    constructor(props) {

        super(props);

        this.state = {
            currentID: this.props.match.params.id,
            selectedProduct: {},
            quantity: 1,
            loggedInUserObj: {}
        }

    }
    componentDidMount() {

        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());

        postSelectedProduct(this.state.currentID)
            .then((product) => {
                // this.setState(product);
                // this.setState(this.state.selectedProduct.push(product));
                this.setState(this.state.selectedProduct = product);
            }).catch((error) => {
                console.log(error);
            });

        // axios.post(`${BASE_URL}/api/selectitem`, { id: this.state.currentID })
        //     .then(response => response.data);
    }
    addToCart = () => {

        let cart = localStorage.getItem('cart')

            ? JSON.parse(localStorage.getItem('cart')) : {};

        let id = this.state.selectedProduct.id.toString();

        cart[id] = (cart[id] ? cart[id] : 0);

        let qty = cart[id] + parseInt(this.state.quantity);

        if (this.state.selectedProduct.available_quantity < qty) {

            cart[id] = this.state.selectedProduct.available_quantity;

        } else {

            cart[id] = qty

        }

        localStorage.setItem('cart', JSON.stringify(cart));

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
                {this.props.match.params.id}<br />
                {console.log(selectedProduct)}<br />
                {selectedProduct._id}<br />
                {selectedProduct.id}<br />
                {selectedProduct.category}<br />
                {selectedProduct.brand}<br />
                {selectedProduct.name}<br />
                {selectedProduct.description}<br />
                {selectedProduct.price}<br />
                {selectedProduct.available_quantity}<br />
                {/* {selectedProduct.imageURL_main}
                {selectedProduct.imageURL_1}
                {selectedProduct.imageURL_2}
                {selectedProduct.imageURL_3} */}

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
                                            Product Category :
                            </td>
                                        <td>
                                            {selectedProduct.category}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Product Brand :
                            </td>
                                        <td>
                                            {selectedProduct.brand}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Product Name :
                            </td>
                                        <td>
                                            {selectedProduct.name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Product Description :
                            </td>
                                        <td>
                                            {selectedProduct.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Product Price :
                            </td>
                                        <td>
                                            {selectedProduct.price}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Available Quantity :
                            </td>
                                        <td>
                                            {selectedProduct.available_quantity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
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


                {!utils.isEmpty(this.state.loggedInUserObj) && <span>
                    <div id="commentDiv">
                        <CommentBox selectedProduct={selectedProduct} />
                    </div>
                </span>}
                {utils.isEmpty(this.state.loggedInUserObj) && <span>
                    <h4>Hi, Guest. You can add your thoughts about this product. Please Log ...</h4>
                </span>}




            </div>
        )
    }
}
