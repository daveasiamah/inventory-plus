import React, { Component, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductShowModal from './ProductShowModal';

class ProductTable extends Component {
	state = {
		id: 0,
		singleProduct: []
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
        // console.log(res.data.supplier)
    }
	
	showModal = (id) => {
		this.getSingleProduct(id);
	}

	render() {
		const { products } = this.props;

		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover">
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
									<td>{product.brand}</td>
									<td>{product.product_name}</td>
									<td>{product.product_category}</td>
									<td>{product.srp}</td>
									<td>{product.cost}</td>
									<td>{product.stocks}</td>
									<td>{product.status ? "Yes" : "No"}</td>
									<td>
										<div className="btn-group">
											<button 
												onClick={() => this.showModal(product._id)}
												className="btn btn-sm btn-info btn-sm"
												data-toggle="modal"
												data-target="#show-modal"
												>
												<i className="ft ft-eye"></i>
											</button>
											<Link
												to={`/product/${product._id}/edit`}
												className="btn btn-sm btn-warning"
											>
												<i className="ft ft-edit"></i>
											</Link>
											<button
												className="btn btn-sm btn-danger"
												data-toggle="modal"
												data-target="#delete-modal"
												onClick={() =>
													this.setState({
														id: product._id
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

				<ProductShowModal singleProduct={this.state.singleProduct}/>
			</Fragment>
		);
	}
}

export default ProductTable;
