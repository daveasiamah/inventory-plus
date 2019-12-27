import React, { Component, Fragment } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductDeleteModal from './ProductDeleteModal';
import ProductShowModal from './ProductShowModal';
import ProductEditModal from './ProductEditModal';

class ProductTable extends Component {
	state = {
		id: 0,
		singleProduct: {
			sku: "",
			product_name: "",
			brand_id: [],
			category_id: [],
			description: "",
			supplier_id: [],
			barcode: "",
				dimension_length: "",
				dimension_width: "",
				dimension_height: "",
				color: "",
				material_tags: [],
				fitting_type: "",
				fitting_qty: "",
				weight_kg: "",
				packing_length: "",
				packing_width: "",
				packing_height: "",
			cost: "",
			srp: "",
			delivery_fee: "",
			customization_fee: "",
			stock_alarm: "",
			stocks: "",
			sales_price: "",
			product_image: null,
			created_at: "",
			updated_at: ""
		},
		showModal: false,
		editModal: false,
		deleteModal: false
	};

	conFirmMoveToArchives = () => {
		this.props.moveToArchives(this.state.id);
	};

	static propTypes = {
		getProducts: PropTypes.func.isRequired,
		moveToArchives: PropTypes.func.isRequired,
	};

	// fetch the single item
	getSingleProduct = async id => {
		this.setState({ loading: true });

		let res = await axios.get(
			`http://inventory.test/api/admin/product/${id}`
		);
	
		this.setState({
			singleProduct: {
				sku: res.data.product.sku,
				product_name: res.data.product.product_name,
				description: res.data.product.description,
				brand_id: res.data.product.brand_id,
				category_id: res.data.product.category_id,
				supplier_id: res.data.product.supplier_id,
				barcode: res.data.product.barcode,
				dimension_length: res.data.product.attributes.dimension_length,
				dimension_width: res.data.product.attributes.dimension_width,
				dimension_height: res.data.product.attributes.dimension_height,
				color: res.data.product.attributes.color,
				material_tags: res.data.product.attributes.material_tags.split(","),
				fitting_type: res.data.product.attributes.fitting_type,
				fitting_qty: res.data.product.attributes.fitting_qty,
				weight_kg: res.data.product.attributes.weight_kg,
				packing_length: res.data.product.attributes.packing_length,
				packing_width: res.data.product.attributes.packing_width,
				packing_height: res.data.product.attributes.packing_height,
				cost: res.data.product.cost,
				srp: res.data.product.srp,
				delivery_fee: res.data.product.delivery_fee,
				customization_fee: res.data.product.customization_fee,
				stock_alarm: res.data.product.stock_alarm,
				stocks: res.data.product.stocks,
				sales_price: res.data.product.sales_price,
				product_image: res.data.product.product_image,
				created_at: res.data.product.created_at,
				updated_at: res.data.product.updated_at
			},
			loading: false
		});
	};
	
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
				this.getSingleProduct(id);
				break;
			case "edit":
				this.setState({ editModal: true, id: id });
				this.getSingleProduct(id);
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
			this.props.searchProduct(this.state.search)
			this.setState({search: ' '});
		}
    }
	
	render() {

		const { products } = this.props;

		return (
			<Fragment>
				<div className="table-responsive">
					<table className="table table-striped table-hover table-bordered">
						<thead>
							<tr>
								<td colSpan="8">
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
								<th>SKU</th>
								<th>Product Name</th>
								<th>SRP</th>
								<th>Stocks</th>
								<th>Created at</th>
								<th>Updated at</th>
								<th width="5%">Action</th>
							</tr>
						</thead>
						<tbody>
							{products.map(product => (
								<tr key={product._id}>
									<td>{product.sku}</td>
									<td>{product.product_name}</td>
									<td>{product.srp}</td>
									<td>{product.stocks}</td>
									<td>{product.created_at}</td>
									<td>{product.updated_at}</td>
									<td>
										<div className="btn-group">
											<button 
												className="btn btn-sm btn-info btn-sm"
												onClick={this.modalOpen.bind(this, 'show', product._id)}
												>
												<i className="ft ft-eye"></i>
											</button>
											<button 
												className="btn btn-sm btn-warning btn-sm"
												onClick={this.modalOpen.bind(this, 'edit', product._id)}
												>
												<i className="ft ft-edit"></i>
											</button>
											<button
												className="btn btn-sm btn-danger btn-sm"
												onClick={this.modalOpen.bind(
													this,
													"delete",
													product._id
												)}
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

				<ProductShowModal 
					show={this.state.showModal}
					onHide={this.modalClose.bind(this, 'show')}
					singleProduct={this.state.singleProduct}
				/>
				
				<ProductEditModal
					show={this.state.editModal}
					onHide={this.modalClose.bind(this,'edit')}
					singleProduct={this.state.singleProduct}
					getProducts={this.props.getProducts}
				/>	

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
