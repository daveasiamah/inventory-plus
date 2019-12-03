import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategoryShowModal from './CategoryShowModal';

class CategoryTable extends Component {
	state = {
		id: 0,
		singleCategory: [],
		isOpen: false,
	}

	static propTypes = {
		categories: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	getSingleCategory = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/category/${id}`)
                            
        this.setState({singleCategory: res.data.category });
        // console.log(res.data.supplier)
    }
	
	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	showModal = (id) => {
		this.getSingleCategory(id);
	}
	
	render() {

		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Unit</th>
								<th>Attributes</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.categories.map(category => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td>{category.description}</td>
									<td>{category.unit}</td>
									<td>{category.attributes}</td>
									<td>
										<div className="btn-group">
											<button 
												onClick={() => this.showModal(category._id)}
												className="btn btn-sm btn-info btn-sm"
												data-toggle="modal"
												data-target="#show-modal"
												>
												<i className="ft ft-eye"></i>
											</button>
											<Link
												to={`/category/${category._id}/edit`}
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
														id: category._id
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

				<CategoryShowModal singleCategory={this.state.singleCategory}/>
			</Fragment>
		)
	}
}

export default CategoryTable