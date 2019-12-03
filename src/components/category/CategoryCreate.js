import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class CategoryCreate extends Component {
	
	state = {
		name: '',
		description: '',
		unit: '',
		attributes: [],
		loading: false,
		redirect: false,
		errors: null,
	}
	
	// handle inputs
	handleInputChange = (e) => this.setState({ ...this.state.category,[e.target.name]: e.target.value });
	
	// on submit
	onFormSubmit = (e)=> {
		e.preventDefault();
		let data = {
			name: this.state.name,
			description: this.state.description,
			unit: this.state.unit,
			attributes: this.state.attributes.toString()
		}

		this.categoryPost(data);
	};
	
	// post the data
	categoryPost = async (brand) => {
		this.setState({ loading: true });

		let res = await axios.post(`http://inventory.test/api/admin/category`, brand)
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

	// Adding category
	addTag = e => {
	    if (e.key === "Enter" && e.target.value !== "") {
	      const value = e.target.value;

	      // check the duplicate value in array
	      if (
	        this.state.attributes.find(
	          tag => tag.toLowerCase() === value.toLowerCase()
	        )
	      ) {
	        return;
	      }
	      let newTag = this.state.attributes.concat(value);
	      this.setState({ attributes: newTag });
	      e.target.value = "";
	    }
	 };
	
	// remove category
	removeTag = id => {
	    // console.log(id)
	    const tags = this.state.attributes;
	    tags.splice(id, 1);
	    this.setState({ attributes: tags });
	};
	
	render() {

		const { 
			name, 
			description, 
			unit, 
			attributes } = this.state;

		if(this.state.loading){
			// load spinner
			return <Spinner />
		}else if (this.state.redirect){
			// redirect
			return <Redirect to='/category' />
		}else{
			return (
				<Fragment>
					<h1>Add Category</h1>
					<div>{this.state.errors && this.state.errors.map((error, i) => (
					  		<div className="alert alert-danger alert-dismissible fade show" role="alert">
								<li key={i}>{error}</li>
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
						                          attributes.map((attribute, index) => (
						                            <li className="item float-item" key={index}>
						                              <span className="badge badge-primary">
						                                {attribute}
						                                <button
						                                  type="button"
						                                  className="btn btn-primary btn-sm"
						                                  onClick={e => this.removeTag(index)}
						                                >
						                                  <i className="icon la la-times"></i>
						                                </button>
						                              </span>
						                            </li>
						                          ))
						                        ) : (
						                          <span>No Tags</span>
						                        )}
						                    </ul>
						                    <input
						                        type="text"
						                        className="form-control"
						                        placeholder="Enter Attributes"
						                        name="attributes"
						                        onKeyUp={e => this.addTag(e)}
						                        onKeyPress={e => {
						                          if (e.key === "Enter") e.preventDefault();
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
				</Fragment>
			)
		}
	}
}

export default CategoryCreate;