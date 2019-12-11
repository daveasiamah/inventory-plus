import React, {Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';
import Pagination from "react-js-pagination";
import '../layouts/styles/iziToast.css';
import iziToast from 'izitoast';
import AgentTable from './AgentTable';
import AgentSearch from './AgentSearch';

class Agent extends Component {
		
	state = {
		agents: [],
        totalCount: '',
		loading: false,
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 10,
        pageRangeDisplayed: 8
	}

	componentDidMount() {
		this.getAgents();
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
    	
	// fetch all suppliers
    getAgents = async () => {
        this.setState({ loading: true });
        let res = await axios.get(`http://inventory.test/api/admin/agent`);
            this.setState({ 
                agents: res.data.agents.data, 
                totalCount: res.data.agents.total,
                loading: false 
            });
    };
    
    // update archives: 1 if deleted
    moveToArchives = async id => {
        let res = await axios.put(
            `http://inventory.test/api/admin/agent/archives/${id}`);
        // fetch the new updated data
        this.getAgents();
        // alert message
        this.toast(res.data.message);
    };
    
    // pagination links
    handlePageChange = (pageNumber) => {
        // this.setState({activePage: pageNumber});
        axios.get(`http://inventory.test/api/admin/agent?page=${pageNumber}`)
                    .then(res => this.setState({
                                agents: res.data.agents.data,
                                activePage: res.data.agents.current_page,
                                itemsCountPerPage: res.data.agents.per_page,
                                totalItemsCount: res.data.agents.total,
                            })
                        )
    }

    // search 
    searchAgent = async (search) => {
        this.setState({ loading: true});

        let res = await axios.post(`http://inventory.test/api/admin/agent/search`, {
            search: search
        });
        
        this.setState({
             agents: res.data.agents.data,
             totalCount: res.data.agents.total,
             loading: false     
        });        
    }
    
	render() {
		return (
			<div>
				<h1>Agents</h1>

				<div className="row mt-2">
                   <div className="col-sm-12">
                      <h3 className="pull-left">Total: {this.state.totalCount}</h3>
                       
                   </div>
                </div>
                
                <section className="row">
                    <AgentSearch searchAgent={this.searchAgent} getAgents={this.getAgents}/>
                </section>    

				<section className="row">
                    <div className="col-sm-12">
                        {this.state.loading ? (
                            <Spinner />
                        ) : this.state.agents.length  > 0 ? (
                            <Fragment>
                                <AgentTable
                                    agents={this.state.agents}
                                    totalCount={this.state.totalCount}
                                    moveToArchives={this.moveToArchives}
                                    getAgents={this.getAgents}
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

export default Agent