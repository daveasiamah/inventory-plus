import React, { Component, Fragments } from 'react';
import axios from "axios";
import Spinner from "../layouts/Spinner";
import { Redirect, Link } from "react-router-dom";

class SupplierEdit extends Component {
	state = {
		id: this.props.match.params.id,
		singleSupplier: [],
		loading: false,
		redirect: false,
		errors: null
	};
	
	componentDidMount() {
		this.getSingleSupplier(this.state.id);
	}

	getSingleSupplier = async id => {
		this.setState({ loading: true });

		let res = await axios.get(`http://inventory.test/api/admin/supplier/${id}`)
								.catch(err => console.log(err));
				
		this.setState({singleSupplier: {
				name: res.data.supplier.name,
				business_name: res.data.supplier.business_name,
				address: res.data.supplier.address,
				landline: res.data.supplier.landline,
				fax: res.data.supplier.fax,
				email: res.data.supplier.email,
				mobile: res.data.supplier.mobile,
				contact_person: res.data.supplier.contact_person,
			},
			loading: false
		});
	}

	// handle input
	handleInputChange = (e) => {
		this.setState({ singleSupplier: { ...this.state.singleSupplier, [e.target.name]: e.target.value}})
	}
	
	// on submit
	onFormSubmit = (e) => {
		e.preventDefault();
		let supplier = this.state.singleSupplier;
		let id = this.state.id;
		this.updateSingleSupplier(supplier, id);
	}

	// update single supplier
	updateSingleSupplier = async (supplier, id) => {
		let res = await axios.put(`http://inventory.test/api/admin/supplier/${id}`, {
			name: supplier.name,
			business_name: supplier.business_name,
			address: supplier.address,
			landline: supplier.landline,
			fax: supplier.fax,
			email: supplier.email,
			mobile: supplier.mobile,
			contact_person: supplier.contact_person
		})
			
		this.setState({singleSupplier: [], loading: false, redirect: true })
	}
	
	
	render() {
		// console.log(this.state.singleSupplier)
		const { name, business_name, address, landline, fax, email, mobile, contact_person, archives } = this.state.singleSupplier; 

		if(this.state.loading){
			// loading spinner
			return <Spinner/>
		}else if(this.state.redirect){
			// redirect 
			return <Redirect to='/supplier'/>
		}else{
			return(
				<div>
					<div className="mb-2">
						<h2>Edit Supplier</h2>
					</div>
					
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
				</div>
			)
		} 
		
	}
}

export default SupplierEdit