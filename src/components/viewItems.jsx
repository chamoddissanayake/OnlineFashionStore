import React, { Component } from 'react'

import axios from 'axios';

import ProductItem from './ProductItem';

import { getProducts } from '../repository';

import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000';

export default class viewItems extends Component{

    
    constructor(props) {

        super(props);
    
        this.state = {
    
          products: []
    
        }
    
      }

      componentDidMount() {

        getProducts().then((products) => this.setState({ products }));
    
      }
  



      render() {

        const { products } = this.state;
    
        return (
    
          <div className=" container">
    
            <h3 className="card-title">View Items</h3><hr />
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Available Quantity</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
            
    
            <hr />
    
            
    
    
    
          </div>
    
        );
    
      }

}