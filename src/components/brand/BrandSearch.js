import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export class SupplierSearch extends Component {
	state = {
		search: ''
	}

	static propTypes = {
		searchSupplier: PropTypes.func,

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
					<Link to={'/brand/add'} className="btn btn-primary btn-sm pull-right mb-2">
						Add New
					</Link>
				</div>
			</Fragment>
		)
	}
}

export default SupplierSearch;