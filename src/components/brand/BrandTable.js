import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import BrandShowModal from './BrandShowModal';
import BrandDeleteModal from './BrandDeleteModal';
import BrandEditModal from './BrandEditModal';

class BrandTable extends Component {
	state = {
		id: 0,
		singleBrand: [],
		showModal: false,
		editModal: false,
		deleteModal: false
	}

	static propTypes = {
		brands: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	// get the brand base on id
	getSingleBrand = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/brand/${id}`)
                            
        this.setState({singleBrand: res.data.brand });
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
				this.getSingleBrand(id);
				break;
			case 'edit':
				this.setState({editModal: true, id: id});
				this.getSingleBrand(id);
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
												className="btn btn-sm btn-info btn-sm"
												onClick={this.modalOpen.bind(this, 'show',brand._id)}
												>
												<i className="ft ft-eye"></i>
											</button>
											<button 
												className="btn btn-sm btn-warning btn-sm"
												onClick={this.modalOpen.bind(this, 'edit', brand._id)}
												>
												<i className="ft ft-edit"></i>
											</button>	
											<Button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(this,'delete',brand._id)}
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

				<BrandShowModal 
					show={this.state.showModal}
					onHide={this.modalClose.bind(this, 'show')}
					singleBrand={this.state.singleBrand}
				/>

				<BrandEditModal
					show={this.state.editModal}
					onHide={this.modalClose.bind(this, 'edit')}
					id={this.state.id}
					singleBrand={this.state.singleBrand}
					getBrands={this.props.getBrands}
				/>

				<BrandDeleteModal 
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