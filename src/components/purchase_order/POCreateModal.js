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
		errors: "",
		supplier_id: [],
		name_suppliers: [],
		items: [],
		product: [],
		itemSelected: [],
		totalPrice: null,
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
		// console.log(selectOption);
		this.setState({
			itemSelected: {
				sku: selectOption.sku,
				name: selectOption.label,
				qty: selectOption.qty,
				srp: selectOption.srp
			}
		});
	};

	// handle inputs
	handleInputChange = e => {
		// set the changed state
		let multipliedPrice = e.target.value * this.state.itemSelected.srp;
		this.setState({
			itemSelected: { ...this.state.itemSelected, qty: e.target.value, srp: multipliedPrice}
		});
	};

	// add new product
	handleAddProduct = e => {
		let itemSelected = this.state.itemSelected;

		if (
			this.state.product.find(
				item => item.sku === this.state.itemSelected.sku
			)
		) {
			this.setState({errors: 'Item is added to the list'});
		}else{

			this.setState({
				product:[ ...this.state.product, itemSelected],
				errors: "",
			});	
		}

		// let newProduct = this.state.product.concat(itemSelected);

	};

	// remove the product
	handleRemoveProduct = index => {
		// this.state.product.splice(index, 1);
		let product = this.state.product;
		product.splice(index, 1);
		this.setState({ product: product });
	};

	// handle remove error
	handleRemoveError = () => {
		this.setState({errors: ''});
	}

	// handle Clear All
	handleClearAll = (e) => {
		e.preventDefault();

		this.setState({ 
			view_supplier: "",
			itemSelected: [],
			product: []
		})
	}

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
			itemSelected,
			errors,
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
				qty: 1,
				srp: item.srp
			};
		});

		const srpTotal = product.reduce((totalSrp, item) => totalSrp + parseInt(item.srp), 0);
		
		// console.log(srpTotal);

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
							<form
								onSubmit={e => this.onFormSubmit(e)}
								onKeyPress={e => {
									if (e.key === "Enter") e.preventDefault();
								}}
							>
								<section className="row mb-2">
									<div className="col-sm-4">
										{
											!view_supplier ? 
											(
												<div className="form-group row">
													<div className="col-md-12">
														<Select
															placeholder="Choose Supplier..."
															isSearchable={isSearchable}
															onChange={
																this.handleSelectInput
															}
															options={supplierOption}
														/>
													</div>
												</div>				
											) : ( null )
										}
									</div>
									<div className="col-md-4 offset-4">
										<button 
				                            className="btn btn-danger pull-right btn-sm"
											onClick={this.handleClearAll}
				                             ><i className="ft ft-clipboard"></i> Clear All
				                         </button>
									</div>
								</section>

								<section>
									<div className="row">
										<div className="col-md-12">
											{view_supplier ? (
												<Fragment>
													<div>
														{this.state.errors && (
															<div
																className="alert alert-danger alert-dismissible fade show"
																role="alert"
															>
																{errors}
																<button
																	type="button"
																	className="close"
																	data-dismiss="alert"
																	aria-label="Close"
																	onClick={this.handleRemoveError}
																>
																	<span aria-hidden="true">&times;</span>
																</button>
															</div>
														)}
													</div>
													<table className="table table-hover table-striped table-bordered">
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
															<tr>
																<td>
																	{
																		itemSelected.sku
																	}
																</td>
																<td width="40%">
																	<Select
																		placeholder="Choose Supplier..."
																		isSearchable={
																			isSearchable
																		}
																		onChange={
																			this
																				.handleSelectItem
																		}
																		options={
																			ItemOption
																		}
																	/>
																</td>
																<td width="15%">
																	<input
																		type="number"
																		name="qty"
																		min="1"
																		max="10000"
																		onChange={
																			this
																				.handleInputChange
																		}
																		value={
																			itemSelected.qty
																		}
																		className="form-control"
																	/>
																</td>
																<td>
																	{itemSelected.srp}
																</td>
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
												</Fragment>
											) : null}

											{
												product.length > 0 ? (
													<Fragment>
														<div className="card card-body border-info mt-1">
															<h4>
																<i className="ft-clipboard"></i> Preview
															</h4><hr/>

															<div className="col-md-12 mb-1">
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
																	{
																		this.state.product.map((item, index) => 
																			(
																				<tr key={index}>
																					<td>{item.sku}</td>
																					<td>{item.name}</td>
																					<td>{item.qty}</td>
																					<td>{item.srp}</td>
																					<td>
																						<a
																							className="btn btn-danger btn-sm text-white"
																							onClick={(e) =>
																								this.handleRemoveProduct(index)
																							}
																						>
																							<i className="la la-close"></i>
																						</a>
																					</td>
																				</tr>
																			)
																		)
																	}
																	<tr>
																		<td colSpan={2}></td>
																		<td><div align="right"><strong>Total</strong></div></td>
																		<td>Php {srpTotal}</td>
																		<td></td>
																	</tr>
																</tbody>
															</table>
														</div>
													</Fragment>
												): ( null )
											}
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
