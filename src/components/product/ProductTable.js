import React, { Component, Fragment } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductDeleteModal from './ProductDeleteModal';

class ProductTable extends Component {
	state = {
		id: 0,
		singleProduct: [],
		showModal: false,
		editModal: false,
		deleteModal: false
	};

	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	static propTypes = {
		products: PropTypes.array.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	getSingleProduct = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/product/${id}`)
                            
        this.setState({singleProduct: res.data.product });
    }
	
		// show modal
	modalOpen = (status, id) => { 
		switch(status){
			case 'show':
				this.setState({showModal: true});
				this.getSingleProduct(id);
				break;
			case 'edit':
				this.setState({editModal: true, id: id});
				this.getSingleProduct(id);
				break;
			case 'delete':
				this.setState({deleteModal: true, id: id});
			default:
				// do nothing
				break;
		}
	}
	
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
	
	render() {

		const { products } = this.props;

		const { brand_id, category_id } = this.props.products;

		console.log(this.props.products);

		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover table-bordered">
						<thead>
							<tr>
								<th>SKU</th>
								<th>Brand</th>
								<th>Product Name</th>
								<th>Category</th>
								<th>SRP</th>
								<th>Cost</th>
								<th>Stock</th>
								<th>Active</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product._id}>
									<td>{product.sku}</td>
									<td>{product.brand_id.label}</td>
									<td>{product.product_name}</td>
									<td>{product.category_id.label}</td>
									<td>{product.srp}</td>
									<td>{product.cost}</td>
									<td>{product.stocks}</td>
									<td>{product.status ? "Yes" : "No"}</td>
									<td>
										<div className="btn-group">
											<Link
												to={`/product/${product._id}`}
												className="btn btn-sm btn-info"
											>
												<i className="ft ft-eye"></i>
											</Link>
											<Link
												to={`/product/${product._id}/edit`}
												className="btn btn-sm btn-warning"
											>
												<i className="ft ft-edit"></i>
											</Link>
											<Button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"delete",
													product._id
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
				
				<ProductDeleteModal 
					show={this.state.deleteModal}
					onHide={this.modalClose.bind(this, "delete")}
					id={this.state.id}
					conFirmMoveToArchives={this.conFirmMoveToArchives}
				/>
				
			</Fragment>
		);
	}
}

export default ProductTable;
