import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AgentShowModal from "./AgentShowModal";
import AgentEditModal from './AgentEditModal';
import AgentDeleteModal from "./AgentDeleteModal";

class AgentTable extends Component {
	state = {
		id: 0,
		singleAgent: [],
		isOpen: false,
		showModal: false,
		editModal: false,
		deleteModal: false,
		search: ''
	};

	static propTypes = {
		agents: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired
	};

	getSingleAgent = async id => {
		let res = await axios.get(
			`http://inventory.test/api/admin/agent/${id}`
		);

		this.setState({ singleAgent: res.data.agent });
	}

	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	// show modal
	modalOpen = (status, id) => {
		switch (status) {
			case "show":
				this.setState({ showModal: true });
				this.getSingleAgent(id);
				break;
			case "edit":
				this.setState({ editModal: true, id: id });
				this.getSingleAgent(id);
				break;
			case "delete":
				this.setState({ deleteModal: true, id: id });
			default:
				// do nothing
				break;
		}
	};

	// hide modal
	modalClose = status => {
		switch (status) {
			case "show":
				this.setState({ showModal: false });
				break;
			case "edit":
				this.setState({ editModal: false });
			case "delete":
				this.setState({ deleteModal: false });
			default:
				break;
		}
	};

	// handle search
    handleSearchChange = (e) => {	
        this.setState({ [e.target.name]: e.target.value});	
    }	
	
 	// on submit
 	onSearchSubmit = (e) => {
        e.preventDefault();
		
		if(e.target.value !== ''){
			this.props.searchAgent(this.state.search);
			this.setState({ search: ' ' });
		}
    }

	render() {
		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover table-bordered">
						<thead>
							<tr>
								<td colSpan="6">
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
								<th>Email</th>
								<th>Landline</th>
								<th>Mobile</th>
								<th>Fax</th>
								<th width="5%">Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.agents.map(agent => (
								<tr key={agent._id}>
									<td>{agent.name}</td>
									<td>{agent.email}</td>
									<td>{agent.landline}</td>
									<td>{agent.mobile}</td>
									<td>{agent.fax}</td>
									<td>
										<div className="btn-group">
											<button
												className="btn btn-sm btn-info btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"show",
													agent._id
												)}
											>
												<i className="ft ft-eye"></i>
											</button>
											<button
												className="btn btn-sm btn-warning btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"edit",
													agent._id
												)}
											>
												<i className="ft ft-edit"></i>
											</button>
											<Button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"delete",
													agent._id
												)}
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

				<AgentShowModal
					show={this.state.showModal}
					onHide={this.modalClose.bind(this, "show")}
					singleAgent={this.state.singleAgent}
				/>

				<AgentEditModal
					show={this.state.editModal}
					onHide={this.modalClose.bind(this, "edit")}
					singleAgent={this.state.singleAgent}
					getAgents={this.props.getAgents}
				/>

				<AgentDeleteModal
					show={this.state.deleteModal}
					onHide={this.modalClose.bind(this, "delete")}
					id={this.state.id}
					conFirmMoveToArchives={this.conFirmMoveToArchives}
				/>
			</Fragment>
		);
	}
}

export default AgentTable;
