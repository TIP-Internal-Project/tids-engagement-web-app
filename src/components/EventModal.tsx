import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'


interface EventModalProps {
  show: boolean
  onHide: () => void
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide }) => {
    
	const modalStyle = {
		border: 'none', // Add a new border style
		marginLeft: '40px',
		marginRight: '40px'
	}

	const ModalButton = {
		backgroundColor: '#2B8000'
	}



	return (
		<Modal
			show={show}
			onHide={onHide}
			size="xl"
			
			aria-labelledby="contained-modal-title-vcenter"
			centered
			
			
		>
			
			<Modal.Header closeButton style={modalStyle}>
				<Modal.Title id="contained-modal-title-vcenter">
                Save the date: Be part of the TELUS Days of Giving   <Badge bg="danger"> ongoing
        
      	</Badge>{' '}
				</Modal.Title>
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px' }} />

			<Modal.Body className='ModalBody'>
				
				<div className='ModalBodyLeft'> <img src ={require('../assets/images/ModalImage.png')} /> </div>
				
				<div className='ModalBodyRight'>

					<div className='ModalBodyRightSubDiv1'>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat commodo ipsum, in sodales velit molestie ac. Sed semper risus nec metus iaculis consequat. </p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat commodo ipsum, in sodales velit molestie ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
						
					</div>

					<div className='ModalBodyRightSubDiv'>
						<Button style={ModalButton} >REGISTER</Button>{' '}
						<Button style={ModalButton}>SURVEY</Button>{' '}
						<img src ={require('../assets/images/GoogleMeetLogo.png')} />
						<img src ={require('../assets/images/GoogleCalendarLogo.png')} />
						<img className='bookmarklogo' src ={require('../assets/images/BookmarkLogo.png')} />
						<img className='bookmarklogo' src ={require('../assets/images/PolygonLogo.png')} />
					</div>

				</div>


				

			
			</Modal.Body>
			
		</Modal>
	)
}

export default EventModal
