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
		product: {
			po_no: "",
			items: [],
			discount: 5,
			tax: 10,
			other: 10,
			totalPrice: ""
		},
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
		// console.log(selectOption);
		this.setState({
			itemSelected: {
				sku: selectOption.sku,
				name: selectOption.label,
				qty: selectOption.qty,
				srp: selectOption.srp,
			}
		});
	};

	// handle qty
	handleInputChange = e => {

		let multipliedPrice = e.target.value * this.state.itemSelected.srp;

		this.setState({
			itemSelected: { ...this.state.itemSelected, qty: e.target.value, totalPrice: multipliedPrice}
		});

	};

	// handle key press
	handleKeyPress = (e) => {
		if(e.charCode < 48 || e.charCode > 57){
			e.preventDefault();
		}
	}

	// add new product
	handleAddProduct = e => {
		const itemSelected = this.state.itemSelected;	
		const product = this.state.product;
		if (
			this.state.product.items.find(
				item => item.sku === this.state.itemSelected.sku
			)
		) {
			this.setState({errors: 'Item is already added to the list'});

		}else if(itemSelected.qty == "" || itemSelected.qty == "0"){

			this.setState({errors: 'Quantity field is required and cannot be 0 value'});

		}else{
		
			this.setState({
				product: { ...this.state.product, items: [ ...this.state.product.items, itemSelected] },
				errors: "",
			});	
		}
	
	};
 
	// remove the product
	handleRemoveProduct = index => {
		// this.state.product.splice(index, 1);
		let items = this.state.product.items;
		items.splice(index, 1);
		this.setState({ product: { items: items} });
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
			product: {
				po_no: "",
				items: [],
				totalPrice: ""
			},
			itemSelected: [],
			errors: ""
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
					},
					product: {
						...this.state.product,
						supplier: {
							...this.state.product.supplier,
							name: res.data.supplier.name,
							address: res.data.supplier.address,
							business_name: res.data.supplier.business_name,
							landline: res.data.supplier.landline,
							fax: res.data.supplier.fax,
							email: res.data.supplier.email,
							mobile: res.data.supplier.mobile,
							contact_person: res.data.supplier.contact_person
						}
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
				srp: item.srp,
				totalPrice: ""
			};
		});
		
		// set the subTotal
		const subTotal = this.state.product.items.reduce((sub, item) => 
			sub + parseInt(item.totalPrice ? item.totalPrice : item.srp)
		,0);

		// set the totalPrice
		const total = this.state.product.items.reduce((total, item) => 
			total + parseInt(item.totalPrice ? item.totalPrice : item.srp) + product.tax + product.other
		,0);
		
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
								</section>

								<section>
									<div className="row">
										{view_supplier ? (
											<Fragment>
												<div className="col-sm-10">
														<Fragment>
															<div>
																{this.state.errors && (
																	<div
																		className="alert alert-danger alert-dismissible fade show"
																		role="alert"
																	>
																		<strong>Error: </strong> {errors}
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
																		<th>Supplier</th>
																		<th>Item</th>
																		<th>Qty</th>
																		<th width="5%">
																			Action
																		</th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td>{view_supplier.name}</td>
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
																		<td width="20%">
																			<input
																				type="number"
																				name="qty"
																				min={1}
																				onKeyPress={this.handleKeyPress}
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
																		<td width="5%">
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
												</div>

												<div className="col-sm-2">
													<button 
							                            className="btn btn-danger pull-right"
														onClick={this.handleClearAll}
							                             ><i className="ft ft-trash"></i> Reset All
							                         </button>
												</div>
											</Fragment>
											) : ( null )
										}


										<div className="col-md-12">
											{
												product.items.length > 0 ? (
													<Fragment>
														<div className="card card-body border-info mt-1">
															<h4>
																<i className="ft-clipboard"></i> Preview
															</h4><hr/>

															<div className="col-md-12 mb-1">
																{
																	product.supplier ? 
																	(
																		<div>
																			<div>{product.supplier.name}</div>
																			<div>{product.supplier.address}</div>
																			<div>{product.supplier.landline}</div>
																			<div>{product.supplier.fax}</div>
																			<div>{product.supplier.email}</div>
																			<div>{product.supplier.contact_person}</div>
																		</div>
																	) : (  null )	
																	
																}
															</div>

															<table className="table table-hover table-striped table-bordered table-sm">
																<thead>
																	<tr>
																		<th>SKU</th>
																		<th>Description</th>
																		<th>Qty</th>
																		<th>Unit Price</th>
																		<th>Total</th>
																		<th width="5%">
																			Action
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{
																		this.state.product.items.map((item, index) => 
																			(
																				<tr key={index}>
																					<td width="10%">{item.sku}</td>
																					<td>{item.name}</td>
																					<td width="5%">{item.qty}</td>
																					<td>{item.srp}</td>
																					<td>{item.totalPrice ? item.totalPrice : item.srp}</td>
																					<td width="5%">
																						<a
																							className="btn btn-danger btn-sm text-white"
																							onClick={(e) =>
																								this.handleRemoveProduct(index)
																							}
																						>
																							<i className="la la-trash"></i>
																						</a>
																					</td>
																				</tr>
																			)
																		)
																	}
																	<tr>
																		<td colSpan={3}></td>
																		<td><div align="right"><strong>Sub Total</strong></div></td>
																		<td>
																			Php {subTotal}
																			<input className="hidden" type="number" value={subTotal}/>
																		</td>
																		<td></td>
																	</tr>
																	<tr>
																		<td colSpan={3}></td>
																		<td><div align="right"><strong>Discount</strong></div></td>
																		<td>
																			-{product.discount} %
																			<input className="hidden" type="number" value={product.discount}/>
																		</td>
																		<td></td>
																	</tr>
																	<tr>
																		<td colSpan={3}></td>
																		<td><div align="right"><strong>Tax</strong></div></td>
																		<td>
																			{product.tax}
																			<input className="hidden" type="number" value={product.tax}/>
																		</td>
																		<td></td>
																	</tr>
																	<tr>
																		<td colSpan={3}></td>
																		<td><div align="right"><strong>Other</strong></div></td>
																		<td>
																			{product.other}
																			<input className="hidden" type="number" value={product.other}/>
																		</td>
																		<td></td>
																	</tr>
																	<tr>
																		<td colSpan={3}></td>
																		<td><div align="right"><strong>Total</strong></div></td>
																		<td>
																			Php {total}
																			<input className="hidden" name="total" type="number" value={total}/>
																		</td>
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
