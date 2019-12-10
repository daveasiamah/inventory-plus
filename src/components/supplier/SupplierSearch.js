import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SupplierCreateModal from './SupplierCreateModal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export class SupplierSearch extends Component {
	state = {
		search: ''
	}

	static propTypes = {
		searchSupplier: PropTypes.func,
		getSuppliers: PropTypes.func.isRequired

	}

	open = () => {
	  this.setState({showModal: true});
	}

	close = () => {
	  this.setState({showModal: false});
	}

	// handle search
    handleSearchChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

 	// on submit
 	onSearchSubmit = (e) => {
        e.preventDefault();

		this.props.searchSupplier(this.state.search)
		this.setState({search: ' '});
    }

	render() {
		return (
			<Fragment>
				<div className="col-auto mr-auto">
					<form onSubmit={this.onSearchSubmit} className="form-inline mb-2">
		                 <input 
		                    name="search" 
		                    type="text"
		                    className="form-control input-sm w-20 mr-1"
		                    placeholder="Search here..."
		                    onChange={this.handleSearchChange}
		                />
		                <button type="submit" className="btn btn-sm btn-primary">Go</button>
	                </form>
				</div>

				<div className="col-auto">
					<Button 
						onClick={this.open}
						className="btn btn-sm btn-primary"
					>Create New</Button>
				</div>
				
				<SupplierCreateModal 
					show={this.state.showModal} 
					onHide={this.close}
					getSuppliers={this.props.getSuppliers}
				/>
			</Fragment>
		)
	}
}

export default SupplierSearch;