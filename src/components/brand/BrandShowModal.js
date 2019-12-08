import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class BrandShowModal extends Component {
	
	render() {
		const { 
			singleBrand: {
				name, 
				description, 
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
	          <Modal.Title>Brand Information</Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
	      		<div>
	      			<div><strong>Name: </strong>{name}</div>
	      			<div><strong>Description: </strong>{description}</div>
	      			<hr />
	      			<div>Created at: {created_at}</div>
	      			<div>Updated at: {updated_at}</div>
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

export default BrandShowModal;