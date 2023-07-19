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

	// const date = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila', hour12: false }).toString().slice(11, 16)
	// console.log(date)
	
	const dispatch = useAppDispatch()
	const [buttonClicked, setButtonClicked] = useState(false)

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

	const handleInputChange = (event: any) => {
		const { name, value } = event.target
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
									<Form.Control
										required
										type="time"
										placeholder=""
										name="time"
										value={formValues.time}
										style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
										onChange={handleInputChange}
										
									/>
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