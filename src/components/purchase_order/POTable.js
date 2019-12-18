import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
// import POShowModal from './POShowModal';
// import PODeleteModal from './PODeleteModal';

class POTable extends Component {
	state = {
		id: 0,
		singlePO: [],
		showModal: false,
		editModal: false,
		deleteModal: false
	}

	static propTypes = {
		purchase_orders: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	// get the pos base on id
	getSinglePO = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/po/${id}`)
                            
        this.setState({singlePO: res.data.purchase_order });
        // console.log(res.data.supplier)
    }
	
	conFirmMoveToArchives = () => {
		this.setState({deleteModal: false});
		this.props.moveToArchives(this.state.id);
	};
	
	// show modal
	modalOpen = (status, id) => { 
		switch(status){
			case 'show':
				this.setState({showModal: true});
				this.getSinglePO(id);
				break;
			case 'edit':
				this.setState({editModal: true, id: id});
				this.getSinglePO(id);
				break;
			case 'delete':
				this.setState({deleteModal: true, id: id});
			default:
				// do nothing
				break;
		}
	}
	
	// hide modal
	modalClose = (status) => {
	  	switch(status){
			case 'show':
				this.setState({showModal: false});
				break;
			case 'edit':
				this.setState({editModal: false});
			case 'delete':
				this.setState({deleteModal: false});
			default:
				break;
		}
	}

	render() {
		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover table-bordered">
						<thead>
							<tr>
								<th>PO #</th>
								<th>Created at</th>
								<th>Updated at</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.purchase_orders.map(po => (
								<tr key={po._id}>
									<td>{po._id}</td>
									<td>{po.created_at}</td>
									<td>{po.updated_at}</td>
									<td>
										<div className="btn-group">
											<button 
												className="btn btn-sm btn-info btn-sm"
												onClick={this.modalOpen.bind(this, 'show',po._id)}
												>
												<i className="ft ft-eye"></i>
											</button>
											<button 
												className="btn btn-sm btn-warning btn-sm"
												onClick={this.modalOpen.bind(this, 'edit', po._id)}
												>
												<i className="ft ft-edit"></i>
											</button>	
											<Button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(this,'delete',po._id)}
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

			</Fragment>
		)
	}
}

export default POTable;