import React from 'react'
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
										style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
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
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
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
										style={{backgroundColor:'#DEDEDE', height:'116px', borderRadius:'25px'}}
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
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											
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
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
											
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
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
										/>
							</Form.Group>
						</Col>

						<Col xs={4}>
							<Form.Group>
									<Form.Label>Category</Form.Label>
									<Form.Select aria-label="Default select example" style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
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
									<Form.Select aria-label="Default select example" style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
										<option value='required'>Required</option>
										<option value='optional'>Optional</option>
									</Form.Select>
							</Form.Group>
						</Col>

					</Row>

					<Row className='mt-4 mb-5'>
						<Col xs={4}>
							<Form.Group>
									<Form.Label>Google Meet Link</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder=""
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
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
										/>
							</Form.Group>
						</Col>

					</Row>

					<Row className='' style={{marginTop:'150px'}}>
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
