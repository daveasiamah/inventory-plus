import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class CategoryEditModal extends Component {
	state = {
		id: null,
		editCategory: [],
		loading: false,
		errors: null
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.singleCategory !== nextProps.singleCategory) {
			this.setState({ editCategory: nextProps.singleCategory });
		}

		if (this.props.id !== nextProps.id) {
			this.setState({ id: nextProps.id });
		}
	}

	// handle inputs
	handleInputChange = e => {
		this.setState({
			editCategory: {
				...this.state.editCategory,
				[e.target.name]: e.target.value
			}
		});
		// this.setState({[e.target.name]: e.target.value})
	};

	// on submit
	onFormSubmit = e => {
		e.preventDefault();
		let data = this.state.editCategory;
		let id = this.state.id;

		this.updateSingleCategory(data, id);
	};

	// update single supplier
	updateSingleCategory = async (category, id) => {
		this.setState({ loading: true });

		let updateData = {
			name: category.name,
			parent_category: category.parent_category,
			description: category.description,
		};

		let res = await axios.put(
			`http://inventory.test/api/admin/category/${id}`,
			updateData
		);
		switch (res.data.status) {
			case 0:
				this.setState({ errors: res.data.errors });
				break;
			case 1:
				this.setState({
					editBrand: [],
					loading: false,
					errors: null
				});
				// hide the modal
				this.props.onHide();
				// load the data
				this.props.getCategory();
				break;
			default:
				break;
		}

		this.setState({ loading: false });
	};

	render() {
		const { name, parent_category, description } = this.state.editCategory;

		return (
			<Modal
				className="modal-container"
				show={this.props.show}
				onHide={this.props.onHide}
				animation={true}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edi Category</Modal.Title>
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
													value={name}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Name:
											</label>
											<div className="col-md-8">
												<input
													type="text"
													id="parent_category"
													name="parent_category"
													className="form-control"
													placeholder="Parent Category"
													value={parent_category}
													onChange={
														this.handleInputChange
													}
												/>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-md-4 label-control">
												Description:
											</label>
											<div className="col-md-8">
												<textarea
													id="description"
													name="description"
													rows="3"
													className="form-control"
													placeholder="Description"
													value={description}
													onChange={
														this.handleInputChange
													}
												></textarea>
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

export default CategoryEditModal;
