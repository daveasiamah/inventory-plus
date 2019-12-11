import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import CustomerTable from './CustomerTable';
import CustomerSearch from './CustomerSearch';

class Customer extends Component {
		
	state = {
		customers: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
	}

	componentDidMount() {
		this.getCustomers();
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
    	
	// fetch all customers
    getCustomers = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/customer`);
            this.setState({ 
                customers: res.data.customers.data, 
                totalCount: res.data.customers.total,
                loading: false 
            });
    };
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/customer/archives/${id}`);
        // fetch the new updated data
        this.getCustomers();
        // alert message
        this.toast(res.data.message);
    };
    
    // pagination links
    handlePageChange = (pageNumber) => {
        // this.setState({activePage: pageNumber});
        axios.get(`http://inventory.test/api/admin/customer?page=${pageNumber}`)
                    .then(res => this.setState({
                                customers: res.data.customers.data,
                                activePage: res.data.customers.current_page,
                                itemsCountPerPage: res.data.customers.per_page,
                                totalItemsCount: res.data.customers.total,
                            })
                        )
    }

    // search 
    searchCustomer = async (search) => {
        this.setState({ loading: true});

        let res = await axios.post(`http://inventory.test/api/admin/customer/search`, {
            search: search
        });
        
        this.setState({
             customers: res.data.customers.data,
             totalCount: res.data.customers.total,
             loading: false     
        });        
    }
    
	render() {
		return (
			<div>
				<h1>Customer</h1>

				<div className="row mt-2">
                   <div className="col-sm-12">
                      <h3 className="pull-left">Total: {this.state.totalCount}</h3>
                       
                   </div>
                </div>
                
                <section className="row">
                    <CustomerSearch searchCustomer={this.searchCustomer} getCustomers={this.getCustomers}/>
                </section>    

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.customers.length  > 0 ? (
                            <Fragment>
                                <CustomerTable
                                    customers={this.state.customers}
                                    totalCount={this.state.totalCount}
                                    moveToArchives={this.moveToArchives}
                                    getCustomers={this.getCustomers}
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
		)
	}
}

export default Customer;