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
		margin: '4%',
		marginBottom: '0',
	}

	const ModalButton = {
		marginRight: '5px',
		borderColor: '#2B8000',
		backgroundColor: '#2B8000',
		width: '125px',
		fontSize: '11px',
		fontFamily: 'Mulish',
	}


	const ModalTitleDiv = {
		display: 'inline-flex'
	}


	const ModalStatus = {
		marginTop: '6px',
		paddingLeft: '11px'
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
				<Modal.Title id="contained-modal-title-vcenter" style={ModalTitleDiv}>
				Save the date: Be part of the TELUS Days of Giving 
					<h5 style={ModalStatus}><span className='ModalBadge'>Event Ongoing</span></h5>

				</Modal.Title>
				
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

			<Modal.Body className='ModalBody'>
				
				<div className='ModalBodyLeft' style={{width:'auto'}}> <img src ={require('../assets/images/ModalImage.png')} /> </div>
				
				<div className='ModalBodyRight' style={{width:'45%'}}>

					<div className='ModalBodyRightSubDiv1'>
						<p style={{fontSize:'14px'}}>Join us for the TELUS Days of Giving, a special event dedicated to giving back to our community and making a positive impact. This is an opportunity for TELUS employees, partners, and volunteers to come together and contribute their time and skills to various charitable initiatives. </p>
					</div>

					<div className='ModalBodyRightSubDiv'>
						<Button style={ModalButton} >REGISTER</Button>{' '}
						<Button style={ModalButton}>EVENT SURVEY</Button>{' '}
						<a href="https://meet.google.com/"><img style={{marginLeft: '-1%', marginRight: '-1%', width:'43px', height: '33px'}} src ={require('../assets/images/GmeetLogo.png')} /></a>
						<a href="https://calendar.google.com/"><img style={{width:'37px', height: '37px'}} src ={require('../assets/images/GoogleCalendarLogo.png')} /></a>
						<a href="https://calendar.google.com/"><img style={{marginLeft:'10px', marginRight:'5px', width:'17.5px', height: '25px'}} src ={require('../assets/images/BookmarkLogo.png')} /></a>
						<a href="https://calendar.google.com/"><img style={{marginLeft:'5px', marginRight:'5px', width:'23.75px', height: '23.75px'}} src ={require('../assets/images/PolygonLogo.png')} /></a>
					</div>

				</div>
			</Modal.Body>
			
		</Modal>
	)
}

export default EventModal
