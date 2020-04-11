import React, { Component } from 'react'

export default class selectItem extends Component {
    render() {
        return (
            <div>
                SelectItem
                {this.props.match.params.id}


            </div>
        )
    }
}
