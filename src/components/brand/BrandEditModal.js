import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class BrandEditModal extends Component {
	state = {
		id: this.props.id,
		editBrand: [],	
		loading: false,
		errors: null
	}
	
	componentDidMount() {
		this.setState({ id: this.props.id });
	}

	// handle inputs
	handleInputChange = (e) => this.setState({ editBrand:{ ...this.state.editBrand, [e.target.name]: e.target.value} });

	// on submit
	onFormSubmit = (e) => {
		e.preventDefault();
		let brand = this.state.editBrand;
		let id = this.state.id;
		// console.log(brand);
		// this.updateSingleBrand(brand, id);
	}


	// get the brand base on id
	getSingleBrand = async (id) => {
        let res = await axios.get(`http://inventory.test/api/admin/brand/${id}`)
                            
        this.setState({editBrand: res.data.brand });
        // console.log(res.data.supplier)
    }

    // update single supplier
	updateSingleBrand = async (brand, id) => {
		let updateData = {
			name: brand.name,
			description: brand.description
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
		
		const { name, description } = this.state.editBrand;

		console.log(this.state.id);	

		return (
			<Modal className="modal-container" 
	          show={this.props.show} 
	          onHide={this.props.onHide}
	          animation={true} 
	        >

	          <Modal.Header closeButton>
	            <Modal.Title>Edi Brand</Modal.Title>
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

							<form onKeyPress={e => {if (e.key === "Enter") e.preventDefault()}}
						          onSubmit={e => this.onFormSubmit(e)}>
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

export default BrandEditModal;