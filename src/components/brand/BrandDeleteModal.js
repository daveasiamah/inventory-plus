import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class BrandDeleteModal extends Component {
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
	      			<h3>Are you sure?</h3>
	      		<Button 
	      			className="btn btn-primary my-2"
	      			onClick={conFirmMoveToArchives}>
	            	Confirm
	         	</Button>
	      		</div>

	        </Modal.Body>
	      </Modal>
		)
	}
}

export default BrandDeleteModal;