import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Spinner from "../layouts/Spinner";
import ProductTable from "./ProductTable";

class Product extends Component {
    state = {
        products: [],
        loading: false,
        singleProduct: []
    };

    componentDidMount() {
        this.getProducts();
    }
    
    // fetch all items
    getProducts = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/product`);

        // console.log(res.data);
        this.setState({ products: res.data });
        this.setState({ loading: false });
    };
    
    // fetch single item
    getSingleProduct = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/product/${id}`);
        console.log(res.data);
        this.setState({singleProduct: res.data});
    }
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/product/archives/${id}`,{
                archives: 1
            });
        // fetch the new updated data
        this.getProducts();
        console.log(res.data);
    };
        
    render() {
        return (
            <div>
                <h1>Products</h1>
                <section className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        <a className="heading-elements-toggle">
                                            <i className="la la-ellipsis-v font-medium-3"></i>
                                        </a>
                                        <div className="heading-elements">
                                            <ul className="list-inline mb-0">
                                                <li>
                                                    <a data-action="collapse">
                                                        <i className="ft-minus"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a data-action="reload">
                                                        <i className="ft-rotate-cw"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a data-action="close">
                                                        <i className="ft-x"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-content collapse show">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="">
                                                        Low Stock
                                                    </div>
                                                    <img
                                                        src="square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="">
                                                        Out of Stock
                                                    </div>
                                                    <img
                                                        src="square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="">
                                                        Total Items
                                                    </div>
                                                    <img
                                                        src="square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="">
                                                        Others
                                                    </div>
                                                    <img
                                                        src="square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </section>
                
                <div className="row">
                   <div className="col-sm-12">
                        <Link to={'/product/add'} className="btn btn-primary btn-sm pull-right mb-2">
                            Add New
                        </Link>    
                   </div>
                </div>

                <section className="row">

                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.products.length > 0 ? (
                            <ProductTable
                                products={this.state.products}
                                moveToArchives={this.moveToArchives}
                                getSingleProduct={this.getSingleProduct}
                            />
                        ) : (
                            <h1>No Data to Show...</h1>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

export default Product;
