import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import POShowModal from './POShowModal';
import PODeleteModal from './PODeleteModal';
import POEditModal from './POEditModal';

class BrandTable extends Component {
	state = {
		id: 0,
		singlePO: [],
		showModal: false,
		editModal: false,
		deleteModal: false,
		search: ''
	}

	static propTypes = {
		purchase_orders: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	// get the brand base on id
	getSinglePO = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/po/${id}`)
                            
        this.setState({singlePO: res.data.brand });
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

	// handle search
    handleSearchChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

 	// on submit
 	onSearchSubmit = (e) => {
        e.preventDefault();

		if(e.target.value !== ''){
			this.props.searchPO(this.state.search)
			this.setState({search: ' '});
		}
    }

	render() {
		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover table-bordered">
						<thead>
							<tr>
								<td colSpan="5">
									<div className="pull-left">
										<h4><b>Total: {this.props.totalCount}</b></h4>
									</div>
									<form onSubmit={this.onSearchSubmit} className="form-inline pull-right">
					                 	<input 
						                    name="search" 
						                    type="text"
						                    className="form-control input-sm"
						                    placeholder="Search here..."
						                    onChange={this.handleSearchChange}
						                />
					                </form>
								</td>
							</tr>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Created at</th>
								<th>Updated at</th>
								<th width="5%">Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.purchase_orders.map(po => (
								<tr key={po._id}>
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

				<POShowModal 
					show={this.state.showModal}
					onHide={this.modalClose.bind(this, 'show')}
					singlePO={this.state.singlePO}
				/>

				<POEditModal
					show={this.state.editModal}
					onHide={this.modalClose.bind(this, 'edit')}
					singlePO={this.state.singlePO}
					getPurchaseOrders={this.props.getPurchaseOrders}
				/>

				<PODeleteModal 
					show={this.state.deleteModal}
					onHide={this.modalClose.bind(this, 'delete')}
					id={this.state.id}
					conFirmMoveToArchives={this.conFirmMoveToArchives}
				/>
			</Fragment>
		)
	}
}

export default BrandTable