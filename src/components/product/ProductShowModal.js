import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class BrandShowModal extends Component {
	
	// 	state = {
	// 		singleProduct: {
	// 			sku: "",
	// 			product_name: "",
	// 			brand_id: [],
	// 			category_id: [],
	// 			supplier_id: [],
	// 			description: "",
	// 			barcode: "",
	// 			attributes: {
	// 				dimension_length: "",
	// 				dimension_width: "",
	// 				dimension_height: "",
	// 				color: "",
	// 				material_tags: [],
	// 				fitting_type: "",
	// 				fitting_qty: "",
	// 				weight_kg: "",
	// 				packing_length: "",
	// 				packing_width: "",
	// 				packing_height: ""
	// 			},
	// 			cost: "",
	// 			srp: "",
	// 			delivery_fee: "",
	// 			customization_fee: "",
	// 			stock_alarm: "",
	// 			stocks: "",
	// 			sales_price: "",
	// 			product_image: null
	// 		},
	// 		selectNames: {
	// 			supplier_id: "",
	// 			brand_id: "",
	// 			category_id: ""
	// 		}
	// 	};
	
	// componentWillReceiveProps(nextProps) {
	// 	if (this.props.singleProduct !== nextProps.singleProduct) {
	// 		this.setState({ singleProduct: nextProps.singleProduct });
	// 	}

	// 	if (this.props.id !== nextProps.id) {
	// 		this.setState({ id: nextProps.id });
	// 	}
	// }
	
	
	render() {

		//destructuring
		const {

				sku,
				product_name,
				brand_id,
				category_id,
				supplier_id,
				description,
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
				customization_fee,
				stock_alarm,
				stocks,
				sales_price,
				product_image,
				created_at,
				updated_at
		
		} = this.props.singleProduct;
		
		return (
	      <Modal 
	      	className="modal-container"
	      	show={this.props.show}
	      	size="lg"
	      	onHide={this.props.onHide}
	      	animation={true}
	      >
	        <Modal.Header closeButton>
	          <Modal.Title>Product Information</Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
				<div>
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
								<strong>Brand:</strong> {brand_id.label}
							</p>
							<p>
								<strong>Category:</strong>{" "}
								{category_id.label}
							</p>
							<p>
								<strong>Description:</strong> {description}
							</p>
							<p>
								<strong>Supplier:</strong> {supplier_id.label}
							</p>
							<p>
								<strong>Barcode:</strong> {barcode}
							</p>

							<p>
								<strong>Dimension Length:</strong>{" "}
								{dimension_length}
							</p>
							<p>
								<strong>Dimension Width:</strong>{" "}
								{dimension_width}
							</p>
							<p>
								<strong>Dimension Height:</strong>{" "}
								{dimension_height}
							</p>
							<p>
								<strong>Color:</strong> {color}
							</p>
							<p>
								<strong>Material Tags:</strong>{" "}
								{
									material_tags ? (
										material_tags.map(
											(tag, index) => <span>{tag}, </span>)
									) : (
										<span>No Tags</span>
									)
								}	
							</p>
						</div>

						<div className="col-md-4">
							<p>
								<strong>Fitting Type:</strong>{" "}
								{fitting_type}
							</p>

							<p>
								<strong>Fitting Quantity:</strong>{" "}
								{fitting_qty}
							</p>

							<p>
								<strong>Weight (Kg):</strong> {weight_kg}
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
								<strong>Customization Fee:</strong>{" "}
								{customization_fee}
							</p>
							<p>
								<strong>Stock Alarm:</strong> {stock_alarm}
							</p>
							<p>
								<strong>Stocks:</strong> {stocks}
							</p>
							<p>
								<strong>Sales Price:</strong> {sales_price}
							</p>
						</div>

						<div className="col-md-4">
							<h4>Product Image:</h4>
							<img
								src={product_image}
								className="img-fluid rounded mx-auto d-block w-100"
							/>
						</div>
					</div>

					<hr />
					<p>
						<strong>Created at:</strong> {created_at}
					</p>
					<p>
						<strong>Updated at:</strong> {updated_at}
					</p>
				</div>
	        </Modal.Body>
	        <Modal.Footer>
	              <Button 
	              	variant="danger btn-sm" 
	              	onClick={this.props.onHide}
	              >
		          	  Close
		          </Button>
	        </Modal.Footer>
	      </Modal>
		)
	}
}

export default BrandShowModal;