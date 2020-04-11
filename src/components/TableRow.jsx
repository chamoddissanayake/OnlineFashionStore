import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export default class TableRow extends React.Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
}

  delete() {
    axios.get('${BASE_URL}/api/products/delete/'+this.props.obj._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err))
  }
    render() {

        return (
          <tr>
          <td>
            {this.props.obj.id}
          </td>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td>
            {this.props.obj.price}
          </td>
          <td>
            {this.props.obj.available_quantity}
          </td>
          <td>
          <Link to={"/editItems/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
        )
    
      }
    

};