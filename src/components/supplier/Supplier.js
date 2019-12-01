import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import SupplierTable from './SupplierTable';
import SupplierSearch from './SupplierSearch';

class Supplier extends Component {
		
	state = {
		suppliers: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
	}

	componentDidMount() {
		this.getSuppliers();

        // axios.get(`http://inventory.test/api/admin/supplier?page=${pageNumber}`)
        //         .then(res => this.setState({
        //                     suppliers: res.data.suppliers.data,
        //                     activePage: res.data.suppliers.current_page,
        //                     itemsCountPerPage: res.data.suppliers.per_page,
        //                     totalItemsCount: res.data.suppliers.total,
        //                 })
        //             )
	}
		
	// fetch all suppliers
    getSuppliers = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/supplier`);
            this.setState({ 
                suppliers: res.data.suppliers.data, 
                totalCount: res.data.count,
                loading: false 
            });
    };
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/supplier/archives/${id}`);
        // fetch the new updated data
        this.getSuppliers();
    };

    handlePageChange = (pageNumber) => {
        // console.log(`active page is ${pageNumber}`);
        // this.setState({activePage: pageNumber});
        axios.get(`http://inventory.test/api/admin/supplier?page=${pageNumber}`)
                    .then(res => this.setState({
                                suppliers: res.data.suppliers.data,
                                activePage: res.data.suppliers.current_page,
                                itemsCountPerPage: res.data.suppliers.per_page,
                                totalItemsCount: res.data.suppliers.total,
                            })
                        )
    }

    // search  
    searchSupplier = (text) => {
        axios.get(``)
    } 
    
	render() {
		return (
			<div>
				<h1>Supplier</h1>

				<div className="row mt-2">
                   <div className="col-sm-12">
                      <h3 className="pull-left">Total: {this.state.totalCount}</h3>
                       <Link to={'/supplier/add'} className="btn btn-primary btn-sm pull-right mb-2">
							Add New
						</Link>
                   </div>
                </div>
                
                <section>
                    <SupplierSearch />
                </section>    

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.suppliers.length  > 0 ? (
                            <Fragment>
                                <SupplierTable
                                    suppliers={this.state.suppliers}
                                    totalCount={this.state.totalCount}
                                    moveToArchives={this.moveToArchives}
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

export default Supplier