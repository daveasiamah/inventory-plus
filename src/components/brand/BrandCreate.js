import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class BrandAdd extends Component {
	
	state = {
		name: '',
		description: '',
		loading: false,
		redirect: false,
		errors: null,
	}

	// handle inputs
	handleInputChange = (e) => this.setState({ ...this.state.brand,[e.target.name]: e.target.value });

	// on submit
	onFormSubmit = (e)=> {
		e.preventDefault();
		let data = {
			name: this.state.name,
			description: this.state.description,
		}

		this.brandPost(data);
	};
	
	// post the data
	brandPost = async (brand) => {
		this.setState({ loading: true });

		let res = await axios.post(`http://inventory.test/api/admin/brand`, brand)
							switch(res.data.status){
								case 0:
									this.setState({ errors: res.data.errors })
									break;
								case 1:
									this.setState({ loading: false, redirect: true });
									this.props.onHide();
									break;
								default:
									break;
							}
		
		this.setState({ loading: false });
	}		
	

	render() {

		const { 
			name, 
			description } = this.state;

		if(this.state.loading){
			// load spinner
			return <Spinner />
		}else if (this.state.redirect){
			// redirect
			return <Redirect to='/brand' />
		}else{
			return (
				<Fragment>
					<h1>Add Brand</h1>
					<div>
						{this.state.errors && 
					  		<div className="alert alert-danger alert-dismissible fade show" role="alert">
						  		{this.state.errors.map((error,i) => (
									<li key={i}>{error}</li>
								)) }
								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
							    	<span aria-hidden="true">&times;</span>
							  	</button>
							</div>
					  	}
					</div>

					 <form onKeyPress={e => {if (e.key === "Enter") e.preventDefault()}}
				          onSubmit={e => this.onFormSubmit(e)}>
						<div className="card card-body">
				            <section className="row">

				              <div className="col-sm-8">
				                <div className="form-group row">
				                  <label className="col-md-3 label-control">Name:</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="name"
				                      name="name"
				                      className="form-control"
				                      placeholder="Name"
				                      value={name}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>

				                <div className="form-group row">
				                  <label className="col-md-3 label-control">Description</label>
				                  <div className="col-md-9">
				                    <textarea
				                      id="description"
				                      name="description"
				                      rows="2"
				                      className="form-control"
				                      placeholder="description"
				                      value={description}
				                      onChange={this.handleInputChange}
				                    ></textarea>
				                  </div>
				                </div>
				             </div>
				            </section>
				        </div>

			          <div className="row justify-content-end">
			            <div className="mr-2">
			              <div className="form-group">
			                <Link to={'/brand'} className="btn btn-danger btn-sm mr-1">Cancel</Link>
			                <button type="submit" className="btn btn-primary btn-sm">
			                  Save
			                </button>
			              </div>
			            </div>
			          </div>
					</form>
				</Fragment>
			)
		}
	}
}

export default BrandAdd