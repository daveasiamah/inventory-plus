import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class SupplierAdd extends Component {
	
	state = {
		supplier: [],
		loading: false,
		redirect: false,
		errors: null,
	}
	
	// handle inputs
	handleInputChange = (e) => this.setState({supplier: { ...this.state.supplier,[e.target.name]: e.target.value } });
	
	// on submit
	onFormSubmit = (e)=> {
		e.preventDefault();
		this.supplierPost(this.state.supplier);
	};
	
	// post the data
	supplierPost = async (supplier) => {
		this.setState({ loading: true });

		let postData = {
			name: supplier.name,
			business_name: supplier.business_name,
			address: supplier.address,
			landline: supplier.landline,
			fax: supplier.fax,
			email: supplier.email,
			mobile: supplier.mobile,
			contact_person: supplier.contact_person,
		}
	
		let res = await axios.post(`http://inventory.test/api/admin/supplier`, postData)
							switch(res.data.status){
								case 0:
									this.setState({ errors: res.data.errors })
									break;
								case 1:
									this.setState({ loading: false, redirect: true });
									break;
								default:
									break;
							}
		
		this.setState({ loading: false });
	}		
	
	render() {

		const { 
			name, 
			business_name, 
			address, 
			landline, 
			fax, 
			email, 
			mobile, 
			contact_person } = this.state.supplier;

		if(this.state.loading){
			// load spinner
			return <Spinner />
		}else if (this.state.redirect){
			// redirect
			return <Redirect to='/supplier' />
		}else{
			return (
				<Fragment>
					<h1>Add Supplier</h1>
						<div>{this.state.errors && this.state.errors.map(error => (
						  		<div class="alert alert-danger alert-dismissible fade show" role="alert">
									<li>{error}</li>
									<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								    	<span aria-hidden="true">&times;</span>
								  	</button>
								</div>
						  	)) }
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
				                  <label className="col-md-3 label-control">Business Name</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="business_name"
				                      name="business_name"
				                      className="form-control"
				                      placeholder="Business Name"
				                      value={business_name}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>


				                <div className="form-group row">
				                  <label className="col-md-3 label-control">Address</label>
				                  <div className="col-md-9">
				                    <textarea
				                      id="address"
				                      name="address"
				                      rows="2"
				                      className="form-control"
				                      placeholder="Address"
				                      value={address}
				                      onChange={this.handleInputChange}
				                    ></textarea>
				                  </div>
				                </div>
								
								<div className="form-group row">
				                  <label className="col-md-3 label-control">Landline</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="landline"
				                      name="landline"
				                      className="form-control"
				                      placeholder="Landline"
				                      value={landline}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>
								
								<div className="form-group row">
				                  <label className="col-md-3 label-control">Fax</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="fax"
				                      name="fax"
				                      className="form-control"
				                      placeholder="Fax"
				                      value={fax}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>

				                <div className="form-group row">
				                  <label className="col-md-3 label-control">Email</label>
				                  <div className="col-md-9">
				                    <input
				                      type="email"
				                      id="email"
				                      name="email"
				                      className="form-control"
				                      placeholder="Email"
				                      value={email}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>


				                <div className="form-group row">
				                  <label className="col-md-3 label-control">Mobile</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="mobile"
				                      name="mobile"
				                      placeholder="Mobile"
				                      className="form-control"
				                      value={mobile}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>

				                <div className="form-group row">
				                  <label className="col-md-3 label-control">Contact Person</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="contact_person"
				                      name="contact_person"
				                      placeholder="Contact Person"
				                      className="form-control"
				                      value={contact_person}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>
				             </div>

				            </section>
				        </div>

			          <div className="row justify-content-end">
			            <div className="mr-2">
			              <div className="form-group">
			                <Link to={'/supplier'} className="btn btn-danger btn-sm mr-1">Cancel</Link>
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

export default SupplierAdd