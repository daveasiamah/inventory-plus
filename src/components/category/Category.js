import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import CategoryTable from './CategoryTable';
import CategorySearch from './CategorySearch';

class Category extends Component {
		
	state = {
		categories: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
	}

	componentDidMount() {
		this.getCategory();
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
        // fetch the new updated data
        this.getCategory();
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
    
	render() {
		return (
			<div>
				<h1>Category</h1>

				<div className="row mt-2">
                   <div className="col-sm-12">
                      <h3 className="pull-left">Total: {this.state.totalCount}</h3>
                       
                   </div>
                </div>
                
                <section className="row">
                    <CategorySearch 
                        searchCategory={this.searchCategory}
                        getCategory={this.getCategory}
                    />
                </section>    

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.categories.length  > 0 ? (
                            <Fragment>
                                <CategoryTable
                                    categories={this.state.categories}
                                    totalCount={this.state.totalCount}
                                    moveToArchives={this.moveToArchives}
                                    getCategory={this.getCategory}
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

export default Category