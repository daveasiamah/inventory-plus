import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Select from "react-select";
import "../layouts/styles/iziToast.css";
import iziToast from "izitoast";
import axios from "axios";

class POCreate extends Component {
	state = {
		supplier_id: '',
		suppliers: [],
		supplier: [],
		// isSearchable: true,
		errors: null,
		redirect: false,
		loading: false
	};
	
	componentDidMount() {
		this.getSelectAll();
	}
	
	// get all the select options
	getSelectAll = async () => {
		let res = await axios.get(
			"http://inventory.test/api/admin/po/suppliers"
		);
		
		switch (res.data.status) {
			case 0:
				// nothing for now
				break;
			case 1:
				this.setState({
					suppliers: res.data.suppliers
				});
				break;
			default:
				break;
		}
	};

	// handle inputs
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	
	// handle the select options
	handleSelectSupplier = selectedOption => {
		console.log(selectedOption);
		// this.setState({
		// 	[selectedOption.name]: selectedOption.value
		// });
	};

	onFormSubmit = (e) => {
		//
	}

	render() {

		let supplierOption = this.state.suppliers.map(supplier => {
			return {
				value: supplier._id,
				label: supplier.name,
				name: "supplier_id"
			};
		});


		if (this.state.loading) {
			// loading
			return <Spinner />;
		} else if (this.state.redirect) {
			// redirect
			return <Redirect to="/po" />;
		} else {
			return (
				<div>
					<h2 className="mb-2">Create Purchase Order</h2>
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
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						)}
					</div>

					<form
						id="createPO"
						encType="multipart/form-data"
						onKeyPress={e => {
							if (e.key === "Enter") e.preventDefault();
						}}
						onSubmit={e => this.onFormSubmit(e)}
					>

						<div className="card card-body">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group row">
										<label className="col-md-3 label-control">
											Supplier
										</label>
										<div className="col-md-9">
											<Select
												placeholder="Select Supplier..."
												isSearchable={this.state.isSearchable}
												onChange={
													this.handleSelectSupplier
												}
												options={this.supplierOption}
											/>	
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default POCreate;
