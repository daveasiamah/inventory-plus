import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class ProductEdit extends Component {
	state = {
		id: this.props.match.params.id,
		singleProduct: [],
		product_image_display: '',
		loading: false,
		redirect: false
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
				sku: res.data.sku,
				product_name: res.data.product_name,
				brand: res.data.brand,
				product_category: res.data.product_category,
				description: res.data.description,
				supplier: res.data.supplier,
				barcode: res.data.barcode,
				dimension_length: res.data.dimension_length,
				dimension_width: res.data.dimension_width,
				dimension_height: res.data.dimension_height,
				color: res.data.color,
				specs_category: res.data.specs_category,
				material_tags: res.data.material_tags,
				fitting_type: res.data.fitting_type,
				fitting_qty: res.data.fitting_qty,
				weight_kg: res.data.weight_kg,
				packing_length: res.data.packing_length,
				packing_width: res.data.packing_width,
				packing_height: res.data.packing_height,
				cost: res.data.cost,
				srp: res.data.srp,
				delivery_fee: res.data.delivery_fee,
				stock_overwrite: res.data.stock_overwrite,
				customization_fee: res.data.customization_fee,
				stock_alarm: res.data.stock_alarm,
				sales_price: res.data.sales_price,
				product_image: res.data.product_image
			},
			loading: false
		});
	};

	// update the data
	updateSingleProduct = async (singleProduct, id) => {
		const data = new FormData();
		data.append("sku", this.state.singleProduct);
		data.append("product_name", singleProduct.product_name);
		data.append("brand", singleProduct.brand);
		data.append("product_category", singleProduct.product_category);
		data.append("description", singleProduct.description);
		data.append("supplier", singleProduct.supplier);
		data.append("barcode", singleProduct.barcode);
		data.append("dimension_length", singleProduct.dimension_length);
		data.append("dimension_width", singleProduct.dimension_width);
		data.append("dimension_height", singleProduct.dimension_height);
		data.append("color", singleProduct.color);
		data.append("specs_category", singleProduct.specs_category);
		data.append("material_tags", singleProduct.material_tags);
		data.append("fitting_type", singleProduct.fitting_type);
		data.append("fitting_qty", singleProduct.fitting_qty);
		data.append("weight_kg", singleProduct.weight_kg);
		data.append("packing_length", singleProduct.packing_length);
		data.append("packing_width", singleProduct.packing_width);
		data.append("packing_height", singleProduct.packing_height);
		data.append("cost", singleProduct.cost);
		data.append("srp", singleProduct.srp);
		data.append("delivery_fee", singleProduct.delivery_fee);
		data.append("stock_overwrite", singleProduct.stock_overwrite);
		data.append("customization_fee", singleProduct.customization_fee);
		data.append("stock_alarm", singleProduct.stock_alarm);
		data.append("sales_price", singleProduct.sales_price);
		data.append("product_image", singleProduct.product_image);
		
		let config = { headers: { "Content-Type": "multipart/form-data"} };
		let res = await axios.put(
			`http://inventory.test/api/admin/product/${id}`,
			singleProduct,
			config
		);

		// this.setState({ singleProduct: [], loading: false , redirect: true });
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to="/product" />;
		}
	};

	handleInputChange = e =>
		this.setState({
			singleProduct: {
				...this.state.singleProduct,
				[e.target.name]: e.target.value
			}
		});
	handleFileChange = e =>{
		this.setState({singleProduct: {...this.state.singleProduct, product_image: URL.createObjectURL(e.target.files[0])}});
		// this.setState({product_image_display: URL.createObjectURL(e.target.files[0])});
	}
		

	onFormSubmit = e => {
		e.preventDefault();

		if (e.target.value !== "") {
			let singleProduct = this.state.singleProduct;
			let id = this.state.id;
			this.updateSingleProduct(singleProduct, id);
		}
	};

	// Adding material tags
	addTag = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			const value = e.target.value;

			// check the duplicate value in array
			if (
				this.state.singleProduct.material_tags.find(
					tag => tag.toLowerCase() === value.toLowerCase()
				)
			) {
				return;
			}
			let newTag = this.state.singleProduct.material_tags.concat(value);
			this.setState({
				singleProduct: {
					...this.state.singleProduct,
					["material_tags"]: newTag
				}
			});
			e.target.value = "";
		}
	};

	removeTag = id => {
		// console.log(id)
		const tags = this.state.singleProduct.material_tags;
		tags.splice(id, 1);
		this.setState({ material_tags: tags });
	};

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
			product_image_display
		} = this.state.singleProduct;

		const url = `http://inventory.test/`;

		if (this.state.loading) {
			// loading spinner
			return <Spinner />;
		} else if (this.state.redirect) {
			// redirect to product page
			return <Redirect to="/product" />;
		} else {
			return (
				<div>
					<div className="mb-2">
						<h2>Edit Product</h2>
					</div>
					<form
						id="addProduct"
						encType="multipart/form-data"
						onKeyPress={e => {
							if (e.key === "Enter") e.preventDefault();
						}}
						onSubmit={e => this.onFormSubmit(e)}
					>
						<h4 className="form-section">
							<i className="ft-clipboard"></i> Details
						</h4>

						<div className="card card-body">
							<section className="row">
								<div className="col-sm-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											SKU
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="sku"
												name="sku"
												className="form-control"
												placeholder="SKU"
												onChange={
													this.handleInputChange
												}
												value={sku}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Product Name
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="product_name"
												name="product_name"
												className="form-control"
												placeholder="Product Name"
												onChange={
													this.handleInputChange
												}
												value={product_name}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Brand
										</label>
										<div className="col-md-9">
											<select
												id="brand"
												name="brand"
												className="form-control"
												onChange={
													this.handleInputChange
												}
												value={brand}
											>
												<option value="">
													Choose Brand
												</option>
												<option value="Brand 1">
													Brand 1
												</option>
												<option value="Brand 2">
													Brand 2
												</option>
												<option value="Brand 3">
													Brand 3
												</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Category
										</label>
										<div className="col-md-9">
											<select
												id="product_category"
												name="product_category"
												className="form-control"
												onChange={
													this.handleInputChange
												}
												vaue={product_category}
											>
												<option value="">
													Choose Category
												</option>
												<option value="Category 1">
													Category 1
												</option>
												<option value="Category 2">
													Category 2
												</option>
												<option value="Category 3">
													Category 3
												</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Description
										</label>
										<div className="col-md-9">
											<textarea
												id="description"
												name="description"
												rows="2"
												className="form-control"
												placeholder="Description"
												onChange={
													this.handleInputChange
												}
												value={description}
											></textarea>
										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											Suppliers
										</label>
										<div className="col-md-9">
											<select
												id="supplier"
												name="supplier"
												className="form-control"
												onChange={
													this.handleInputChange
												}
												value={supplier}
											>
												<option value="">
													Choose Supplier
												</option>
												<option value="Supplier 1">
													Supplier 1
												</option>
												<option value="Supplier 2">
													Supplier 2
												</option>
												<option value="Supplier 3">
													Supplier 3
												</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Barcode
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="barcode"
												name="barcode"
												className="form-control"
												placeholder="Barcode"
												onChange={
													this.handleInputChange
												}
												value={barcode}
											/>
										</div>
									</div>
								</div>
							</section>
						</div>

						<h4 className="form-section">
							<i className="ft-clipboard"></i> Specification
						</h4>

						<div className="card card-body">
							<section className="row">
								<div className="col-sm-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											Dimension
										</label>
										<div className="col-md-3">
											<input
												type="text"
												id="dimension_length"
												name="dimension_length"
												className="form-control"
												placeholder="L"
												onChange={
													this.handleInputChange
												}
												value={dimension_length}
											/>
										</div>
										<div className="col-md-3">
											<input
												type="text"
												id="dimension_width"
												name="dimension_width"
												className="form-control"
												placeholder="W"
												onChange={
													this.handleInputChange
												}
												value={dimension_width}
											/>
										</div>
										<div className="col-md-3">
											<input
												type="text"
												id="dimension_height"
												name="dimension_height"
												className="form-control"
												placeholder="H"
												onChange={
													this.handleInputChange
												}
												value={dimension_height}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Color
										</label>
										<div className="col-md-9">
											<select
												id="color"
												name="color"
												className="form-control"
												onChange={
													this.handleInputChange
												}
												value={color}
											>
												<option value="">
													Choose Color
												</option>
												<option value="Color 1">
													Color 1
												</option>
												<option value="Color 2">
													Color 2
												</option>
												<option value="Color 3">
													Color 3
												</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Category
										</label>
										<div className="col-md-9">
											<select
												id="specs_category"
												name="specs_category"
												className="form-control"
												onChange={
													this.handleInputChange
												}
												value={specs_category}
											>
												<option value="">
													Choose Category
												</option>
												<option value="Category 1">
													Category 1
												</option>
												<option value="Category 2">
													Category 2
												</option>
												<option value="Category 3">
													Category 3
												</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Material Tags
										</label>
										<div className="col-md-9">
											<div className="form-group">
												<ul className="containerUl float">
													{material_tags ? (
														material_tags.map(
															(tag, index) => (
																<li
																	className="item float-item"
																	key={index}
																>
																	<span className="badge badge-primary">
																		{tag}
																		<button
																			type="button"
																			className="btn btn-primary btn-sm"
																			onClick={e =>
																				this.removeTag(
																					index
																				)
																			}
																		>
																			<i className="icon la la-times"></i>
																		</button>
																	</span>
																</li>
															)
														)
													) : (
														<span>No Tags</span>
													)}
												</ul>
												<input
													type="text"
													className="form-control"
													placeholder="Enter Tags"
													name="material_tags"
													onKeyUp={e =>
														this.addTag(e)
													}
													onKeyPress={e => {
														if (e.key === "Enter")
															e.preventDefault();
													}}
												/>
											</div>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Fitting Type
										</label>
										<div className="col-md-9">
											<select
												id="fitting_type"
												name="fitting_type"
												className="form-control"
												onChange={
													this.handleInputChange
												}
												value={fitting_type}
											>
												<option value="">
													Choose Fitting
												</option>
												<option value="Fitting 1">
													Fitting 1
												</option>
												<option value="Fitting 2">
													Fitting 2
												</option>
												<option value="Fitting 3">
													Fitting 3
												</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Fitting Qty
										</label>
										<div className="col-md-6">
											<input
												type="text"
												id="fitting_qty"
												name="fitting_qty"
												className="form-control"
												placeholder="0"
												onChange={
													this.handleInputChange
												}
												value={fitting_qty}
											/>
										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											Weight (Kg)
										</label>
										<div className="col-md-6">
											<input
												type="text"
												id="weight_kg"
												name="weight_kg"
												className="form-control"
												placeholder="0"
												onChange={
													this.handleInputChange
												}
												value={weight_kg}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Packing
										</label>
										<div className="col-md-3">
											<input
												type="text"
												id="packing_length"
												name="packing_length"
												className="form-control"
												placeholder="L"
												onChange={
													this.handleInputChange
												}
												value={packing_length}
											/>
										</div>
										<div className="col-md-3">
											<input
												type="text"
												id="packing_width"
												name="packing_width"
												className="form-control"
												placeholder="W"
												onChange={
													this.handleInputChange
												}
												value={packing_width}
											/>
										</div>
										<div className="col-md-3">
											<input
												type="text"
												id="packing_height"
												name="packing_height"
												className="form-control"
												placeholder="H"
												onChange={
													this.handleInputChange
												}
												value={packing_height}
											/>
										</div>
									</div>
								</div>
							</section>
						</div>

						<h4 className="form-section">
							<i className="ft-clipboard"></i> Pricing & Stock
						</h4>

						<div className="card card-body">
							<section className="row">
								<div className="col-sm-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											Cost
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="cost"
												name="cost"
												className="form-control"
												placeholder="Cost"
												onChange={
													this.handleInputChange
												}
												value={cost}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											SRP
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="srp"
												name="srp"
												className="form-control"
												placeholder="SRP"
												onChange={
													this.handleInputChange
												}
												value={srp}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Delivery Fee
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="delivery_fee"
												name="delivery_fee"
												className="form-control"
												placeholder="Delivery Fee"
												onChange={
													this.handleInputChange
												}
												value={delivery_fee}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Customization Fee
										</label>
										<div className="col-md-9">
											<input
												type="text"
												id="customization_fee"
												name="customization_fee"
												className="form-control"
												placeholder="Customization Fee"
												onChange={
													this.handleInputChange
												}
												value={customization_fee}
											/>
										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											Stock (overwrite)
										</label>
										<div className="col-md-6">
											<input
												type="text"
												id="stock_overwrite"
												name="stock_overwrite"
												className="form-control"
												placeholder="Stock (overwrite)"
												onChange={
													this.handleInputChange
												}
												value={stock_overwrite}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Stock Alarm
										</label>
										<div className="col-md-6">
											<input
												type="text"
												id="stock_alarm"
												name="stock_alarm"
												className="form-control"
												placeholder="Stock Alarm"
												onChange={
													this.handleInputChange
												}
												value={stock_alarm}
											/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 label-control">
											Sales Price
										</label>
										<div className="col-md-6">
											<input
												type="text"
												id="sales_price"
												name="sales_price"
												className="form-control"
												placeholder="Sales Price"
												onChange={
													this.handleInputChange
												}
												value={sales_price}
											/>
										</div>
									</div>
								</div>
							</section>
						</div>

						<h4 className="form-section">
							<i className="ft-clipboard"></i> Image
						</h4>
						<div className="card card-body">
							<section className="row">
								<div className="col-md-4">
									<img
										id="imagePreview"
										src={
												product_image
												? product_image_display
												: '/square.jpg'
										}
										alt="image"
										className="img-fluid"
									/>
								</div>
								<div id="drop-area" className="col-md-8">
									<div align="center" className="m-5 py-5">
										<input
											id="product_image"
											type="file"
											name="product_image"
											onChange={this.handleFileChange}
										/>
									</div>
								</div>
							</section>
						</div>

						<div className="row justify-content-end">
							<div className="mr-2">
								<div className="form-group">
									<span className="btn btn-danger btn-sm mr-1">
										Cancel
									</span>
									<button
										type="submit"
										className="btn btn-primary btn-sm"
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default ProductEdit;
