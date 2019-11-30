import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SupplierShowModal from './SupplierShowModal';

class SupplierTable extends Component {
	state = {
		id: 0,
		singleSupplier: [],
		showModal: false,
		close: false,
	}

	static propTypes = {
		suppliers: PropTypes.array.isRequired,
		totalCount: PropTypes.number.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	getSingleSupplier = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/supplier/${id}`)
                                .catch(err => console.log(err));

        this.setState({singleSupplier: res.data.supplier });
        console.log(res.data.supplier)
    }
	
	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};
	
	render() {

		return (
			<Fragment>
				<h4>Total: {this.props.totalCount}</h4>
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
											<SupplierShowModal>
												<h3>{supplier.name}</h3>
												<p><strong>Business Name:</strong> {supplier.business_name}</p>
												<p><strong>Address:</strong> {supplier.address}</p>
												<p><strong>Landline:</strong> {supplier.landline}</p>
												<p><strong>Fax:</strong> {supplier.fax}</p>
												<p><strong>Email:</strong> {supplier.email}</p>
												<p><strong>Mobile: </strong>{supplier.mobile}</p>
												<p><strong>Contact Person: </strong> {supplier.contact_person}</p>
												<hr/>
												<p>created: {supplier.created_at}</p>
												<p>updated: {supplier.updated_at}</p>
											</SupplierShowModal>
											<button 
												onClick={() => this.setState({id: supplier._id})}
												className="btn btn-sm btn-info"
												data-toggle="modal"
												data-target="#show-modal"
												>
												<i className="la la-eye"></i>
											</button>
											<Link
												to={`/supplier/${supplier._id}/edit`}
												className="btn btn-sm btn-warning"
											>
											<i className="la la-edit"></i>
											</Link>
											<button
												className="btn btn-sm btn-danger"
												data-toggle="modal"
												data-target="#delete-modal"
												onClick={() =>
													this.setState({
														id: supplier._id
													})
												}
											>
												<i className="la la-times"></i>
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
			</Fragment>
		)
	}
}

export default SupplierTable