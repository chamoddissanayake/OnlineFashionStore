import React from 'react';

export default class TableRow extends React.Component {

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
            <button className="btn btn-primary">Edit</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
        )
    
      }

}
