import React, { Component, Fragments } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';

class CustomerEdit extends Component {
	state = {
		id: null,
		editCustomer: [],
		loading: false,
		errors: null
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.singleCustomer !== nextProps.singleCustomer) {
			this.setState({ editCustomer: nextProps.singleCustomer });
		}

		if (this.props.id !== nextProps.id) {
			this.setState({ id: nextProps.id });
		}
	}

	// alert message
    toast = (message) => {
        iziToast.show({
            title: 'Success',
            icon: 'ico-success',
            message: message,
            iconColor: 'rgb(0, 255, 184)',
            theme: 'dark',
            progressBarColor: 'rgb(0, 255, 184)',
            position: 'bottomRight',
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOut',
            timeout: 4000,
        });
    }

	// handle inputs
	handleInputChange = e => {
		this.setState({
			editCustomer: {
				...this.state.editCustomer,
				[e.target.name]: e.target.value
			}
		});
	};

	// on submit
	onFormSubmit = e => {
		e.preventDefault();
		let customer = this.state.editCustomer;
		let id = this.state.id;

		this.updateEditCustomer(customer, id);
	};

	// update single customer
	updateEditCustomer = async (customer, id) => {
		this.setState({ loading: true });

		let updateData = {
			name: customer.name,
			business_name: customer.business_name,
			address: customer.address,
			landline: customer.landline,
			fax: customer.fax,
			email: customer.email,
			mobile: customer.mobile,
			contact_person: customer.contact_person
		};

		let res = await axios.put(
			`http://inventory.test/api/admin/customer/${id}`,
			updateData
		);
		switch (res.data.status) {
			case 0:
				this.setState({ errors: res.data.errors });
				break;
			case 1:
				this.setState({
					editCustomer: [],
					loading: false,
					errors: null
				});
				// hide the modal
				this.props.onHide();
				// load the data
				this.props.getCustomers();
				// alert message
				this.toast(res.data.message);
				break;
			default:
				break;
		}

		this.setState({ loading: false });
	};

	render() {

		const {
			name,
			business_name,
			address,
			landline,
			fax,
			email,
			mobile,
			contact_person,
			archives
		} = this.state.editCustomer;

		return (
			<Modal
				className="modal-container"
				show={this.props.show}
				onHide={this.props.onHide}
				animation={true}
				size="md"
			>
				<Modal.Header closeButton>
					<Modal.Title>Edi Customer</Modal.Title>
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
											class="close"
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

							<form onSubmit={e => this.onFormSubmit(e)}>
								<section className="row">
									<div className="col-sm-12">
										<div className="form-group row">
											<label className="col-md-4 label-control">
												Name:
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="name"
													name="name"
													className="form-control"
													placeholder="Name"
													value={name || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Business Name
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="business_name"
													name="business_name"
													className="form-control"
													placeholder="Business Name"
													value={business_name || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Address
											</label>
											<div className="col-md-8">
												<textarea
													id="address"
													name="address"
													rows="2"
													className="form-control"
													placeholder="Address"
													value={address || ""}
													onChange={
														this.handleInputChange
													}
												></textarea>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Landline
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="landline"
													name="landline"
													className="form-control"
													placeholder="Landline"
													value={landline || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Fax
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="fax"
													name="fax"
													className="form-control"
													placeholder="Fax"
													value={fax || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Email
											</label>
											<div className="col-md-8">
												<input
													type="email"
													id="email"
													name="email"
													className="form-control"
													placeholder="Email"
													value={email || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Mobile
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="mobile"
													name="mobile"
													placeholder="Mobile"
													className="form-control"
													value={mobile || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Contact Person
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="contact_person"
													name="contact_person"
													placeholder="Contact Person"
													className="form-control"
													value={contact_person || ""}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>
									</div>
								</section>

								<div className="row justify-content-end">
									<div className="mr-2">
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
												className="btn btn-primary btn-sm"
											>
												Save
											</button>
										</div>
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

export default CustomerEdit;
