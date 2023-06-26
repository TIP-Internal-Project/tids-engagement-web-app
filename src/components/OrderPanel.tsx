import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OrderModal from './OrderDetailsModal'
import 'bootstrap/dist/css/bootstrap.min.css'



export const OrderPanel= () => {

	const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

	const [detailsModalShow, setDetailsModalShow] = useState(false)

	const handleOpenDetailsModal = () => {
		setDetailsModalShow(true)
	}
	
	const handleCloseDetailsModal = () => {
		setDetailsModalShow(false)
	}



	const tidsBadge = {
		background: '#2A66FF',
		border: '#2A66FF',
		width: '115px',
		height: '30px',
		borderRadius: '8px',
		fontSize: '12px',
		display:'flex',
		alignItems:'center',
		justifyContent: 'center',

	}
	const happyBadge = {
		backgroundColor : '#4B286D',
		border : '#4B286D',
		width: '115px',
		height: '30px',
		borderRadius: '8px',
		fontSize: '12px',
		display:'flex',
		alignItems:'center',
		justifyContent: 'center',

	}
	const copBadge = {
		backgroundColor : '#FF0AE6',
		border : '#FF0AE6',
		width: '115px',
		height: '30px',
		borderRadius: '8px',
		display:'flex',
		alignItems:'center',
		justifyContent: 'center',
		fontSize: '12px'
	}
	const teamBadge = {
		backgroundColor : '#66CC00',
		border: '#66CC00',
		width: '115px',
		height: '30px',
		borderRadius: '8px',
		display:'flex',
		alignItems:'center',
		justifyContent: 'center',
		fontSize: '12px'
	}

	const TitleBar = {
		paddingTop: '24px',
		color:'#9FA2B4'
	}



	const IndItemTitleDisplay = {
		fontFamily: 'Mulish',
		color: '#2A2C2E',
		fontWeight: '700',
		fontSize: '16px',
		lineHeight: '24px',
		FontStyle: 'normal',
		marginBottom: '0',

	}



	const IndItem = {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '28px',
		FontStyle: 'normal',
		color: '#252733',
		
	}

	const IndItemDueTimeDisplay = {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '28px',
		FontStyle: 'normal',
		marginBottom: '0',
		color: '#C5C7CD',
		
	}


	const actionBadge ={
		width: '50%',
		height:'30px',
		borderRadius: '8px',
		display:'flex',
		alignItems:'center',
		justifyContent: 'center',
		fontSize: '12px'

	}



	const viewDetailsButton = {
		padding: '1px 2px',
		fontSize: '11px',
		background: 'none',
		border: 'none',
		color: 'green'
		
	}


  

	// ++++++ task items


	type Order = {
		id : number,
        memberName: string,
		memberWID: string,
		order: string,
		size: string,
		cost: number,
		status: 'Processing' | 'Cancelled' | 'Claimed',
      };
    
	const orders: Order[] = [
		{	id : 1,
			memberName: 'Rochelle Constantino',
			memberWID: '10130674',
			order: 'Telus Merchandise',
			size: 'XL',
			cost: 300,
			status: 'Claimed'
		},
		{	id : 2,
			memberName: 'Kimberly Villarmente',
			memberWID: '1013543',
			order: 'Telus Merchandise',
			size: 'L',
			cost: 750,
			status: 'Claimed'
		},
		{	id : 3,
			memberName: 'Leonardo Tarala',
			memberWID: '10129388',
			order: 'Telus Merchandise',
			size: 'M',
			cost: 600,
			status: 'Claimed'
		},
		{	id : 4,
			memberName: 'Juan Carlo Dizon',
			memberWID: '10234789',
			order: 'Telus Merchandise',
			size: 'XL',
			cost: 300,
			status: 'Processing'
		},
		{	id : 5,
			memberName: 'Jason Constantino',
			memberWID: '1297091',
			order: 'Telus Merchandise',
			size: 'XS',
			cost: 100,
			status: 'Claimed'
		},
		{	id : 6,
			memberName: 'John Paul Maquina',
			memberWID: '12871189',
			order: 'Telus Merchandise',
			size: 'S',
			cost: 500,
			status: 'Processing'
		}
		
	]
      
    
	return (

		<Container fluid style={{backgroundColor:'#f5f5f5', height:'100vh', width:'100%', padding:'32px'}} className='mx-auto'>
			<Container fluid style={{backgroundColor:'white', height:'100%', width:'100%', borderRadius:'20px'}} className='px-0 py-4'>
				
				<Row className='ps-5 pe-2' >
					<Col xs={8} className='px-3' style={{color:'#9FA2B4'}}>
						<Nav.Link className='' onClick={handleOpenDetailsModal}>
							+  New Entry
						</Nav.Link>
					</Col>

					<Col className='text-center' >

					</Col>

					<Col className='text-center'>
						<Nav.Link href='' className=''>
							<img style={{height:'15px', width:'15px', marginRight:'10px'}} src ={require('../assets/images/sort-up.png')} />Sort
						</Nav.Link>
					</Col>

					<Col>
						<Nav.Link href='/home' className=''>
							<img style={{height:'15px', width:'14px', marginRight:'10px'}}src ={require('../assets/images/filter.png')} />Filter
						</Nav.Link>
					</Col>
				</Row>		 


				<Row style={TitleBar} className='px-3'>
		 			<Col xs={3}>Team Member</Col>
					<Col xs={2} className=''>Order</Col>
		 			<Col xs={1} className='text-center'>Size</Col>
					 <Col xs={2} className='text-center ps-0'>Cost (PHP)</Col>
					<Col xs={1} className='ps-0'>Status</Col>
		 			<Col xs={3} className='text-center'>Action</Col>
		 		</Row>
				<ListGroup>
					{orders.map((event) => (
						<ListGroup.Item key={event.id} style={{borderLeft:'none', borderRight:'none', borderRadius:'0px'}} className='px-3'>
							
							<Row className='py-2'>
								<Col xs={3} style={IndItemTitleDisplay} >
									<p 	className='mb-0'>
										{event.memberName}
									</p>
									<Button style={viewDetailsButton} className=''>
											{event.memberWID}
									</Button>
								</Col>

								<Col xs={2} className='' >
									<p style={IndItem} className='mb-0'>{event.order}</p>
								</Col>

								<Col xs={1} className='text-center'>
									<p style={IndItem} className='mb-0'>{event.size}</p>
								</Col>

								<Col xs={2} className='text-center ps-0'>
									<p style={IndItem} className='mb-0'>{event.cost}</p>
								</Col>

								<Col xs={1} className='ps-0' >
									<p style={IndItem} className='mb-0'>{event.status}</p>
								</Col>

								<Col xs={3} style={{display:'flex',  justifyContent:'center', fontSize:'12px'}}>
									<Button className={event.status==='Claimed'? 'bg-secondary border-secondary mx-1 disabled':'bg-danger border-danger mx-1'} style={actionBadge}> CANCEL</Button>
									<Button className={event.status==='Claimed'? 'bg-secondary border-secondary mx-1 disabled':'bg-success border-success mx-1'} style={actionBadge}> CLAIM</Button>
								</Col>
							</Row>
							
						</ListGroup.Item>
						
					))}
				</ListGroup>
	
			</Container>
			<OrderModal show={detailsModalShow} onHide={handleCloseDetailsModal}/>
		</Container>
 

	)
}
    