import React, { Component, Fragments } from 'react';
import axios from "axios";
import Spinner from "../layouts/Spinner";
import { Redirect, Link } from "react-router-dom";

class CategoryEdit extends Component {
	state = {
		id: this.props.match.params.id,
		singleCategory: [],
		loading: false,
		redirect: false,
		errors: null
	};
	
	componentDidMount() {
		this.getSingleCategory(this.state.id);
	}

	getSingleCategory = async id => {
		this.setState({ loading: true });

		let res = await axios.get(`http://inventory.test/api/admin/category/${id}`)
								.catch(err => console.log(err));
				
		this.setState({singleCategory: {
				name: res.data.category.name,
				description: res.data.category.description,
				unit: res.data.category.unit,
				attributes: res.data.category.attributes.split(","),
			},

			loading: false
		});
	}

	// handle input
	handleInputChange = (e) => {
		this.setState({ singleCategory: { ...this.state.singleCategory, [e.target.name]: e.target.value}})
	}
	
	// on submit
	onFormSubmit = (e) => {
		e.preventDefault();
		let category = this.state.singleCategory;
		let id = this.state.id;
		this.updateSingleCategory(category, id);
	}

	// update single category
	updateSingleCategory = async (category, id) => {
		let updateData = {
			name: category.name,
			description: category.description,
			unit: category.unit,
			attributes: category.attributes.toString()
		}

		let res = await axios.put(`http://inventory.test/api/admin/category/${id}`, updateData)
							switch(res.data.status){
								case 0:
									this.setState({ errors: res.data.errors })
									break;
								case 1:
									this.setState({
										singleCategory: [], 
										loading: false, 
										redirect: true 
									});
									break;
								default:
									break;
							}
		
		this.setState({ loading: false });
	}
	

	// Adding brand attributes
	addTag = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			const value = e.target.value;

			// check the duplicate value in array
			if (
				this.state.singleCategory.attributes.find(
					tag => tag.toLowerCase() === value.toLowerCase()
				)
			) {
				return;
			}
			let newTag = this.state.singleCategory.attributes.concat(value);
			this.setState({
				singleCategory: {
					...this.state.singleCategory,
					["attributes"]: newTag
				}
			});
			e.target.value = "";
		}
	};

	removeTag = id => {
		// console.log(id)
		const attributes = this.state.singleCategory.attributes;
		attributes.splice(id, 1);
		this.setState({ attributes: attributes });
	};
	
	render() {

		const { 
			name, 
			description, 
			unit, 
			attributes } = this.state.singleCategory; 

		if(this.state.loading){
			// loading spinner
			return <Spinner/>
		}else if(this.state.redirect){
			// redirect 
			return <Redirect to='/category'/>
		}else{
			return(
				<div>
					<div className="mb-2">
						<h2>Edit Category</h2>
					</div>
					
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
				                  <label className="col-md-3 label-control">Unit</label>
				                  <div className="col-md-9">
				                    <input
				                      type="text"
				                      id="unit"
				                      name="unit"
				                      className="form-control"
				                      placeholder="unit"
				                      value={unit}
				                      onChange={this.handleInputChange}
				                    />
				                  </div>
				                </div>
								

								<div className="form-group row">
									<label className="col-md-3 label-control">
										Attributes
									</label>
									<div className="col-md-9">
										<div className="form-group">
											<ul className="containerUl float">
												{attributes ? (
													attributes.map(
														(tag, index) => (
															<li
																className="item float-item"
																key={index}
															>
																<span className="badge badge-primary">
																	{tag}
																	<button
																		type="button"
																		className="btn btn-primary btn-sm"
																		onClick={e =>
																			this.removeTag(
																				index
																			)
																		}
																	>
																		<i className="icon la la-times"></i>
																	</button>
																</span>
															</li>
														)
													)
												) : (
													<span>No Tags</span>
												)}
											</ul>
											<input
												type="text"
												className="form-control"
												placeholder="Enter Attributes"
												name="attributes"
												onKeyUp={e =>
													this.addTag(e)
												}
												onKeyPress={e => {
													if (e.key === "Enter")
														e.preventDefault();
												}}
											/>
										</div>
									</div>
								</div>
				             </div>

				            </section>
				        </div>

			          <div className="row justify-content-end">
			            <div className="mr-2">
			              <div className="form-group">
			                <Link to={'/category'} className="btn btn-danger btn-sm mr-1">Cancel</Link>
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

export default CategoryEdit;