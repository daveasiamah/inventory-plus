import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class CategoryShowModal extends Component {

	render() {

		const { 
			singleCategory: {
				name,
				parent_category, 
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
	          <Modal.Title>Category Information</Modal.Title>
	        </Modal.Header>
			
	        <Modal.Body>
	      		<div>
	      			<div className="mb-1"><strong>Name: </strong>{name}</div>
	      			<div className="mb-1"><strong>Parent Category: </strong>{parent_category}</div>
	      			<div className="mb-1"><strong>Description: </strong>{description}</div>
	      			<hr />
	      			<div><strong>Created at:</strong> {created_at}</div>
	      			<div><strong>Updated at:</strong> {updated_at}</div>
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

export default CategoryShowModal;