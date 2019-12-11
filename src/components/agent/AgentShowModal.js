import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class SupplierShowModal extends Component {
	
	render() {
		const { 
			singleAgent: {
				name, 
				business_name,
				address,
				landline,
				fax,
				email,
				mobile,
				contact_person,
				created_at, 
				updated_at 
			}, 
			show, 
			onHide 
		} = this.props;

		return (
	      <Modal 
	      	className="modal-container"
	      	show={show}
	      	size="sm"
	      	onHide={onHide}
	      	animation={true}
	      >
	        <Modal.Header closeButton>
	          <Modal.Title>Supplier Information</Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
	      		<div>
	      			<div className="mb-1"><strong>Name: </strong>{name}</div>
	      			<div className="mb-1"><strong>Business Name: </strong>{business_name}</div>
	      			<div className="mb-1"><strong>Address: </strong>{address}</div>
	      			<div className="mb-1"><strong>Landline: </strong>{landline}</div>
	      			<div className="mb-1"><strong>Fax: </strong>{fax}</div>
	      			<div className="mb-1"><strong>Email: </strong>{email}</div>
	      			<div className="mb-1"><strong>Mobile: </strong>{mobile}</div>
	      			<div className="mb-1"><strong>Contact Person: </strong>{contact_person}</div>
	      			<hr />
	      			<div><strong>Created at: </strong>{created_at}</div>
	      			<div><strong>Updated at: </strong>{updated_at}</div>
	      		</div>
	        </Modal.Body>
	        <Modal.Footer>
	              <Button 
	              	variant="danger btn-sm" 
	              	onClick={this.props.onHide}
	              >
		          	  Close
		          </Button>
	        </Modal.Footer>
	      </Modal>
		)
	}
}


export default SupplierShowModal