import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class CustomerDeleteModal extends Component {
	render() {
		const { id, conFirmMoveToArchives } = this.props;
		
		return (
	      <Modal 
	      	className="modal-container"
	      	show={this.props.show} 
	      	onHide={this.props.onHide}
	      	size="sm"
	      	animation={true}
	      >
	        <Modal.Header closeButton>
	          <Modal.Title></Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
	        
	      		<div align="center">
	      			<h4>Are you sure?</h4>
	      		<Button 
	      			className="btn btn-primary mb-2 mt-1"
	      			onClick={conFirmMoveToArchives}>
	            	Confirm
	         	</Button>
	      		</div>

	        </Modal.Body>
	      </Modal>
		)
	}
}

export default CustomerDeleteModal;