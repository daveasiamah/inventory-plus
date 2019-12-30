import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import "../layouts/styles/iziToast.css";
import iziToast from "izitoast";
import axios from "axios";

class POCreateModal extends Component {
	state = {
		loading: false,
		errors: null,
		supplier_id: [],
		name_suppliers: [],
		items: [],
		product:[],
		itemSelected: [],
		view_supplier: "",
		isSearchable: true
	};

	static propTypes = {
		onHide: PropTypes.func.isRequired,
		getPurchaseOrders: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.getSelectSupplier();
	}

	// handle the select options
	handleSelectInput = selectedOption => {
		// console.log(selectedOption);
		this.setState({
			[selectedOption.name]: {
				label: selectedOption.label,
				value: selectedOption.value,
				name: selectedOption.name
			}
		});

		// fetch the data of selected supplier
		this.getDisplaySupplier(selectedOption.value);
		// fetch the item base on the supplier id
		this.getSupplierProduct(selectedOption.value);
	};

	handleSelectItem = selectOption => {
		console.log(selectOption)
		let newItem = this.state.itemSelected.concat(selectOption);
		this.setState({...this.state.itemSelected, itemSelected: newItem})
	}
	
	// handle inputs
	handleInputChange = (e, index) => {
		this.state.product[index] = e.target.name
		this.state.product[index] = e.target.value;

		// set the changed state
		this.setState({
			product: this.state.product
		});
	};

	// add new product
	handleAddProduct = () => {
		this.setState({
			product: [
				...this.state.product,
				""
			]
		});
	};

	// remove the product
	handleRemoveProduct = index => {
		// this.state.product.splice(index, 1);
		let product = this.state.product;
		product.splice(index, 1);
		this.setState({ product: product });
	};

	// handleonSubmit form
	handleOnSubmit = e => {
		e.preventDefault();
		console.log([this.state.view_supplier, this.state.product]);
	};

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

	// get the supplier data
	getDisplaySupplier = async id => {
		let res = await axios.get(
			`http://inventory.test/api/admin/po/selected/${id}`
		);
		switch (res.data.status) {
			case 0:
				break;
			case 1:
				this.setState({
					view_supplier: {
						name: res.data.supplier.name,
						address: res.data.supplier.address,
						business_name: res.data.supplier.business_name,
						landline: res.data.supplier.landline,
						fax: res.data.supplier.fax,
						email: res.data.supplier.email,
						mobile: res.data.supplier.mobile,
						contact_person: res.data.supplier.contact_person
					}
				});
				break;
			default:
				break;
		}
	};

	// get the products base on supplier id
	getSupplierProduct = async id => {
		let res = await axios.get(
			`http://inventory.test/api/admin/po/selected/item/${id}`
		);
		switch (res.data.status) {
			case 0:
				// do nothing for now
				break;
			case 1:
				console.log(res.data);
				this.setState({
					items: res.data.products
				});
				break;
			default:
				break;
		}
	};

	// post the data
	PurchaseOrderPost = async po => {
		this.setState({ loading: true });

		let res = await axios.post(`http://inventory.test/api/admin/po`, po);
		switch (res.data.status) {
			case 0:
				this.setState({ errors: res.data.errors });
				break;
			case 1:
				this.setState({
					loading: false,
					errors: null
				});
				// hide the modal
				this.props.onHide();
				// get the new brands
				this.props.getPurchaseOrders();
				this.toast(res.data.message);
				break;
			default:
				break;
		}

		this.setState({ loading: false });
	};

	// get all the select options
	getSelectSupplier = async () => {
		let res = await axios.get(
			"http://inventory.test/api/admin/po/supplier"
		);

		switch (res.data.status) {
			case 0:
				// nothing for now
				break;
			case 1:
				this.setState({
					name_suppliers: res.data.suppliers
				});
				break;
			default:
				break;
		}
	};

