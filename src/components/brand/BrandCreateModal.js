import React, { Fragment, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

class BrandCreateModal extends Component {
	state = {
		loading: false,
		errors: null,
		name: '',
		description: '',
	}

	static propTypes = {
		onHide: PropTypes.func.isRequired,
		getBrands: PropTypes.func.isRequired,
	};

	// handle inputs
	handleInputChange = (e) => this.setState({[e.target.name]: e.target.value });

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
									this.setState({ 
										loading: false,  
										name: '',
										description: '',
										errors: null
									});
									// hide the modal
									this.props.onHide();
									// get th new brands
									this.props.getBrands();
									break;
								default:
									break;
							}
		
		this.setState({ loading: false });
	}	

	render() {

		const { name, description } = this.state; 

		return (
			<Modal className="modal-container" 
	          show={this.props.show} 
	          onHide={this.props.onHide}
	          animation={true} 
	        >

	          <Modal.Header closeButton>
	            <Modal.Title>Create New</Modal.Title>
	          </Modal.Header>

	          <Modal.Body>
           			{ this.state.loading ? 
							<div>
								<h3 
									align="center"
									className="my-5">
									Loading Please wait...
								</h3>
							</div>
						: 
							<div>
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

								<form onSubmit={e => this.onFormSubmit(e)}>
						            <section className="row">
						              <div className="col-sm-12">
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
							                <label className="col-md-3 label-control">Description:</label>
							                <div className="col-md-9">
							                    <textarea
							                      id="description"
							                      name="description"
							                      rows="3"
							                      className="form-control"
							                      placeholder="Description"
							                      value={description}
							                      onChange={this.handleInputChange}
							                    ></textarea>
							                </div>
						                </div>
						             </div>
						            </section>

							          <div className="row justify-content-end">
							            <div className="mr-2">
							              <div className="form-group">
							                <Button
												type="button"
												className="btn btn-sm btn-danger"
												onClick={this.props.onHide}
											>
											 Cancel
											</Button>
											{" "}
							                <button type="submit" className="btn btn-primary btn-sm">
							                  Save
							                </button>
							              </div>
							            </div>
							          </div>
								</form>
							</div>
						}	
	          </Modal.Body>   
	    	</Modal> 
		)
	}
}

export default BrandCreateModal;