import React, { Component } from 'react'
import axios from "axios";

class ProductShow extends Component {
	state = {
		id: this.props.match.params.id,
		showProduct: [],
		loading: false,
		redirect: false
	};
	
	componentDidMount() {
		this.getSingleProduct(this.state.id);
	}

	// get the item data
	getSingleProduct = async (id) => {
		this.setState({loading: true});

		let res = await axios.get(`http://inventory.test/api/admin/product/${id}`);
		this.setState({ showProduct: res.data , loading: false});
		console.log(res.data);
	}

	render() {
		// destructuring
		const {
			sku,
			product_name,
			brand,
			product_category,
			description,
			supplier,
			barcode,
			dimension_length,
			dimension_width,
			dimension_height,
			color,
			specs_category,
			material_tags,
			fitting_type,
			fitting_qty,
			weight_kg,
			packing_length,
			packing_width,
			packing_height,
			cost,
			srp,
			delivery_fee,
			stock_overwrite,
			customization_fee,
			stock_alarm,
			sales_price,
			product_image,
		} = this.state.showProduct;

		return (
			<div className="row">
				<div className="card card-body">
					<h1>General Information</h1> <hr/>
					
					<h4><strong>SKU: </strong>{sku}</h4>
					<h4><strong>Barcode: </strong>{barcode}</h4>
					<h4><strong>Product Name: </strong>{product_name}</h4>
					<h4><strong>Brand: </strong>{brand}</h4>
					<h4><strong>Category: </strong>{product_category}</h4>
					<h4><strong>Decription: </strong>{description}</h4>
					<h4><strong>Supplier: </strong>{supplier}</h4>
					<h4><strong>Dimension: </strong>L: {dimension_length} W: {dimension_width} H: {dimension_height}</h4>
					<div><strong>Color: </strong>{color}</div>
				</div>
			</div>
		)
	}
}


export default ProductShow;