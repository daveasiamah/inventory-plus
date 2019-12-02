import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import BrandTable from './BrandTable';
import BrandSearch from './BrandSearch';

class Brand extends Component {
		
	state = {
		brands: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
	}

	componentDidMount() {
		this.getBrands();
	}
    	
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
            `http://inventory.test/api/admin/brand/archives/${id}`);
        // fetch the new updated data
        this.getBrands();
    };
    
    // pagination links
    handlePageChange = (pageNumber) => {
        // this.setState({activePage: pageNumber});
        axios.get(`http://inventory.test/api/admin/brand?page=${pageNumber}`)
                    .then(res => this.setState({
                                brands: res.data.brands.data,
                                activePage: res.data.brands.current_page,
                                itemsCountPerPage: res.data.brands.per_page,
                                totalItemsCount: res.data.brands.total,
                            })
                        )
    }


    // search 
    searchBrand = async (search) => {
        this.setState({ loading: true});

        let res = await axios.post(`http://inventory.test/api/admin/brand/search`, {
            search: search
        });
        
        this.setState({
             brands: res.data.brands.data,
             totalCount: res.data.brands.total,
             loading: false     
        });        
    }
    
	render() {
		return (
			<div>
				<h1>Brands</h1>

				<div className="row mt-2">
                   <div className="col-sm-12">
                      <h3 className="pull-left">Total: {this.state.totalCount}</h3>
                       
                   </div>
                </div>
                
                <section className="row">
                    <BrandSearch searchSupplier={this.searchBrand}/>
                </section>    

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.brands.length  > 0 ? (
                            <Fragment>
                                <BrandTable
                                    brands={this.state.brands}
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

export default Brand