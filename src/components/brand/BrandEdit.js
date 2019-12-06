import React, { Component, Fragments } from 'react';
import axios from "axios";
import Spinner from "../layouts/Spinner";
import { Redirect, Link } from "react-router-dom";
import Select from "react-select";

class BrandEdit extends Component {
	state = {
		id: this.props.match.params.id,
		singleBrand: [],
		name_suppliers: [],
		isSearchable: true,
		loading: false,
		redirect: false,
		errors: null
	};
	
	componentDidMount() {
		this.getSingleBrand(this.state.id);
		this.getSelectAll();
	}

	getSingleBrand = async id => {
		this.setState({ loading: true });

		let res = await axios.get(`http://inventory.test/api/admin/brand/${id}`)
								
		this.setState({ singleBrand: {
				name: res.data.brand.name,
				description: res.data.brand.description,
				supplier_id: res.data.brand.supplier_id,
				supplier_name: res.data.brand.supplier_name
			},
			
			loading: false
		});
	}

	// handle input
	handleInputChange = (e) => {
		this.setState({ singleBrand: { ...this.state.singleBrand, [e.target.name]: e.target.value}})
	}

	// handle the select options
	handleSelectInput = selectedOption => {
		console.log(selectedOption);
		this.setState({
			singleBrand: {
				...this.state.singleBrand,
				supplier_id: selectedOption.value,
				supplier_name: selectedOption.label
			}
		});
	};
	

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

	// on submit
	onFormSubmit = (e) => {
		e.preventDefault();
		let brand = this.state.singleBrand;
		let id = this.state.id;
		this.updateSingleBrand(brand, id);
	}

	// update single supplier
	updateSingleBrand = async (brand, id) => {
		let updateData = {
			name: brand.name,
			description: brand.description,
			supplier_id: brand.supplier_id,
			supplier_name: brand.supplier_name
		}

		let res = await axios.put(`http://inventory.test/api/admin/brand/${id}`, updateData)
							switch(res.data.status){
								case 0:
									this.setState({ errors: res.data.errors })
									break;
								case 1:
									this.setState({
										singleBrand: [], 
										loading: false, 
										redirect: true 
									});
									break;
								default:
									break;
							}
		
		this.setState({ loading: false });
	}
	
	render() {

		let supplierOption = this.state.name_suppliers.map(supplier => {
			return {
				id: supplier._id,
				value: supplier._id,
				label: supplier.name,
				name: "supplier_id"
			};
		});

		// console.log(this.state.singleSupplier)
		const { 
			name, 
			description, 
			suppler_id, 
			supplier_name,
			isSearchable } = this.state.singleBrand; 

		if(this.state.loading){
			// loading spinner
			return <Spinner/>
		}else if(this.state.redirect){
			// redirect 
			return <Redirect to='/brand'/>
		}else{
			return(
				<div>
					<div className="mb-2">
						<h2>Edit Brand</h2>
					</div>
					
					<div>
						{this.state.errors && 
					  		<div className="alert alert-danger alert-dismissible fade show" role="alert">
						  		{this.state.errors.map((error,i) => (
									<li key={i}>{error}</li>
								)) }
								<button type="button" className="close" data-dismiss="alert" aria-label="Close">
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
				                  <label className="col-md-3 label-control">Unit</label>
				                  <div className="col-md-9">
				                  		<Select
											defaultValue={suppler_id}
											defaultInputValue={supplier_name}
											placeholder="Select Brand..."
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
				</div>
			)
		} 
		
	}
}

export default BrandEdit;