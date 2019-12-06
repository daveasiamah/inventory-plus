import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Spinner from "../layouts/Spinner";
import axios from 'axios';

class BrandShowModal extends Component {
	

	render() {

		const { 
			name, 
			description, 
			supplier_id,
			supplier_name, 
			created_at,
			updated_at } = this.props.singleBrand; 

		if(this.props.singleBrand != null){
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
									<p><strong>Description:</strong> {description}</p>
									<p><strong>Supplier:</strong> {supplier_name}</p>
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

export default BrandShowModal;