	render() {
		const {
			supplier_id,
			isSearchable,
			view_supplier,
			product,
			itemSelected
		} = this.state;

		let supplierOption = this.state.name_suppliers.map(supplier => {
			return {
				value: supplier._id,
				label: supplier.name,
				name: "supplier_id"
			};
		});

		let ItemOption = this.state.items.map(item => {
			return {
				value: item._id.$oid,
				label: item.product_name,
				name: "itemSelected",
				sku: item.sku,
				srp: item.srp
			};
		});

		return (
			<Modal
				dialogClassName="modal-container custom-dialog"
				show={this.props.show}
				onHide={this.props.onHide}
				animation={true}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Create New</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{this.state.loading ? (
						<div>
							<h3 align="center" className="my-5">
								Loading Please wait...
							</h3>
						</div>
					) : (
						<div>
							<div>
								{this.state.errors && (
									<div
										className="alert alert-danger alert-dismissible fade show"
										role="alert"
									>
										{this.state.errors.map((error, i) => (
											<li key={i}>{error}</li>
										))}
										<button
											type="button"
											className="close"
											data-dismiss="alert"
											aria-label="Close"
										>
											<span aria-hidden="true">
												&times;
											</span>
										</button>
									</div>
								)}
							</div>

							<form
								onSubmit={e => this.onFormSubmit(e)}
								onKeyPress={e => {
									if (e.key === "Enter") e.preventDefault();
								}}
							>
								<section className="row">
									<div className="col-sm-6">
										<div className="form-group row">
											<div className="col-md-6">
												<Select
													placeholder="Choose Supplier..."
													isSearchable={isSearchable}
													onChange={
														this.handleSelectInput
													}
													options={supplierOption}
												/>
											</div>

											<div className="col-md-12 mt-1">
												<div>
													<strong>
														{view_supplier.name ||
															""}
													</strong>
												</div>
												<div>
													{view_supplier.address ||
														""}
												</div>
												<div>
													{view_supplier.landline ||
														""}
												</div>
												<div>
													{view_supplier.mobile || ""}
												</div>
												<div>
													{view_supplier.fax || ""}
												</div>
												<div>
													{view_supplier.contact_person ||
														""}
												</div>
											</div>
										</div>
									</div>
								</section>

								<section>
									<div className="row">
										<div className="col-md-12">
											{view_supplier ? (
												<table className="table table-hover table-striped table-bordered table-sm">
													<thead>
														<tr>
															<th>SKU</th>
															<th>Item</th>
															<th>Qty</th>
															<th>Price</th>
															<th width="5%">
																Action
															</th>
														</tr>
													</thead>
													<tbody>
														{this.state.product.map(
															(item, index) => {
																return (
																	<tr key={index}>
																		<td>
																			{itemSelected.sku}
																		</td>
																		<td width="40%">
																			<Select
																				placeholder="Choose Supplier..."
																				isSearchable={isSearchable}
																				onChange={
																					this.handleSelectItem
																				}
																				options={ItemOption}
																			/>
																		</td>
																		<td width="15%">
																			<input
																				type="text"
																				name="qty"
																				onChange={e =>
																					this.handleInputChange(
																						e,
																						index
																					)
																				}
																				value={
																					product.qty
																				}
																				className="form-control p-1"
																				placeholder="Qty"
																			/>
																		</td>
																		<td>
																			{itemSelected.srp}
																		</td>
																		<td>
																			<a
																				className="btn btn-danger btn-sm text-white"
																				onClick={() =>
																					this.handleRemoveProduct(
																						index
																					)
																				}
																			>
																				<i className="la la-close"></i>
																			</a>
																		</td>
																	</tr>
																);
															}
														)}
														<tr>
															<td colSpan="4"></td>
															<td>
																<a
																	className="btn btn-info btn-sm text-white"
																	onClick={
																		this
																			.handleAddProduct
																	}
																>
																	<i className="la la-plus"></i>
																</a>
															</td>
														</tr>
													</tbody>
												</table>
											) : null}
										</div>
									</div>
								</section>

								<div className="row justify-content-end">
									<div className="mr-2 mt-1">
										{view_supplier ? (
											<div className="form-group">
												<Button
													type="button"
													className="btn btn-sm btn-danger"
													onClick={this.props.onHide}
												>
													Cancel
												</Button>{" "}
												<button
													type="submit"
													className="btn btn-sm btn-primary"
													onClick={
														this.handleOnSubmit
													}
												>
													Save
												</button>
											</div>
										) : null}
									</div>
								</div>
							</form>
						</div>
					)}
				</Modal.Body>
			</Modal>
		);
	}
}

export default POCreateModal;
