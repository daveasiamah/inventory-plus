import React, { Component } from "react";
import axios from "axios";

class ProductShowModal extends Component {
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
			created_at,
			updated_at
		} = this.props.singleProduct;

		if (this.props.singleProduct != null) {
			return (
				<div
					id="show-modal"
					className="modal fade"
					tabIndex="-1"
					role="dialog"
				>
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									<strong>Complete Information</strong>
								</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="container">
									<div className="row">
										<div className="col-md-6">
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
												<strong>Specs Category:</strong>{" "}
												{specs_category}
											</p>
											<p>
												<strong>Material Tags:</strong>{" "}
												{material_tags}
											</p>
										</div>

										<div className="col-md-6">
											<p>
												<strong>Fitting Type:</strong>{" "}
												{fitting_type}
											</p>
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

										<div className="col-md-12">
											<img src={product_image} 
												className="img-fluid rounded mx-auto d-block w-50"
											/>
										</div>

									</div>
										<hr />
										<p><strong>Created at:</strong> {created_at}</p>
										<p><strong>Updated at:</strong> {updated_at}</p>
								</div>
							</div>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			);
		} else {
			return (
				<div
					id="show-modal"
					className="modal fade"
					tabIndex="-1"
					role="dialog"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">
									<strong>Complete Information</strong>
								</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="container"></div>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default ProductShowModal;
