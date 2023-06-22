import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { register } from '../redux/eventRegistrationSlice'
import { fetchUnregisteredEvents } from '../redux/unregisteredEventsSlice'
import { fetchRegisteredEvents } from '../redux/registeredEventsSlice'

interface EventModalProps {
  show: boolean
  onHide: () => void
  modalData: any[]
  disableRegistration: boolean
  email: any
  onSortedEvents: (events: Event[]) => void
  onSortedEvents1: (events: Event[]) => void
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide, modalData, disableRegistration, email, onSortedEvents, onSortedEvents1 }) => {

	const [data, setData] = useState<any>({})
	const [disable, setDisable] = useState<any>()
	const dispatch = useAppDispatch()
	
	useEffect(()=>{
		setData(modalData)
	}, [modalData])

	useEffect(()=> {
		setDisable(disableRegistration)
	}, [modalData])

	const handleRegister = async (eventId: any, email: any) => {
		await dispatch(register({ eventId, email }))
		const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
		const registeredEventsArray = Object.values(registeredEventsData.payload)
		const sortedRegisteredEvents = registeredEventsArray.sort(
			(a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
		)
		onSortedEvents1(sortedRegisteredEvents as Event[])
		const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
		const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
		const sortedUnregisteredEvents = unregisteredEventsArray.sort(
			(a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
		)
		onSortedEvents(sortedUnregisteredEvents as Event[])
	}

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
				{data.title}
				{/* <h5 style={ModalStatus}><span className='ModalBadge'>Event Ongoing</span></h5> */}
				</Modal.Title>
				
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

			<Modal.Body className='ModalBody'>
				
				<div className='ModalBodyLeft' style={{width:'auto'}}> <img src ={require('../assets/images/ModalImage.png')} /> </div>
				
				<div className='ModalBodyRight' style={{width:'45%'}}>

					<div className='ModalBodyRightSubDiv1'>
						<p style={{fontSize:'14px'}}>{data.detail}</p>
					</div>

					<div className='ModalBodyRightSubDiv'>
						<Button style={ModalButton} disabled={disable} onClick={() => handleRegister(data.eventId, email)}>REGISTER</Button>{' '}
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
