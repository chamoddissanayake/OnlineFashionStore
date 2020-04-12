import React, { Component } from 'react'
import axios from 'axios';
import { postSelectedProduct } from '../repository';

const BASE_URL = 'http://localhost:5000';

export default class selectItem extends Component {

    constructor(props) {

        super(props);

        this.state = {
            currentID: this.props.match.params.id,
            selectedProduct: {}

        }

    }
    componentDidMount() {

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



    render() {

        const { selectedProduct } = this.state;

        const sliderImagestyle = {
            height: "300px",

        };


        const sliderCaroselStyle = {
            width: "20%"
        };

        return (
            <div>
                SelectItem
                {this.props.match.params.id}
                {console.log(selectedProduct)}
                {selectedProduct._id}
                {selectedProduct.id}
                {selectedProduct.category}
                {selectedProduct.brand}
                {selectedProduct.name}
                {selectedProduct.description}
                {selectedProduct.price}
                {selectedProduct.available_quantity}
                {/* {selectedProduct.imageURL_main}
                {selectedProduct.imageURL_1}
                {selectedProduct.imageURL_2}
                {selectedProduct.imageURL_3} */}

                {/* //Slider - start */}
                <div class="container">
                    <h2>Carousel Example</h2>
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






            </div>
        )
    }
}
