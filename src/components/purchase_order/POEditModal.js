import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import axios from "axios";

class POEditModal extends Component {
	state = {
		id: null,
		editPO: [],
		loading: false,
		errors: null
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.singlePO !== nextProps.singlePO) {
			this.setState({ editPO: nextProps.singlePO });
		}

		if (this.props.id !== nextProps.id) {
			this.setState({ id: nextProps.id });
		}
	}

	// handle inputs
	handleInputChange = e => {
		this.setState({
			editPO: {
				...this.state.editPO,
				[e.target.name]: e.target.value
			}
		});
		// this.setState({[e.target.name]: e.target.value})
	};

	// on submit
	onFormSubmit = e => {
		e.preventDefault();
		let data = this.state.editPO;
		let id = this.state.id;

		this.updateSinglePO(data, id);
	};

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

	// update single supplier
	updateSinglePO = async (po, id) => {
		this.setState({ loading: true });

		let updateData = {
			// name: po.name,
			// description: po.description
		};

		let res = await axios.put(
			`http://inventory.test/api/admin/po/${id}`,
			updateData
		);
		switch (res.data.status) {
			case 0:
				this.setState({ errors: res.data.errors });
				break;
			case 1:
				this.setState({
					editPO: [],
					loading: false,
					errors: null
				});
				// hide the modal
				this.props.onHide();
				// load the data
				this.props.getPurchaseOrders();
				// alert message
				this.toast(res.data.message);
				break;
			default:
				break;
		}

		this.setState({ loading: false });
	};

	render() {
		// const { name, description } = this.state.editPO;

		return (
			<Modal
				className="modal-container"
				show={this.props.show}
				onHide={this.props.onHide}
				animation={true}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edi Purchase Order</Modal.Title>
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
								onKeyPress={e => {
									if (e.key === "Enter") e.preventDefault();
								}}
								onSubmit={e => this.onFormSubmit(e)}
							>
								<section className="row">
									<div className="col-sm-12">
										<div className="form-group row">

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

export default POEditModal;
