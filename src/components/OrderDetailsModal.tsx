import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import { addOrder } from '../redux/addOrderSlice'
import { OrderState, fetchOrders } from '../redux/orderSlice'


interface EventModalProps {
  show: boolean
  onHide: () => void
  addedOrders: (orders: OrderState) => void
}

const OrderModal: React.FC<EventModalProps> = ({ show, onHide, addedOrders }) => {
    
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
	
	const dispatch = useAppDispatch()
	const [buttonClicked, setButtonClicked] = useState(false)

	const [formValues, setFormValues] = useState({
		workdayId: '',
		name: '',
		orderName: 'TI Digital Solutions Jacket Hoodie',
		orderSize: 'XS',
		orderCost: 1000,
		status: 'Processing',
		createdBy: sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')
	})

	const handleInputChange = (event: any) => {
		const { name, value } = event.target
		setFormValues((prevValues) => ({
		  ...prevValues,
		  [name]: value,
		}))
	}

	const handleAddOrder = async () => {
		const orderName = formValues.orderName
	
		let orderCost = 0
		let orderSize = ''
		if (orderName === 'TI Digital Solutions Jacket Hoodie') {
			orderCost = 1000
			orderSize = formValues.orderSize
		} else if (orderName === 'TI Digital Solutions Tumbler') {
			orderCost = 500
			orderSize = ''
		} else if (orderName === 'TI Digital Solutions Facemask') {
			orderCost = 250
			orderSize = ''
		} else if (orderName === 'Communities of Practice (COP) Tumbler') {
			orderCost = 500
			orderSize = ''
		} else if (orderName === 'Communities of Practice (COP) Bag') {
			orderCost = 800
			orderSize = ''
		} else if (orderName === 'Communities of Practice (COP) RPA Mug') {
			orderCost = 150
			orderSize = ''
		}
	
		await setFormValues((prevValues) => ({
		  ...prevValues,
		  orderSize,
		  orderCost,
		}))

		setButtonClicked(true)
	
	}

	const handleModalHide = () => {
		setFormValues({
		  workdayId: '',
		  name: '',
		  orderName: 'TI Digital Solutions Jacket Hoodie',
		  orderSize: 'XS',
		  orderCost: 1000,
		  status: 'Processing',
		  createdBy: sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')
		})
		onHide()
	  }

	useEffect(() => {
		if (buttonClicked){
			dispatch(addOrder(formValues))
			.then(() => dispatch(fetchOrders()))
			.then((resultAction) => {
			if (resultAction.type === fetchOrders.fulfilled.type) {
				const newOrders = resultAction.payload as OrderState
				addedOrders(newOrders)
				setButtonClicked(false)
				setFormValues({workdayId: '', name: '', orderName: 'TI Digital Solutions Jacket Hoodie', orderSize: 'XS', orderCost: 1000, status: 'Processing', createdBy: sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')})
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
					Add Order
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
										name="name"
          								value={formValues.name}
          								onChange={handleInputChange}
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
											name="workdayId"
											value={formValues.workdayId}
											onChange={handleInputChange}
											style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}
										/>
							</Form.Group>
						</Col>

					</Row>
					<Row>
						<Col xs={8}>
							<Form.Group>
								<Form.Label>Order</Form.Label>
										<Form.Select aria-label="Default select example" name="orderName" value={formValues.orderName} onChange={handleInputChange} style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
											<option>TI Digital Solutions Jacket Hoodie</option>
											<option>TI Digital Solutions Tumbler</option>
											<option>TI Digital Solutions Facemask</option>
											<option>Communities of Practice (COP) Tumbler</option>
											<option>Communities of Practice (COP) Bag</option>
											<option>Communities of Practice (COP) RPA Mug</option>
										</Form.Select>
							</Form.Group>
						</Col>	

						<Col>
						{formValues.orderName === 'TI Digital Solutions Jacket Hoodie' && (
							<Form.Group>
									<Form.Label>Size</Form.Label>
										<Form.Select aria-label="Default select example" name="orderSize" value={formValues.orderSize} onChange={handleInputChange} style={{backgroundColor:'#DEDEDE', borderRadius:'25px'}}>
											<option value='XS'>XS</option>
											<option value='S'>S</option>
											<option value='M'>M</option>
											<option value='L'>L</option>
											<option value='XL'>XL</option>
											<option value='XXL'>XXL</option>
											<option value='XXXL'>XXXL</option>
										</Form.Select>
							</Form.Group>
						)}
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
							<Button variant='success' className='px-4' onClick={handleAddOrder} disabled={!formValues.name || !formValues.workdayId}>
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
