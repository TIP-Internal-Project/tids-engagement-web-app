import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { register } from '../redux/eventRegistrationSlice'
import { fetchUnregisteredEvents } from '../redux/unregisteredEventsSlice'
import { fetchRegisteredEvents } from '../redux/registeredEventsSlice'
import { addStarPoints } from '../redux/addStarPointsSlice'
import { fetchGeolocation } from '../redux/geolocationSlice'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'

interface RegistrationModalProps {
    show: boolean
    onHide: () => void
    email: any
    modalData: any[]
    onSortedEvents: (events: Event[]) => void
    onSortedEvents1: (events: Event[]) => void
  }

const RegistrationModal: React.FC<RegistrationModalProps>  = ({ show, onHide, modalData, email, onSortedEvents, onSortedEvents1 }) => {

  const [selectedOption, setSelectedOption] = useState('Virtual')

  const [data, setData] = useState<any>({})

  const dispatch = useAppDispatch()

  useEffect(()=>{
    setData(modalData)
}, [modalData])

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
    height: '29px'
}


const ModalTitleDiv = {
    display: 'inline-flex'
}


const ModalStatus = {
    marginTop: '6px',
    paddingLeft: '11px'
}


const qrCodeTitle = {
    backgroundColor: '#5a8d37',
    width: '160px',
    padding: '11px',
    borderStyle: 'ridge',
    marginBottom: '1px'
    
}

const handleRegister = async (eventId: any, email: any, pointsToAdd: any, attendanceType: any) => {
    const geoLocation = await dispatch(fetchGeolocation())
    const location = geoLocation.payload
    const registrationDate = new Date()
    console.log(attendanceType)
    await dispatch(register({ eventId, email, location, attendanceType, registrationDate }))
    const employeeName = localStorage.getItem('givenName') + ' ' + localStorage.getItem('familyName')
    await dispatch(addStarPoints({ employeeName, pointsToAdd }))
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
    onHide()
}

  return (
    <Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			
			<Modal.Header closeButton style={modalStyle}>
				<Modal.Title id="contained-modal-title-vcenter" style={ModalTitleDiv}>Welcome to the event! 
				</Modal.Title>
				
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

			<Modal.Body className='ModalBody'>
				<Container fluid className='px-5'>
                Select your attendance mode:
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} style={{right: '2%', marginLeft: '5%'}}>
                        <option value="Virtual">Virtual</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Offsite">Offsite</option>
                    </select>
				<Row className='justify-content-end' style={{marginTop:'30px'}}>
                <Col xs={3}  style={{display:'flex', alignItems:'center', justifyContent:'end', color:'#2B8000', marginRight: '2%'}}>
						<Button variant="primary" className='px-4' onClick={onHide} style={{backgroundColor:'#c12335', borderColor:'#c12335'}}>
							Cancel
						</Button>
					</Col>
					<Col xs={3} style={{display:'flex', alignItems:'center', justifyContent:'end', marginLeft: '2%'}} >
						<Button variant="danger" className='px-4' onClick={() => handleRegister(data.eventId, email, data.starsNum, selectedOption)} style={{backgroundColor:'rgb(43, 128, 0)', borderColor:'rgb(43, 128, 0)'}}>
                            Register
						</Button>
					</Col>
				</Row>
				</Container>
			</Modal.Body>
			
		</Modal>
  )
}

export default RegistrationModal