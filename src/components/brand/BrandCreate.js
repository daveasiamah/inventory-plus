import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import Select from "react-select";
import axios from 'axios';

class BrandAdd extends Component {
	
	state = {
		name: '',
		description: '',
		supplier_id: '',
		supplier_name: '',
		name_suppliers: [],
		isSearchable: true,
		loading: false,
		redirect: false,
		errors: null,
	}

	componentDidMount() {
		this.getSelectAll();
	}
	
	// handle inputs
	handleInputChange = (e) => this.setState({ ...this.state.brand,[e.target.name]: e.target.value });
	
	// handle the select options
	handleSelectInput = selectedOption => {
		console.log(selectedOption.value)
		this.setState({ supplier_id: selectedOption.value, supplier_name: selectedOption.label })
	};
	
	// on submit
	onFormSubmit = (e)=> {
		e.preventDefault();
		let data = {
			name: this.state.name,
			description: this.state.description,
			supplier_id: this.state.supplier_id,
			supplier_name: this.state.supplier_name,
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
									break;
								default:
									break;
							}
		
		this.setState({ loading: false });
	}		
	

	// get all the select options
	getSelectAll = async () => {
		let res = await axios.get(
			"http://inventory.test/api/admin/product/select/detail"
		);

		switch (res.data.status) {
			case 0:
				// nothing for now
				break;
			case 1:
				this.setState({
					name_suppliers: res.data.suppliers
				});
				break;
			default:
				break;
		}
	};
	

	render() {

		const { 
			name, 
			description, 
			isSearchable } = this.state;

		let supplierOption = this.state.name_suppliers.map(supplier => {
			return { value: supplier._id, label: supplier.name , name: 'supplier_id'};
		});

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
								
								<div className="form-group row">
				                    <label className="col-md-3 label-control">
				                    	Supplier
				                    </label>
					                <div className="col-md-9">
										<Select
											placeholder="Select Supplier..."
											isSearchable={isSearchable}
											onChange={
												this.handleSelectInput
											}
											options={supplierOption}
										/>
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