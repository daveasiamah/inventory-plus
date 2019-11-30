import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import SupplierTable from './SupplierTable';

class Supplier extends Component {
		
	state = {
		suppliers: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 8,
        pageRangeDisplayed: 0
	}

	componentDidMount() {
		this.getSuppliers();
	}
		
	// fetch all suppliers
    getSuppliers = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/supplier`);

        console.log(res.data);
        this.setState({ suppliers: res.data.suppliers.data, totalCount: res.data.count });
        this.setState({ loading: false, pageRangeDisplayed: res.data.suppliers.total / res.data.suppliers.per_page});
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
                                itemsCountPerPage: res.data.suppliers.per_page,
                                totalItemsCount: res.data.suppliers.total,
                                activePage: res.data.suppliers.current_page
                            })
                        )
    }

	render() {
		return (
			<div>
				<h1>Supplier</h1>

				<div className="row">
                   <div className="col-sm-12">
                       <Link to={'/supplier/add'} className="btn btn-primary btn-sm pull-right mb-2">
							Add New
						</Link>
                   </div>
                </div>

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.suppliers.length > 0 ? (
                            <Fragment>
                                <SupplierTable
                                    suppliers={this.state.suppliers}
                                    totalCount={this.state.totalCount}
                                    moveToArchives={this.moveToArchives}
                                />

                            {this.state.totalCount.length >= 10 && 

                                <div className="d-flex justify-content-center">
                                     <Pagination
                                        className="pagination"
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                                        onChange={this.handlePageChange}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                    />
                                </div>
                            }
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