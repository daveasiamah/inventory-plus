import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import Pagination from "react-js-pagination";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import ProductTable from "./ProductTable";
import { Modal, Button } from 'react-bootstrap';
import ProductCreateModal from './ProductCreateModal';

class Product extends Component {
    state = {
        products: [],
        totalCount: "",
        loading: false,
        singleProduct: [],
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8,
        showModal: false,
    };

    componentDidMount() {
        this.getProducts();
    }

    // alert message
    toast = (message) => {
        iziToast.show({
            title: 'Success',
            icon: 'ico-success',
            message: message,
            iconColor: 'rgb(0, 255, 184)',
            theme: 'dark',
            progressBarColor: 'rgb(0, 255, 184)',
            position: 'bottomRight',
            transitionIn: 'bounceInLeft',
            transitionOut: 'fadeOut',
            timeout: 4000,
        });
    }


    // fetch all items
    getProducts = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/product`);
        // console.log(res.data);
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
        // alert  message
        this.toast(res.data.message);
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
    
    open = () => {
      this.setState({showModal: true});
    }

    close = () => {
      this.setState({showModal: false});
    }

    render() {
        return (
            <Fragment>
                <div className="app-content content">
                    <div className="content-wrapper">
                        <div className="content-wrapper-before"></div>
                        <div className="content-header row">
                            <div className="content-header-left col-md-12 col-12 mb-2">
                                <h3 className="content-header-title mb-0 d-inline-block">
                                    Product
                                </h3>

                                <Button 
                                    onClick={this.open}
                                    className="btn btn-primary pull-right"
                                ><i className="ft ft-plus"></i> Create New
                                </Button>
                            </div>
                        </div>
                        <div className="content-body">
                            <section id="basic-examples">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">List of Products</h4>
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
                                                     
                                                    <section className="row">
                                                        <div className="col-sm-12">
                                                            {this.state.loading ? (
                                                                <Spinner />
                                                            ) : this.state.products.length > 0 ? (
                                                                <Fragment>
                                                                    <ProductTable
                                                                        products={this.state.products}
                                                                        totalCount={this.state.totalCount}
                                                                        moveToArchives={this.moveToArchives}
                                                                        getSingleProduct={this.getSingleProduct}
                                                                        searchProduct={this.searchProduct}
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <ProductCreateModal
                    show={this.state.showModal} 
                    onHide={this.close}
                    getProducts={this.getProducts}
                />

            </Fragment>
        );
    }
}

export default Product;
