import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import SupplierShowModal from "./SupplierShowModal";
import SupplierEditModal from './SupplierEditModal';
import SupplierDeleteModal from "./SupplierDeleteModal";

class SupplierTable extends Component {
	state = {
		id: 0,
		singleSupplier: [],
		isOpen: false,
		showModal: false,
		editModal: false,
		deleteModal: false
	};

	static propTypes = {
		suppliers: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired
	};

	getSingleSupplier = async id => {
		let res = await axios.get(
			`http://inventory.test/api/admin/supplier/${id}`
		);

		this.setState({ singleSupplier: res.data.supplier });
		// console.log(res.data.supplier)
	};

	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	// show modal
	modalOpen = (status, id) => {
		switch (status) {
			case "show":
				this.setState({ showModal: true });
				this.getSingleSupplier(id);
				break;
			case "edit":
				this.setState({ editModal: true, id: id });
				this.getSingleSupplier(id);
				break;
			case "delete":
				this.setState({ deleteModal: true, id: id });
			default:
				// do nothing
				break;
		}
	};

	// hide modal
	modalClose = status => {
		switch (status) {
			case "show":
				this.setState({ showModal: false });
				break;
			case "edit":
				this.setState({ editModal: false });
			case "delete":
				this.setState({ deleteModal: false });
			default:
				break;
		}
	};

	render() {
		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Landline</th>
								<th>Mobile</th>
								<th>Fax</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.suppliers.map(supplier => (
								<tr key={supplier._id}>
									<td>{supplier.name}</td>
									<td>{supplier.email}</td>
									<td>{supplier.landline}</td>
									<td>{supplier.mobile}</td>
									<td>{supplier.fax}</td>
									<td>
										<div className="btn-group">
											<button
												className="btn btn-sm btn-info btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"show",
													supplier._id
												)}
											>
												<i className="ft ft-eye"></i>
											</button>
											<button
												className="btn btn-sm btn-warning btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"edit",
													supplier._id
												)}
											>
												<i className="ft ft-edit"></i>
											</button>
											<Button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"delete",
													supplier._id
												)}
											>
												<i className="ft ft-x"></i>
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div
					id="delete-modal"
					className="modal fade"
					tabIndex="-1"
					role="dialog"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title"></h5>
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
								<h4 align="center">
									Do you want to delete this item?
								</h4>
								<div align="center" className="mt-3">
									<button
										type="button"
										className="btn btn-info"
										data-dismiss="modal"
										onClick={this.conFirmMoveToArchives}
									>
										<i className="la la-check"></i> Confirm
									</button>
								</div>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>

				<SupplierShowModal
					show={this.state.showModal}
					onHide={this.modalClose.bind(this, "show")}
					singleSupplier={this.state.singleSupplier}
				/>

				<SupplierEditModal
					show={this.state.editModal}
					onHide={this.modalClose.bind(this, "edit")}
					id={this.state.id}
					singleSupplier={this.state.singleSupplier}
					getSuppliers={this.props.getSuppliers}
				/>

				<SupplierDeleteModal
					show={this.state.deleteModal}
					onHide={this.modalClose.bind(this, "delete")}
					id={this.state.id}
					conFirmMoveToArchives={this.conFirmMoveToArchives}
				/>
			</Fragment>
		);
	}
}

export default SupplierTable;
