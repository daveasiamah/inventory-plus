import React, { Component, Fragment } from 'react';
import axios from "axios";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

class ProductShow extends Component {

	state = {
		id: this.props.match.params.id,
		singleProduct: {
			sku: "",
			product_name: "",
			brand: "",
			product_category: "",
			description: "",
			supplier: "",
			barcode: "",
			attributes: {
				dimension_length: "",
				dimension_width: "",
				dimension_height: "",
				color: "",
				material_tags: [],
				fitting_type: "",
				fitting_qty: "",
				weight_kg: "",
				packing_length: "",
				packing_width: "",
				packing_height: ""
			},
			cost: "",
			srp: "",
			delivery_fee: "",
			stock_overwrite: "",
			customization_fee: "",
			stock_alarm: "",
			sales_price: "",
			product_image: null,
			created_at: '',
			updated_at: ''
		},
		loading: false,
		redirect: false,
		errors: null
	};
	
	componentDidMount() {
		// this.props.getSingleProduct(this.state.id)
		this.getSingleProduct(this.state.id);
	}

	// fetch the single item
	getSingleProduct = async id => {
		this.setState({ loading: true });

		let res = await axios.get(
			`http://inventory.test/api/admin/product/${id}`
		);

		this.setState({
			singleProduct: {
				sku: res.data.product.sku,
				product_name: res.data.product.product_name,
				brand: res.data.product.brand,
				product_category: res.data.product.product_category,
				description: res.data.product.description,
				supplier: res.data.product.supplier,
				barcode: res.data.product.barcode,
				dimension_length: res.data.product.attributes.dimension_length,
				dimension_width: res.data.product.attributes.dimension_width,
				dimension_height: res.data.product.attributes.dimension_height,
				color: res.data.product.attributes.color,
				material_tags: res.data.product.attributes.material_tags.split(","),
				fitting_type: res.data.product.attributes.fitting_type,
				fitting_qty: res.data.product.attributes.fitting_qty,
				weight_kg: res.data.product.attributes.weight_kg,
				packing_length: res.data.product.attributes.packing_length,
				packing_width: res.data.product.attributes.packing_width,
				packing_height: res.data.product.attributes.packing_height,
				cost: res.data.product.cost,
				srp: res.data.product.srp,
				delivery_fee: res.data.product.delivery_fee,
				stock_overwrite: res.data.product.stock_overwrite,
				customization_fee: res.data.product.customization_fee,
				stock_alarm: res.data.product.stock_alarm,
				sales_price: res.data.product.sales_price,
				product_image: res.data.product.product_image,
				created_at: res.data.product.created_at,
				updated_at: res.data.product.updated_at
			},
			loading: false
		});
	};

	render() {

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
			created_at,
			updated_at
		} = this.state.singleProduct;

		if(this.state.loading){
			// loader
			return <Spinner />
		}else{

			return (
				<Fragment>
					<h2> 					

					<Link 
						to='/product' 
						className='btn btn-sm btn-primary mr-1'
					>
					<i className="la la-angle-double-left"></i>
					</Link>
						Product Information: 
					</h2> 

					<div className="card card-body">
						<div className="row">
							<div className="col-md-4">
								<p>
									<strong>SKU:</strong> {sku}
								</p>
								<p>
									<strong>Product Name:</strong>{" "}
									{product_name}
								</p>
								<p>
									<strong>Brand:</strong> {brand}
								</p>
								<p>
									<strong>
										Product Category:
									</strong>{" "}
									{product_category}
								</p>
								<p>
									<strong>Description:</strong>{" "}
									{description}
								</p>
								<p>
									<strong>Supplier:</strong>{" "}
									{supplier}
								</p>
								<p>
									<strong>Barcode:</strong>{" "}
									{barcode}
								</p>

								<p>
									<strong>
										Dimension Length:
									</strong>{" "}
									{dimension_length}
								</p>
								<p>
									<strong>
										Dimension Width:
									</strong>{" "}
									{dimension_width}
								</p>
								<p>
									<strong>
										Dimension Height:
									</strong>{" "}
									{dimension_height}
								</p>
								<p>
									<strong>Color:</strong> {color}
								</p>
								<p>
									<strong>Material Tags:</strong>{" "}
									{material_tags == ''  ? 'No Tags.' : material_tags}
								</p>

								<p>
									<strong>Fitting Type:</strong>{" "}
									{fitting_type}
								</p>
							</div>

							<div className="col-md-4">
								<p>
									<strong>
										Fitting Quantity:
									</strong>{" "}
									{fitting_qty}
								</p>

								<p>
									<strong>Weight (Kg):</strong>{" "}
									{weight_kg}
								</p>
								<p>
									<strong>Packing Length:</strong>{" "}
									{packing_length}
								</p>
								<p>
									<strong>Packing Width:</strong>{" "}
									{packing_width}
								</p>
								<p>
									<strong>Packing Height:</strong>{" "}
									{packing_height}
								</p>
								<p>
									<strong>Cost:</strong> {cost}
								</p>
								<p>
									<strong>SRP:</strong> {srp}
								</p>
								<p>
									<strong>Delivery Fee:</strong>{" "}
									{delivery_fee}
								</p>
								<p>
									<strong>
										Stock Overwrite:
									</strong>{" "}
									{stock_overwrite}
								</p>
								<p>
									<strong>
										Customization Fee:
									</strong>{" "}
									{customization_fee}
								</p>
								<p>
									<strong>Stock Alarm:</strong>{" "}
									{stock_alarm}
								</p>
								<p>
									<strong>Sales Price:</strong>{" "}
									{sales_price}
								</p>
							</div>

							<div className="col-md-4">
								<h4>Product Image:</h4>
								<img 
									src={product_image} 
									className="img-fluid rounded mx-auto d-block w-70"
								/>
							</div>
						</div>
						
						<hr />
						<p><strong>Created at:</strong> {created_at}</p>
						<p><strong>Updated at:</strong> {updated_at}</p>
					</div>
				</Fragment>
			)
		}
	}
}

export default ProductShow;