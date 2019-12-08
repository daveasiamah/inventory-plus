import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BrandShowModal from './BrandShowModal';
import BrandCreateModal from './BrandCreateModal';


class BrandTable extends Component {
	state = {
		id: 0,
		singleBrand: [],
		showModal: false
	}

	static propTypes = {
		brands: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	getSingleBrand = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/brand/${id}`)
                            
        this.setState({singleBrand: res.data.brand });
        // console.log(res.data.supplier)
    }
	
	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	showModal = (id) => {
		this.getSingleBrand(id);
	}
	
	render() {

		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover table-bordered">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Created at</th>
								<th>Updated at</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.brands.map(brand => (
								<tr key={brand._id}>
									<td>{brand.name}</td>
									<td width="30%">{brand.description}</td>
									<td>{brand.created_at}</td>
									<td>{brand.updated_at}</td>
									<td>
										<div className="btn-group">
											<button 
												onClick={() => this.showModal(brand._id)}
												className="btn btn-sm btn-info btn-sm"
												data-toggle="modal"
												data-target="#show-modal"
												>
												<i className="ft ft-eye"></i>
											</button>
											<Link
												to={`/brand/${brand._id}/edit`}
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
														id: brand._id
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

			</Fragment>
		)
	}
}

export default BrandTable