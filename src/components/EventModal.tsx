import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface EventModalProps {
  show: boolean
  onHide: () => void
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide }) => {
    
	const modalStyle = {
		borderBottom: '2px solid #e9ecef', // Add a new border style
		width: '85%', // Set the width of the border
		margin: '0 auto', // Center the border horizontally
	}


	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			
		>
			<Modal.Header closeButton style={modalStyle}>
				<Modal.Title id="contained-modal-title-vcenter">
                Save the date: Be part of the TELUS Days of Giving
				</Modal.Title>
			</Modal.Header>
			<Modal.Body >
				<h4>Centered Modal</h4>

				<p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
				</p>
				<hr style={{ width: '50%', margin: '1rem auto' }} />
			</Modal.Body>
			
		</Modal>
	)
}

export default EventModal
