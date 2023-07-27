import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import { addTask, AddTaskState } from '../redux/addTaskSlice'
import {fetchTasks} from '../redux/taskSlice'

interface EventModalProps {
  show: boolean
  onHide: () => void
  addedTasks: (orders: AddTaskState) => void
}

const AddTaskModal: React.FC<EventModalProps> = ({ show, onHide, addedTasks }) => {
    
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

	const datePickerStyles = {
		backgroundColor: '#DEDEDE',
		borderRadius: '25px',
	}
	
	const [titleError, setTitleError] = useState('')
	const [timeError, setTimeError] = useState('')
	const [detailsError, setDetailsError] = useState('')

	const dispatch = useAppDispatch()
	const [buttonClicked, setButtonClicked] = useState(false)

	const [time, setTime] = useState()
	let newTime

	const [formValues, setFormValues] = useState({
		title: '',
		dueDate: new Date(),
		time: '',
		details: '',
		workdayLink: '',
		myGrowthLink: '',
		importance: 'Required',
		createdDate: new Date(),
		createdBy: sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')
	})

	const handleInputChange = async (event: any) => {

		let name : any, value : any

		console.log(event)
		if (event.target) {
			name = event.target.name
			value = event.target.value
		} else {
			name = 'time'
			await setTime(event)
			newTime = event
			console.log(time)
			console.log('newTime')
			console.log(newTime)
			console.log(convertTo12HourFormat(newTime))
			value = convertTo12HourFormat(newTime)
		}
		if (name === 'dueDate') {
		  const dateValue = new Date(value)
		  setFormValues((prevFormValues) => ({
			...prevFormValues,
			[name]: dateValue,
		  }))
		} else {
		  setFormValues((prevFormValues) => ({
			...prevFormValues,
			[name]: value,
		  }))
		}
	}

	const handleAddTask = () => {
		setTitleError('')
 		setTimeError('')
  		setDetailsError('')

  		let hasError = false

		if (formValues.title.trim() === '') {
			setTitleError('Title is required.')
			hasError = true
		}

		if (formValues.time === null || formValues.time.trim() === '') {
			setTimeError('Time is required.')
			hasError = true
		}

		if (formValues.details.trim() === '') {
			setDetailsError('Details are required.')
			hasError = true
		}

		if (hasError) {
			return
		}

		setButtonClicked(true)
	}

	const handleModalHide = () => {
		setFormValues({
			title: '',
			dueDate: new Date(),
			time: '',
			details: '',
			workdayLink: '',
			myGrowthLink: '',
			importance: 'Required',
			createdDate: new Date(),
			createdBy: sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')
		})
		onHide()
	}

	useEffect(() => {
		if (buttonClicked){
			dispatch(addTask(formValues))
			.then(() => dispatch(fetchTasks()))
			.then((resultAction) => {
			if (resultAction.type === fetchTasks.fulfilled.type) {
				const newTasks = resultAction.payload as AddTaskState
				addedTasks(newTasks)
				setButtonClicked(false)
				setFormValues({title: '',
					dueDate: new Date(),
					time: '',
					details: '',
					workdayLink: '',
					myGrowthLink: '',
					importance: 'Required',
					createdDate: new Date(),
					createdBy: sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')})
			}
		})
		}
	}, [buttonClicked])

	console.log(formValues.time)

	const getCurrentTime = () => {
		const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }).split('T')[0]
		if (formValues.dueDate.toISOString().split('T')[0] === today) {
			const now = new Date()
			const timezone = 'Asia/Manila'
			const timeOptions = {
			timeZone: timezone,
			hour12: true,
			}
		
			const formattedTime = now.toLocaleString('en-PH', timeOptions)
			const [date, time] = formattedTime.split(', ')
		
			return new Date(`${date} ${time}`)
		}

		const minTime = new Date()
		minTime.setHours(0)
		minTime.setMinutes(0)
		minTime.setSeconds(0)
		minTime.setMilliseconds(0)
		return minTime
	}

	const getMaxTime = () => {
		// You can set the maximum allowed time here. For example, if you want to allow times up to 23:59 (11:59 PM), use:
		const maxTime = new Date()
		maxTime.setHours(23)
		maxTime.setMinutes(59)
		maxTime.setSeconds(0)
		maxTime.setMilliseconds(0)
		return maxTime
	}

	const convertTo12HourFormat = (time: any) => {
		if (!(time instanceof Date) || isNaN(time.getTime())) {
			return '' // Handle the case when the time is not a valid Date object
		}
		
		const hours = time.getHours()
		const minutes = time.getMinutes()
	
		const amOrPm = hours >= 12 ? 'PM' : 'AM'
		const twelveHourFormatHours = hours % 12 || 12
	
		const formattedTime = `${twelveHourFormatHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`
		return formattedTime
	}

	const formattedTime = convertTo12HourFormat(time)

	return (
		<Modal
			show={show}
			onHide={handleModalHide}
			size="xl"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton style={modalStyle}>
				<Modal.Title id="contained-modal-title-vcenter" className='mx-3' style={ModalTitleDiv}>
					Add Task
				</Modal.Title>
			</Modal.Header>
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />
			<Modal.Body>
				<Container fluid className='px-5 pb-4'>
					<Row className='mb-3'>
						<Col xs={4}>
							<Form.Group>
								<Form.Label>Title</Form.Label>
									<Form.Control
										required
										type="text"
										placeholder=""
										name="title"
          								value={formValues.title}
          								onChange={handleInputChange}
										style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
									/>
									{titleError && <div className="text-danger">{titleError}</div>}
							</Form.Group>
						</Col>	
						<Col>
							<Form.Group>
									<Form.Label>Due Date</Form.Label>
										<Form.Control
											required
											type="date"
											placeholder=""
											name="dueDate"
											value={formValues.dueDate.toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }).split('T')[0]}
											onChange={handleInputChange}
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											min={new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }).split('T')[0]}
										/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label>Time</Form.Label>
								<div style={{width: '-webkit-fill-available'}}>
									<DatePicker
										name="time"
										value={formValues.time}
										onChange={handleInputChange}
										showTimeSelect
										showTimeSelectOnly
										timeFormat="h:mm aa"
										minTime={getCurrentTime()}
										maxTime={getMaxTime()}
										className="custom-timepicker form-control"
										autoComplete="off"
									/>
								</div>
								{timeError && <div className="text-danger">{timeError}</div>}
							</Form.Group>
						</Col>
					</Row>
					<Row className='my-4'>
						<Col xs={4}>
							<Form.Group>
								<Form.Label>Details</Form.Label>
									<Form.Control
											required
											as="textarea"
											placeholder=""
											name="details"
											value={formValues.details}
											onChange={handleInputChange}
											style={{backgroundColor:'#DEDEDE', height:'116px', borderRadius:'25px'}}
										/>
										{detailsError && <div className="text-danger">{detailsError}</div>}
							</Form.Group>
						</Col>	
						<Col xs={4}>
								<Row className=''>
									<Form.Group>
										<Form.Label>Workday Link</Form.Label> 
										<div className="d-flex align-items-center">
											<Form.Control
												required
												type="text"
												placeholder=""
												name="workdayLink"
												value={formValues.workdayLink}
												onChange={handleInputChange}
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}	
											/>
										</div>
									</Form.Group>
								</Row>
								<Row className='mt-2'>
									<Form.Group>
										<Form.Label>Importance</Form.Label> 
										<div className="d-flex align-items-center">
											<Form.Select aria-label="Default select example" name="importance" value={formValues.importance} onChange={handleInputChange} style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
												<option value='Required'>Required</option>
												<option value='Optional'>Optional</option>
											</Form.Select>
										</div>
										
									</Form.Group>
								</Row>
							</Col>
							<Col>
								<Form.Group>
										<Form.Label>MyGrowth Link</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder=""
												name="myGrowthLink"
												value={formValues.myGrowthLink}
												onChange={handleInputChange}
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											/>
								</Form.Group>
							</Col>
					</Row>

					<Row className='justify-content-end' style={{marginTop:'100px'}}>
						<Col xs={8} className='px-5' style={{color:'#9FA2B4'}}>
						</Col>
						<Col xs={2} className='text-center' style={{width: '100px', display:'flex', alignItems:'center', justifyContent:'center',color:'#2B8000'}}>
							<Nav.Link href='' className='' style={{width: '-webkit-fill-available', fontSize: '14px'}}>
								Clear Fields
							</Nav.Link>
						</Col>
						<Col xs={2} style={{width: '116px', display:'flex', alignItems:'center', justifyContent:'end'}}>
							<Button variant='success' onClick={handleAddTask} style={{width: '-webkit-fill-available', borderColor: '#2B8000', backgroundColor: '#2B8000', fontSize: '11px'}}>
								ADD TASK
							</Button>
              
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			
		</Modal>
	)
}

export default AddTaskModal