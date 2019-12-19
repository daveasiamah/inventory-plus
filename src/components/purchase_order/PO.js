import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import POTable from './POTable';
import POSearch from './POSearch';


class PO extends Component {
		
	state = {
		purchase_orders: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
	}

	componentDidMount() {
		this.getPurchaseOrders();
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

	// fetch all purchase orders
    getPurchaseOrders = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/po`);
            this.setState({ 
                purchase_orders: res.data.purchase_orders.data, 
                totalCount: res.data.purchase_orders.total,
                loading: false 
            });
    };
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/brand/po/${id}`);
        // fetch the new updated data
        this.getPurchaseOrders();
        // alert message
        this.toast(res.data.message);
    };
    
    // pagination links
    handlePageChange = (pageNumber) => {
        // this.setState({activePage: pageNumber});
        axios.get(`http://inventory.test/api/admin/po?page=${pageNumber}`)
                    .then(res => this.setState({
                                purchase_orders: res.data.purchase_orders.data,
                                activePage: res.data.brands.current_page,
                                itemsCountPerPage: res.data.brands.per_page,
                                totalItemsCount: res.data.brands.total,
                            })
                        )
    }

    // search 
    searchPO = async (search) => {
        this.setState({ loading: true});

        let res = await axios.post(`http://inventory.test/api/admin/po/search`, {
            search: search
        });
        
        this.setState({
             purchase_orders: res.data.purchase_orders.data,
             totalCount: res.data.purchase_orders.total,
             loading: false     
        });        
    }
    
	render() {
		return (
			<div>
				<h1>Purchase Order</h1>

				<div className="row mt-2">
                   <div className="col-sm-12">
                      <h3 className="pull-left">Total: {this.state.totalCount}</h3>
                   </div>
                </div>

                <section className="row">
                    <POSearch searchPO={this.searchPO} getPurchaseOrders={this.getPurchaseOrders}/>
                </section>    


				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.purchase_orders.length  > 0 ? (
                            <Fragment>
                                <POTable
                                    purchase_orders={this.state.purchase_orders}
                                    totalCount={this.state.totalCount}
                                    moveToArchives={this.moveToArchives}
                                    getPurchaseOrders={this.getPurchaseOrders}
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

export default PO;