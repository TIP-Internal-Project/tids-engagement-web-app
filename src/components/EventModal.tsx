import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface EventModalProps {
  show: boolean
  onHide: () => void
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide }) => {
    
	const modalStyle = {
		borderBottom: 'none'
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

			<hr style={{ width: '80%', margin: '1rem auto', height: '1px' }} />

			<Modal.Body >
				<h4>Centered Modal</h4>

				<p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
				</p>
				
			</Modal.Body>
			
		</Modal>
	)
}

export default EventModal
