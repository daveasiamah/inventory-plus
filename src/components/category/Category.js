import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import CategoryTable from './CategoryTable';
import { Modal, Button } from 'react-bootstrap';
import CategoryCreateModal from './CategoryCreateModal';

class Category extends Component {
		
	state = {
		categories: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8,
        showModal: false
	}

	componentDidMount() {
		this.getCategory();
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

	// fetch all brands
    getCategory = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/category`);
            this.setState({ 
                categories: res.data.categories.data, 
                totalCount: res.data.categories.total,
                loading: false 
            });
    };
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/category/archives/${id}`);
        //fetch the new updated data
        this.getCategory();
        //alert message
        this.toast(res.data.message);
    };
    
    // pagination links
    handlePageChange = (pageNumber) => {
        // this.setState({activePage: pageNumber});
        axios.get(`http://inventory.test/api/admin/category?page=${pageNumber}`)
                    .then(res => this.setState({
                                categories: res.data.categories.data,
                                activePage: res.data.categories.current_page,
                                itemsCountPerPage: res.data.categories.per_page,
                                totalItemsCount: res.data.categories.total,
                            })
                        )
    }


    // search 
    searchCategory = async (search) => {
        this.setState({ loading: true});

        let res = await axios.post(`http://inventory.test/api/admin/category/search`, {
            search: search
        });
        
        this.setState({
             categories: res.data.categories.data,
             totalCount: res.data.categories.total,
             loading: false     
        });        
    }
    

    open = () => {
      this.setState({showModal: true});
    }

    close = () => {
      this.setState({showModal: false});
    }



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
                                        <li className="breadcrumb-item">
                                            <a href="/category" className="text-white">
                                                Category
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
                                            <h4 className="card-title">List of Categories</h4>
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
                                                        ) : this.state.categories.length  > 0 ? (
                                                            <Fragment>
                                                                <CategoryTable
                                                                    categories={this.state.categories}
                                                                    totalCount={this.state.totalCount}
                                                                    totalCount={this.state.totalCount}
                                                                    moveToArchives={this.moveToArchives}
                                                                    getCategory={this.getCategory}
                                                                    searchCategory={this.searchCategory}
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

                <CategoryCreateModal 
                    show={this.state.showModal} 
                    onHide={this.close}
                    getCategory={this.getCategory}
                />

            </div>
		)
	}
}

export default Category