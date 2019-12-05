import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import Pagination from "react-js-pagination";
import ProductTable from "./ProductTable";
import ProductSearch from "./ProductSearch";

class Product extends Component {
    state = {
        products: [],
        totalCount: "",
        loading: false,
        singleProduct: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
    };

    componentDidMount() {
        this.getProducts();
    }

    // fetch all items
    getProducts = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/product`);
        this.setState({
            products: res.data.products.data,
            totalCount: res.data.products.total,
            loading: false
        });
    };

    // fetch single item
    getSingleProduct = async id => {
        let res = await axios.get(
            `http://inventory.test/api/admin/product/${id}`
        );
        console.log(res.data);
        this.setState({ singleProduct: res.data });
    };

    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/product/archives/${id}`,
            {
                archives: 1
            }
        );
        // fetch the new updated data
        this.getProducts();
        console.log(res.data);
    };

    // pagination links
    handlePageChange = pageNumber => {
        // this.setState({activePage: pageNumber});
        axios
            .get(`http://inventory.test/api/admin/product?page=${pageNumber}`)
            .then(res =>
                this.setState({
                    products: res.data.products.data,
                    activePage: res.data.products.current_page,
                    itemsCountPerPage: res.data.products.per_page,
                    totalItemsCount: res.data.products.total
                })
            );
    };

    // search
    searchProduct = async search => {
        this.setState({ loading: true });

        let res = await axios.post(
            `http://inventory.test/api/admin/product/search`,
            {
                search: search
            }
        );

        this.setState({
            products: res.data.products.data,
            totalCount: res.data.products.total,
            loading: false
        });
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
                                                        src="/square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="">
                                                        Out of Stock
                                                    </div>
                                                    <img
                                                        src="/square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="">
                                                        Total Items
                                                    </div>
                                                    <img
                                                        src="/square.jpg"
                                                        className="img-fluid"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="">
                                                        Others
                                                    </div>
                                                    <img
                                                        src="/square.jpg"
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

                <div className="row mt-2">
                    <div className="col-sm-12">
                        <h3 className="pull-left">
                            Total: {this.state.totalCount}
                        </h3>
                    </div>
                </div>

                <section className="row">
                    <ProductSearch searchProduct={this.searchProduct} />
                </section>

                <section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.products.length > 0 ? (
                            <Fragment>
                                <ProductTable
                                    products={this.state.products}
                                    moveToArchives={this.moveToArchives}
                                    getSingleProduct={this.getSingleProduct}
                                />

                                {this.state.totalCount > 10 && (
                                    <div className="d-flex justify-content-center">
                                        <Pagination
                                            className="pagination"
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={
                                                this.state.itemsCountPerPage
                                            }
                                            totalItemsCount={
                                                this.state.totalItemsCount
                                            }
                                            pageRangeDisplayed={
                                                this.state.pageRangeDisplayed
                                            }
                                            onChange={this.handlePageChange}
                                        />
                                    </div>
                                )}
                            </Fragment>
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
