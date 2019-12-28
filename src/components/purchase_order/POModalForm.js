import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import '../layouts/styles/Product.css';
import { Modal, Button } from 'react-bootstrap';
import Select from "react-select";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import axios from 'axios';

class POModalForm extends Component {

	state = {
		product: []
	}

	// handle inputs
	handleInputChange = (e, index) => {
		this.state.product[index] = e.target.value;

		// set the changed state
		this.setState({ product: { [e.target.name]: this.state.product } })
	};
	

	// add new product
	handleAddProduct = () => {
		this.setState({ product: [...this.state.product, {"sku": "", "item": "", "qty": "", "price": ""}] });
	}

	// remove the product
	handleRemoveProduct = (index) => {
		// this.state.product.splice(index, 1);
		let product = this.state.product;
		product.splice(index, 1);
		this.setState({ product: product });
	}


	render() {

		const { product } = this.state;
		return (
			<Fragment>
				<table className="table table-hover table-striped table-bordered table-sm">
    				<thead>
						<tr>
							<th>SKU</th>
							<th>Item</th>
							<th>Qty</th>
							<th>Price</th>
							<th width="5%">Action</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.product.map((item, index) => {
									return (
									    <tr key={index}>
									        <td>
									            <input 
									                type="text"
									                name="sku"
									                onChange={(e) => this.handleInputChange(e, index)}
									                value={product.sku}
									                className="form-control"
									                placeholder="SKU"
									             />
									        </td>
									        <td width="40%">
									            <input 
									                type="text"     
									                name="item"
									                onChange={(e) => this.handleInputChange(e, index)}
									                value={product.item}
									                className="form-control"
									                placeholder="Item"
									             />
									        </td>
									        <td width="15%">
									            <input 
									                type="text"
									                name="qty"
									                onChange={(e) => this.handleInputChange(e, index)}
									                value={product.qty}
									                className="form-control p-1"
									                placeholder="Qty"
									             />
									        </td>
									        <td>
									            <input 
									                type="text"
									                name="price"
									                onChange={(e) => this.handleInputChange(e, index)}
									                value={product.price}
									                className="form-control p-1"
									                placeholder="Price"
									             />
									        </td>
									        <td>
									            <a 
									            	className="btn btn-danger text-white"
									            	onClick={() => this.handleRemoveProduct(index) }
									            >
									                <i className="la la-close"></i>
									            </a>
									        </td>
									    </tr>
									)
								}
							)
						}
						<tr>
							<td colSpan="4"></td>
							<td>
								<a 
									className="btn btn-info text-white"
									onClick={this.handleAddProduct}
								>
									<i className="la la-plus"></i>
								</a>
							</td>
						</tr>
					</tbody>
    			</table>	
			</Fragment>
		)
	}
}

export default POModalForm;