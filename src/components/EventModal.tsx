import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'



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
                Save the date: Be part of the TELUS Days of Giving 
					<h5><span className='ModalBadge'>Event Ongoing</span></h5>

				</Modal.Title>
				
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px' }} />

			<Modal.Body className='ModalBody'>
				
				<div className='ModalBodyLeft'> <img src ={require('../assets/images/ModalImage.png')} /> </div>
				
				<div className='ModalBodyRight'>

					<div className='ModalBodyRightSubDiv1'>
						<p>Join us for the TELUS Days of Giving, a special event dedicated to giving back to our community and making a positive impact. This is an opportunity for TELUS employees, partners, and volunteers to come together and contribute their time and skills to various charitable initiatives. </p>
						<p>To participate in the TELUS Days of Giving, please register in advance using the provided registration link or contact the event organizers for more information. </p>
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
