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
	      	onHide={onHide}
	      	animation={true}
	      >
	        <Modal.Header closeButton>
	          <Modal.Title>Brand Information</Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
	      		<div>
	      			<h4>Name: {name}</h4>
	      			<h4>Description: {description}</h4>
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