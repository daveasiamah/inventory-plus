import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AgentCreateModal from './AgentCreateModal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class AgentSearch extends Component {
	state = {
		search: ''
	}

	static propTypes = {
		searchAgents: PropTypes.func,
		getAgents: PropTypes.func.isRequired

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

		if(e.target.value !== ''){
			this.props.searchAgent(this.state.search)
			this.setState({search: ' '});
		}
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
				
				<AgentCreateModal 
					show={this.state.showModal} 
					onHide={this.close}
					getAgents={this.props.getAgents}
				/>
			</Fragment>
		)
	}
}

export default AgentSearch;