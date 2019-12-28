import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class POShowModal extends Component {
	
	render() {
		const { 
			singlePO: {
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
	          <Modal.Title>Purchase Order</Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
	      		<div>
					
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

export default POShowModal;