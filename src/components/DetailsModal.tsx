	import React, { ChangeEvent, useState } from 'react'
	import Button from 'react-bootstrap/Button'
	import Row from 'react-bootstrap/Row'
	import Container from 'react-bootstrap/Container'
	import Col from 'react-bootstrap/Col'
	import Modal from 'react-bootstrap/Modal'
	import Form from 'react-bootstrap/Form'
	import InputGroup from 'react-bootstrap/InputGroup'
	import Nav from 'react-bootstrap/Nav'



	interface EventModalProps {
	show: boolean
	onHide: () => void
	}

	const EventModal: React.FC<EventModalProps> = ({ show, onHide }) => {

		const [formData, setFormData] = useState({
			eventTitle: '',
			venueDetails: '',
			details: '',
			startDate: '',
			endDate: '',
			eventCode: '',
			category: '',
			importance: '',
			googleMeetLink: '',
			postSurveyLink: '',
			starsToEarn: '',
			registrationLink: '',
		  })
		
		  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target
			setFormData((prevFormData) => ({
			  ...prevFormData,
			  [name]: value,
			}))

		  }

		  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
			const { name, value } = event.target
			setFormData((prevFormData) => ({
			  ...prevFormData,
			  [name]: value,
			}))

		  }


		const generateQr = () => {
			if (formData.registrationLink === ''){
				alert('Please enter a registration link')
				return
			}
			console.log(formData.registrationLink)	
			const clickQR = document.getElementById('clickQR')
			const eventQR = document.getElementById('eventQR') as HTMLImageElement
			if (clickQR) {
				clickQR.style.display = 'none'
			  }

			if (eventQR){
				eventQR.src ='https://quickchart.io/qr?text="'+ formData.registrationLink + '"'
				eventQR.style.display = ''
			}
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
					<Modal.Title id="contained-modal-title-vcenter" className='mx-3' style={ModalTitleDiv}>
						Add / Edit Event
					</Modal.Title>
					
				</Modal.Header>
					
				<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />
				

				<Modal.Body>
					<Container fluid className='px-5 pb-4'>
						<Row>
							<Col xs={8}>
								<Form.Group>
									<Form.Label>Event Title</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder=""
											name="eventTitle"
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											onChange={handleFormChange}
										/>
								</Form.Group>
							</Col>	

							<Col>
								<Form.Group>
										<Form.Label>Venue Details</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder=""
												name="venueDetails"
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
												onChange={handleFormChange}
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
											type="text"
											placeholder=""
											name="details"
											style={{backgroundColor:'#DEDEDE', height:'116px', borderRadius:'25px'}}
											onChange={handleFormChange}
										/>
								</Form.Group>
							</Col>

							<Col xs={4}>
								<Form.Group>
									<Form.Label>Upload Photo</Form.Label>
										<Form.Control
											id="imageInput"
											required
											type="file"
											placeholder=""
											style={{backgroundColor:'#DEDEDE', height:'116px', display:'none'}}
										/>
										<br />
										<label 
											style={{height:'116px', backgroundColor:'#DEDEDE', borderRadius:'25px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}} 
											htmlFor="imageInput">
											<img src ={require('../assets/images/image.png')} style={{width:'40px', height:'40px'}}  />
										</label>
								</Form.Group>
							</Col>

							<Col xs={4}>
								<Row className=''>
									<Form.Group>
										<Form.Label>Start Date / Time</Form.Label> 
										<div className="d-flex align-items-center">


											<Form.Control
												required
												type="date"
												placeholder=""
												name="startDate"
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
												onChange={handleFormChange}
												
											/>

										</div>
										
									</Form.Group>
								</Row>
								<Row className='mt-2'>
									<Form.Group>
										<Form.Label>End Date / Time</Form.Label> 
										<div className="d-flex align-items-center">

											<Form.Control
												required
												type="date"
												placeholder=""
												name="endDate"
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
												onChange={handleFormChange}
												
											/>

										</div>
										
									</Form.Group>
								</Row>
							</Col>

						</Row>
							
						<Row>
							<Col xs={4}>
								<Form.Group>
										<Form.Label>Event Code</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder=""
												name="eventCode"
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
												onChange={handleFormChange}
											/>
								</Form.Group>
							</Col>

							<Col xs={4}>
								<Form.Group>
										<Form.Label>Category</Form.Label>

										<Form.Select 
											aria-label="Default select example" 
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											name="category"
											onChange={handleSelectChange}
											>
											<option value='TIDS'>TIDS</option>
											<option value='happyhere'>#HAPPYHERE</option>
											<option value='happyhere'>Team Event</option>
											<option value='happyhere'>COP</option>
										</Form.Select>

								</Form.Group>
							</Col>

							<Col xs={4}>
								<Form.Group>
										<Form.Label>Importance</Form.Label>
										<Form.Select 
											aria-label="Default select example" 
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											name="importance"
											onChange={handleSelectChange}
											>
											<option value='required'>Required</option>
											<option value='optional'>Optional</option>
										</Form.Select>
								</Form.Group>
							</Col>

						</Row>

						<Row className='mt-4 mb-4'>
							<Col xs={4}>
								<Form.Group>
										<Form.Label>Google Meet Link</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder=""
												name = "googleMeetLink"
												onChange={handleFormChange}
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											/>
								</Form.Group>
							</Col>

							<Col xs={4}>
								<Form.Group>
										<Form.Label>Post Survey Link</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder=""
												name = "postSurveyLink"
												onChange={handleFormChange}
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											/>
								</Form.Group>
							</Col>

							<Col xs={4}>
								<Form.Group>
										<Form.Label># of Stars to earn</Form.Label>
											<Form.Control
												required
												type="text"
												placeholder=""
												name = "starsToEarn"
												onChange={handleFormChange}
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											/>
								</Form.Group>
							</Col>

						</Row>
						<Row>
							<Col xs={8}>
								<Form.Group>
										<Form.Label>Registration Link</Form.Label>
											<Form.Control
												required
												id="regLink"
												type="text"
												placeholder=""
												name = "registrationLink"
												onChange={handleFormChange}
												style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											/>
								</Form.Group>
							</Col>
							<Col style={{display:'flex', alignItems:'end', justifyContent:'center'}}>
								<p id="clickQR" style={{fontFamily:'Mulish', textDecoration:'underline'}} onClick={generateQr}>
									Click to generate Event QR 
								</p>
								<img id="eventQR" src="https://quickchart.io/qr?text=%27facebook.com%27" alt="" style={{display:'none'}} />
							</Col>


						</Row>

						<Row className='' style={{marginTop:'100px'}}>
							<Col xs={6} className='px-5' style={{color:'#9FA2B4'}}>
							</Col>

							<Col xs={2} className='text-center' style={{display:'flex', alignItems:'center', justifyContent:'center', color:'#2B8000'}} >

								<Nav.Link href='' className=''>
									Preview
								</Nav.Link>

							</Col>

							<Col xs={2} className='text-center' style={{display:'flex', alignItems:'center', justifyContent:'center',color:'#2B8000'}}>
								<Nav.Link href='' className=''>
									Clear Fields
								</Nav.Link>
							</Col>

							<Col xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
								<Button variant='success' className='px-4'>
									Add Task
								</Button>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				
			</Modal>
		)
	}

	export default EventModal
