import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import { Modal, Button } from 'react-bootstrap';
import BrandCreateModal from './BrandCreateModal';
import axios from "axios";
import Pagination from "react-js-pagination";
import "../layouts/styles/iziToast.css";
import iziToast from "izitoast";
import BrandTable from "./BrandTable";

class Brand extends Component {
    state = {
        brands: [],
        totalCount: "",
        loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8,
        showModal: false
    };

    componentDidMount() {
        this.getBrands();
    }

    // alert message
    toast = message => {
        iziToast.show({
            title: "Success",
            icon: "ico-success",
            message: message,
            iconColor: "rgb(0, 255, 184)",
            theme: "dark",
            progressBarColor: "rgb(0, 255, 184)",
            position: "bottomRight",
            transitionIn: "bounceInLeft",
            transitionOut: "fadeOut",
            timeout: 4000
        });
    };

    // fetch all brands
    getBrands = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/brand`);
        this.setState({
            brands: res.data.brands.data,
            totalCount: res.data.brands.total,
            loading: false
        });
    };

    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/brand/archives/${id}`
        );
        // fetch the new updated data
        this.getBrands();
        // alert message
        this.toast(res.data.message);
    };

    // pagination links
    handlePageChange = pageNumber => {
        // this.setState({activePage: pageNumber});
        axios
            .get(`http://inventory.test/api/admin/brand?page=${pageNumber}`)
            .then(res =>
                this.setState({
                    brands: res.data.brands.data,
                    activePage: res.data.brands.current_page,
                    itemsCountPerPage: res.data.brands.per_page,
                    totalItemsCount: res.data.brands.total
                })
            );
    };

    open = () => {
      this.setState({showModal: true});
    }

    close = () => {
      this.setState({showModal: false});
    }


    // search
    searchBrand = async search => {
        this.setState({ loading: true });

        let res = await axios.post(
            `http://inventory.test/api/admin/brand/search`,
            {
                search: search
            }
        );

        this.setState({
            brands: res.data.brands.data,
            totalCount: res.data.brands.total,
            loading: false
        });
    };

    render() {
        return (
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-12 col-12 mb-2 breadcrumb-new">
                            <h3 className="content-header-title mb-0 d-inline-block">
                                Product
                            </h3>

                            <div className="breadcrumbs-top d-inline-block">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item ">
                                            <a href="/brand" className="text-white">
                                                Brand
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <Button 
                                onClick={this.open}
                                className="btn btn-primary pull-right"
                            ><i className="ft ft-plus"></i> Create New</Button>
                        </div>
                    </div>
                    <div className="content-body">
                        <section id="basic-examples">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">List of Brands</h4>
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
                                                        ) : this.state.brands.length  > 0 ? (
                                                            <Fragment>
                                                                <BrandTable
                                                                    brands={this.state.brands}
                                                                    totalCount={this.state.totalCount}
                                                                    totalCount={this.state.totalCount}
                                                                    moveToArchives={this.moveToArchives}
                                                                    getBrands={this.getBrands}
                                                                    searchBrand={this.searchBrand}
                                                                />

                                                               {this.state.totalCount > 10 && (
                                                                    <div className="d-flex justify-content-center">
                                                                        <Pagination
                                                                            className="pagination"
                                                                            itemClass='page-item'
                                                                            linkClass='page-link'
                                                                            activePage={this.state.activePage}
                                                                            itemsCountPerPage={this.state.itemsCountPerPage}
                                                                            totalItemsCount={this.state.totalItemsCount}
                                                                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                                                                            onChange={this.handlePageChange}
                                                                        />
                                                                    </div>
                                                                )}
                                                            
                                                            </Fragment>
                                                        ) : (
                                                            <h1 align="center" className="mt-5">There's No Data to show...</h1>
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

                <BrandCreateModal 
                    show={this.state.showModal} 
                    onHide={this.close}
                    getBrands={this.getBrands}
                />

            </div>
        )
    }
}

export default Brand;
