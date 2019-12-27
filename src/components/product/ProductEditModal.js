import React, { Component, Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "../layouts/styles/Product.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import "../layouts/styles/iziToast.css";
import iziToast from "izitoast";

class ProductEditModal extends Component {
	state = {
		singleProduct: {
			sku: "",
			product_name: "",
			brand_id: [],
			category_id: [],
			supplier_id: [],
			description: "",
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
			customization_fee: "",
			stock_alarm: "",
			stocks: "",
			sales_price: "",
			product_image: null
		},
		selectNames: {
			supplier_id: "",
			brand_id: "",
			category_id: ""
		},
		product_image_display: null,
		product_image_new: null,
		isSearchable: true,
		name_brands: [],
		name_categories: [],
		name_suppliers: [],
		loading: false,
		errors: null,
	};
	
	componentDidMount() {
		// this.getSingleProduct(this.state.id);
		this.getSelectAll();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.singleProduct !== nextProps.singleProduct) {
			this.setState({ singleProduct: nextProps.singleProduct });
		}

		// if (this.props.id !== nextProps.id) {
		// 	this.setState({ id: nextProps.id });
		// }
	}

	// alert message
	toast = message => {
		iziToast.show({
			title: "Success",
			icon: "ico-success",
			message: message,
			iconColor: "rgb(0, 255, 184)",
			theme: "dark",
			progressBarColor: "rgb(0, 255, 184)",
			position: "bottomRight",
			transitionIn: "bounceInLeft",
			transitionOut: "fadeOut",
			timeout: 4000
		});
	};

	// update the data
	updateSingleProduct = async (singleProduct, id) => {
		const data = new FormData();
		data.append("sku", singleProduct.sku);
		data.append("product_name", singleProduct.product_name);
		data.append("description", singleProduct.description);
		data.append("brand_id", JSON.stringify(singleProduct.brand_id));
		data.append("category_id", JSON.stringify(singleProduct.category_id));
		data.append("supplier_id", JSON.stringify(singleProduct.supplier_id));
		data.append("barcode", singleProduct.barcode);
		data.append("dimension_length", singleProduct.dimension_length);
		data.append("dimension_width", singleProduct.dimension_width);
		data.append("dimension_height", singleProduct.dimension_height);
		data.append("color", singleProduct.color);
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
		data.append("customization_fee", singleProduct.customization_fee);
		data.append("stock_alarm", singleProduct.stock_alarm);
		data.append("stocks", singleProduct.stocks);
		data.append("sales_price", singleProduct.sales_price);
		data.append("product_image", singleProduct.product_image);
		// console.table(singleProduct);

		let res = await axios.post(
			`http://inventory.test/api/admin/product/update/${id}`,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
		);

		switch (res.data.status) {
			case 0:
				this.setState({ errors: res.data.errors });
				break;
			case 1:
				this.setState({ loading: false, redirect: true });
				// alert message
				this.toast(res.data.message);
				break;
			default:
				break;
		}

		this.setState({ loading: false });
	};

	// handle input change
	handleInputChange = e =>
		this.setState({
			singleProduct: {
				...this.state.singleProduct,
				[e.target.name]: e.target.value
			}
		});

	// handleinputfile
	handleFileChange = e => {
		this.setState({
			singleProduct: {
				...this.state.singleProduct,
				product_image: e.target.files[0]
			}
		});
		this.setState({
			product_image_display: URL.createObjectURL(e.target.files[0])
		});
	};

	// handle the select options
	handleSelectInput = selectedOption => {
		// console.log(selectedOption);
		this.setState({
			singleProduct: {
				...this.state.singleProduct,
				[selectedOption.name]: {
					label: selectedOption.label,
					value: selectedOption.value,
					name: selectedOption.name
				}
			}
		});
	};

	// get all the select options
	getSelectAll = async () => {
		let res = await axios.get(
			"http://inventory.test/api/admin/product/select/detail"
		);

		switch (res.data.status) {
			case 0:
				// nothing for now
				break;
			case 1:
				this.setState({
					name_brands: res.data.brands,
					name_categories: res.data.categories,
					name_suppliers: res.data.suppliers
				});
				break;
			default:
				break;
		}
	};

	// onsubmit
	onFormSubmit = e => {
		e.preventDefault();

		if (e.target.value !== "") {
			let singleProduct = this.state.singleProduct;
			let selectNames = this.state.selectNames;
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

		//destructuring
		const {
			singleProduct: {
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
		},
		isSearchable
		} = this.state;


		// const url = `http://inventory.test/`;

		let supplierOption = this.state.name_suppliers.map(supplier => {
			return {
				label: supplier.name,
				value: supplier._id,
				name: "supplier_id"
			};
		});

		let brandOption = this.state.name_brands.map(brand => {
			return {
				label: brand.name,
				value: brand._id,
				name: "brand_id"
			};
		});

		let categoryOption = this.state.name_categories.map(category => {
			return {
				label: category.name,
				value: category._id,
				name: "category_id"
			};
		});

		return (
		    <Modal 
		      	className="modal-container"
				show={this.props.show}
				onHide={this.props.onHide}
		      	size="lg"
		      	animation={true}
		      >
		        <Modal.Header closeButton>
		          <Modal.Title>Brand Information</Modal.Title>
		        </Modal.Header>
				
		        <Modal.Body>

				<Fragment>
					<form
						id="addProduct"
						encType="multipart/form-data"
						onKeyPress={e => {
							if (e.key === "Enter") e.preventDefault();
						}}
						onSubmit={e => this.onFormSubmit(e)}
						>

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

							<div className="col-sm-6">

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Brand
									</label>
									<div className="col-md-9">
										<Select
											value={brand_id}
											// defaultValue={brand_id}
											// defaultInputValue={brand_id}
											placeholder="Select Brand..."
											isSearchable={isSearchable}
											onChange={value =>
												this.handleSelectInput(
													value
												)
											}
											options={brandOption}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Category
									</label>
									<div className="col-md-9">
										<Select
											value={category_id}
											placeholder="Select Category..."
											isSearchable={isSearchable}
											onChange={
												this.handleSelectInput
											}
											options={categoryOption}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Suppliers
									</label>
									<div className="col-md-9">
										<Select
											value={supplier_id}
											placeholder="Select Supplier..."
											isSearchable={isSearchable}
											onChange={
												this.handleSelectInput
											}
											options={supplierOption}
										/>
									</div>
								</div>

							</div>
						</section>


						<h4 className="form-section">
							<i className="ft-clipboard"></i> Attributes
						</h4>

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

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Weight (Kg)
									</label>
									<div className="col-md-3">
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
										Color
									</label>
									<div className="col-md-9">
										<input
											id="color"
											name="color"
											className="form-control"
											onChange={
												this.handleInputChange
											}
											value={color}
										/>
									</div>
								</div>

							</div>

							<div className="col-sm-6">

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Material Tags
									</label>
									<div className="col-md-9">
										<div className="form-group" id="materialTags">
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
										<input
											id="fitting_type"
											name="fitting_type"
											className="form-control"
											onChange={
												this.handleInputChange
											}
											value={fitting_type}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Fitting Qty
									</label>
									<div className="col-md-9">
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
						</section>
						

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
										Stocks
									</label>
									<div className="col-md-6">
										<input
											type="text"
											id="stocks"
											name="stocks"
											className="form-control"
											placeholder="0"
											onChange={
												this.handleInputChange
											}
											value={stocks}
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
						

						<h4 className="form-section">
							<i className="ft-clipboard"></i> Image
						</h4>

						
						<section className="row">
							<div className="col-md-4">
								<img
									id="imagePreview"
									src={
										this.state.product_image_display
											? this.state
													.product_image_display
											: product_image
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
						
						<div className="row justify-content-end">
							<div className="mr-2">
								<div className="form-group">
									<Link
										to={"/product"}
										className="btn btn-danger btn-sm mr-1"
									>
										Cancel
									</Link>

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
				</Fragment>
				
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

export default ProductEditModal;