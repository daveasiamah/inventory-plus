import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import CategoryShowModal from "./CategoryShowModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import CategoryEditModal from "./CategoryEditModal";

class CategoryTable extends Component {
	state = {
		id: 0,
		singleCategory: [],
		isOpen: false
	};

	static propTypes = {
		categories: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired
	};

	getSingleCategory = async id => {
		let res = await axios.get(
			`http://inventory.test/api/admin/category/${id}`
		);

		this.setState({ singleCategory: res.data.category });
		// console.log(res.data.supplier)
	};

	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	// show modal
	modalOpen = (status, id) => {
		switch (status) {
			case "show":
				this.setState({ showModal: true });
				this.getSingleCategory(id);
				break;
			case "edit":
				this.setState({ editModal: true, id: id });
				this.getSingleCategory(id);
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
			this.props.searchCategory(this.state.search)
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
								<th>Parent Category</th>
								<th width="50%">Description</th>
								<th width="5%">Action</th>
							</tr>
						</thead>
						<tbody>
							{this.props.categories.map(category => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td
										className={
											category.parent_category == ""
												? "text-danger"
												: null
										}
									>
										{category.parent_category == ""
											? "None"
											: category.parent_category}
									</td>
									<td>{category.description}</td>
									<td>
										<div className="btn-group">
											<button
												className="btn btn-sm btn-info btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"show",
													category._id
												)}
											>
												<i className="ft ft-eye"></i>
											</button>
											<button
												className="btn btn-sm btn-warning btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"edit",
													category._id
												)}
											>
												<i className="ft ft-edit"></i>
											</button>
											<Button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"delete",
													category._id
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

				<CategoryShowModal
					singleCategory={this.state.singleCategory}
					show={this.state.showModal}
					onHide={this.modalClose.bind(this, "show")}
				/>

				<CategoryEditModal
					show={this.state.editModal}
					onHide={this.modalClose.bind(this, "edit")}
					id={this.state.id}
					singleCategory={this.state.singleCategory}
					getCategory={this.props.getCategory}
				/>

				<CategoryDeleteModal
					show={this.state.deleteModal}
					onHide={this.modalClose.bind(this, "delete")}
					id={this.state.id}
					conFirmMoveToArchives={this.conFirmMoveToArchives}
				/>
			</Fragment>
		);
	}
}

export default CategoryTable;
