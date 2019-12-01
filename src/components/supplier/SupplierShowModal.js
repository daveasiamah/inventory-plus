import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class SupplierShowModal extends Component {
	
	static propTypes = {
		singleSupplier: PropTypes.array.isRequired,
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
			contact_person,
			updated_at,
			created_at } = this.props.singleSupplier; 

		if(this.props.singleSupplier != null){
			return (
				<div
					id="show-modal"
					className="modal fade"
					tabIndex="-1"
					role="dialog"
					>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title"><strong>Complete Information</strong></h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>

							</div>
							<div className="modal-body">
								<div className="container">
									<p><strong>Name:</strong> {name}</p>
									<p><strong>Business Name:</strong>{business_name}</p>
									<p><strong>Address:</strong> {address}</p>
									<p><strong>Landline:</strong> {landline}</p>
									<p><strong>Fax:</strong> {fax}</p>
									<p><strong>Email:</strong> {email}</p>
									<p><strong>Mobile:</strong> {mobile}</p>
									<p><strong>Contact Person:</strong> {contact_person}</p>
									<hr/>
									<p>Created at: {created_at}</p>
									<p>Updated at: {updated_at}</p>
								</div>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
			)
		}else{
			return(
					<div
					id="show-modal"
					className="modal fade"
					tabIndex="-1"
					role="dialog"
					>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title"><strong>Complete Information</strong></h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">×</span>
								</button>

							</div>
							<div className="modal-body">
								<div className="container">
										<Spinner/>
								</div>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default SupplierShowModal