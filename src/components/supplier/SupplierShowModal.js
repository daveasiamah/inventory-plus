import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

class SupplierShowModal extends Component {
	
	render() {
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
								{this.props.children}
							</div>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default SupplierShowModal