import React, { Component } from 'react'

export default class addItem extends Component {
    render() {
        return (
            <div>
                <h2>Add Items</h2>

                <form>
                    <div class="form-group">
                        <label>ID</label>
                        <input type="text" class="form-control" id="id" />
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="name" />
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" id="description" />
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" min="0" step="0.00" class="form-control" id="price" />
                    </div>
                    <div class="form-group">
                        <label>Available Quantity</label>
                        <input type="number" min="0" step="0" class="form-control" id="available_quantity" />
                    </div>

                </form>



            </div>
        )
    }




}
