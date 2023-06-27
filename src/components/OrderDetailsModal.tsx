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

const OrderModal: React.FC<EventModalProps> = ({ show, onHide }) => {
    
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
					Add / Edit Order
				</Modal.Title>
				
			</Modal.Header>
				
			<hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />
			

			<Modal.Body>
				<Container fluid className='px-5 pb-4'>
					<Row className='mb-3'>
						<Col xs={8}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
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
									<Form.Label>Workday ID</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder=""
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
										/>
							</Form.Group>
						</Col>

					</Row>
					<Row>
						<Col xs={8}>
							<Form.Group>
								<Form.Label>Order</Form.Label>
										<Form.Select aria-label="Default select example" style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
											<option value='jacketHoodie'>TI Digital Solutions Jacket Hoodie</option>
											<option value='tumbler'>TI Digital Solutions Tumbler</option>
											<option value='facemas'>TI Digital Solutions Facemask</option>
											<option value='copTumbler'>Communities of Practice (COP) Tumbler</option>
											<option value='copBag'>Communities of Practice (COP) Bag</option>
											<option value='copMug'>Communities of Practice (COP) RPA Mug</option>
										</Form.Select>
							</Form.Group>
						</Col>	

						<Col>
							<Form.Group>
									<Form.Label>Size</Form.Label>
										<Form.Select aria-label="Default select example" style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
											<option value='XS'>XS</option>
											<option value='S'>S</option>
											<option value='M'>M</option>
											<option value='L'>L</option>
											<option value='XL'>XL</option>
											<option value='XXL'>XXL</option>
											<option value='XXXL'>XXXL</option>
										</Form.Select>
							</Form.Group>
						</Col>

					</Row>
					

					<Row className='justify-content-end' style={{marginTop:'100px'}}>
						{/* <Col xs={9} className='px-5' style={{color:'#9FA2B4'}}>
						</Col> */}

						{/* <Col xs={2}  style={{display:'flex', alignItems:'center', justifyContent:'end', color:'#2B8000'}}>
							<Nav.Link href='' className=''>
								Clear Fields
							</Nav.Link>
						</Col> */}

						<Col xs={3} style={{display:'flex', alignItems:'center', justifyContent:'end'}} >
							<Button variant='success' className='px-4'>
								Add Order
							</Button>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			
		</Modal>
	)
}

export default OrderModal
