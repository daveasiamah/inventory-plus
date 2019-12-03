import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SupplierShowModal from './SupplierShowModal';

class SupplierTable extends Component {
	state = {
		id: 0,
		singleSupplier: [],
		isOpen: false,
	}

	static propTypes = {
		suppliers: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	getSingleSupplier = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/supplier/${id}`)
                             
        this.setState({singleSupplier: res.data.supplier });
        // console.log(res.data.supplier)
    }
	
	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	showModal = (id) => {
		this.getSingleSupplier(id);
	}
	
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
								<th>Contact Person</th>
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
									<td>{supplier.contact_person}</td>
									<td>
										<div className="btn-group">
											<button 
												onClick={() => this.showModal(supplier._id)}
												className="btn btn-sm btn-info btn-sm"
												data-toggle="modal"
												data-target="#show-modal"
												>
												<i className="ft ft-eye"></i>
											</button>
											<Link
												to={`/supplier/${supplier._id}/edit`}
												className="btn btn-sm btn-warning btn-sm"
											>
											<i className="ft ft-edit"></i>
											</Link>
											<button
												className="btn btn-sm btn-danger btn-sm"
												data-toggle="modal"
												data-target="#delete-modal"
												onClick={() =>
													this.setState({
														id: supplier._id
													})
												}
											>
												<i className="ft ft-x"></i>
											</button>
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

				<SupplierShowModal singleSupplier={this.state.singleSupplier}/>
			</Fragment>
		)
	}
}

export default SupplierTable