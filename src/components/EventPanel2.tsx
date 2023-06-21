import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventModal from './EventModal'
import DetailsModal from './DetailsModal'
import 'bootstrap/dist/css/bootstrap.min.css'



export const EventPanel2 = () => {
	const [eventModalShow, setEventModalShow] = useState(false)

	const handleOpenEventModal = () => {
		setEventModalShow(true)
	  }
	
	  const handleCloseEventModal = () => {
		setEventModalShow(false)
	  }

	const [detailsModalShow, setDetailsModalShow] = useState(false)

	const handleOpenDetailsModal = () => {
		setDetailsModalShow(true)
	}
	
	const handleCloseDetailsModal = () => {
		setDetailsModalShow(false)
	}


	const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})



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

	const EventPanelDiv = {
		backgroundColor:'#f5f5f5',
		borderTopLeftRadius: '6px',
	    borderTopRightRadius: '6px',
		paddingTop: '62px'
	}


	const EventPanelContainer = {
		marginLeft: '32px',
		marginRight: '32px',
		borderRadius: 'none'
	}

	const listGroupItem = {
		borderTopLeftRadius: '0',
		borderTopRightRadius: '0'
	}


	const TaskPanelSubheader2ContentRgihtIcons = {
		width: '18px',
		heigth: '19px',
	}


	const TaskPanelSubheader2Content: React.CSSProperties = {
		flex: '1',
		textAlign: 'left',
		

	}

	const TaskPanelSubheader2ContentRgiht: React.CSSProperties = {
		flex: '1',
		float: 'right',
		margin: '20px'
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

	const IndItemDueDate: React.CSSProperties = {      
	}

	const IndItemDueDateDisplay = {
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
		width: '115px',
		height:'30px',
		borderRadius: '8px',
		display:'flex',
		alignItems:'center',
		justifyContent: 'center',
		fontSize: '12px'

	}


	const TaskPanelSubheader1: React.CSSProperties = {
		display: 'flex',
		marginLeft: '32px',
		backgroundColor: '#fff',
		marginRight: '32px',
		border: '1px solid #ccc',
	    borderRadius: '2px',
		borderBottom: 'none',
		borderBottomRightRadius: '0',
		borderBottomLeftRadius: '0',
		borderTopRightRadius: '17px',
		borderTopLeftRadius: '17px',
		
		
	}


	const viewDetailsButton = {
		padding: '1px 2px',
		fontSize: '11px',
		background: 'none',
		border: 'none',
		color: 'green'
		
	}


	const addNewTaskTypeHereButton = {
		fontFamily: 'Mulish',
		fontWeight: '400',
		fontSize: '16px',
		lineHeight: '24px',
		FontStyle: 'normal',
		marginBottom: '0',
		marginTop: '25px',
		color: '#71757B',
		paddingLeft: '28px'
        
	}

  

	// ++++++ task items


	type Event = {
        id: number;
        title: string;
        date: string;
        time: string;
        category: string;
        importance: 'Required' | 'Optional';
      };
    
	const tasks: Event[] = [
		{
			id: 1,
			title: 'Save the date: Be part of the TELUS Days of Giving',
			date: 'August 25, 2022',
			time: '12:00 PM',
			category: '#HAPPYHERE',
			importance: 'Required',
		},
		{
			id: 2,
			title: 'Open Web-Session | BigQuery GCP | 31st',
			date: 'August 25, 2022',
			time: '6:30 PM',
			category: 'TIDS',
			importance: 'Optional',
		},

		{
			id: 3,
			title: 'HappyHereFlipTIP Intersite Competition',
			date: 'October 23, 2022',
			time: '12:00 PM',
			category: '#HAPPYHERE',
			importance: 'Required',
		},
		{
			id: 4,
			title: 'DevOps CoP: Call for Video Content',
			date: 'August 23, 2022',
			time: '12:00 PM',
			category: 'TEAM EVENT',
			importance: 'Required',
		},
		{
			id: 5,
			title: 'Learning from the Experts: Evolution of Communication',
			date: 'August 23, 2022',
			time: '12:00 PM',
			category: 'TIDS',
			importance: 'Optional',
		},

		{
			id: 6,
			title: 'Simple Wellness: Find the Beat',
			date: 'August 23, 2022',
			time: '12:00 PM',
			category: 'COP',
			importance: 'Optional',
		}		
	]
      
	const registered: Event[] = [
	]
	
    
	return (

		<Container fluid style={{backgroundColor:'#f5f5f5', height:'100vh', width:'100%', padding:'32px'}} className='mx-auto'>
			<Container fluid style={{backgroundColor:'white', height:'100%', width:'100%', borderRadius:'20px'}} className='px-0 py-4'>
				
				<Row className='px-2' >
					<Col xs={8} className='px-5' style={{color:'#7175B'}}>
						<Nav.Link className='' onClick={handleOpenDetailsModal}>
							+  Add new event here
						</Nav.Link>
					</Col>

					<Col className='text-center' >

						<Nav.Link href='' className=''>
							<img style={{height:'22px', width:'19px', marginRight:'10px'}} src ={require('../assets/images/refresh.png')} />Refresh
						</Nav.Link>

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
				{/* <div className="d-flex flex-row-reverse px-5">
					<Nav.Link href='/home' className='mx-3 '>
						<img style={{height:'15px', width:'14px', marginRight:'10px'}}src ={require('../assets/images/filter.png')} />Filter
					</Nav.Link>

					<Nav.Link href='/home' className='mx-3 '>
						<img style={{height:'15px', width:'15px', marginRight:'10px'}} src ={require('../assets/images/sort-up.png')} />Sort
					</Nav.Link>

					<Nav.Link href='/home' className='mx-3'>
						<img style={{height:'22px', width:'19px', marginRight:'10px'}} src ={require('../assets/images/refresh.png')} />Refresh
					</Nav.Link>

					

					
				</div> */}

				<Row style={TitleBar} className='px-5'>
		 			<Col>Currently Registered</Col>
		 		</Row>

				 {registered.length > 0 ? (
					<ListGroup>
						{registered.map((event) => (
							<ListGroup.Item key={event.id} style={{borderLeft:'none', borderRight:'none', borderRadius:'0px'}} className='px-5'>
								
								<Row className='py-2'>
									<Col xs={6} style={IndItemTitleDisplay} >
										<p 			
											onClick={handleOpenEventModal}
											aria-controls={`example-collapse-text-${event.id}`}
											aria-expanded={eventStates[event.id] ? 'true' : 'false'} className='mb-0'>
											{event.title}
										</p>
										<Button 
											onClick={handleOpenEventModal}
											style={viewDetailsButton}
											aria-controls={`example-collapse-text-${event.id}`}
											aria-expanded={eventStates[event.id] ? 'true' : 'false'}>View details
										</Button>
									</Col>

									<Col xs={2} style={IndItemDueDate} className='text-center' >
										<div style={{display:'inline-block', textAlign:'left'}}>
											<p style={IndItemDueDateDisplay} className='mb-0'>{event.date}</p>
											<p style={IndItemDueTimeDisplay} >{event.time}</p>
										</div>
										
									</Col>

									<Col xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}} >

										<Button style={event.category ==='TIDS'? tidsBadge : event.category ==='TEAM EVENT'? teamBadge : event.category ==='COP'? copBadge : happyBadge} className='py-2'>
											{event.category}
										</Button>

									</Col>
									<Col style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}}>
										<Button className='bg-success border-success' style={actionBadge}> REGISTER</Button>
									</Col>
								</Row>
								
							</ListGroup.Item>
							
						))}
					</ListGroup>
				):(
					<div style={{borderTop:'0.5px solid #9FA2B4', textAlign:'center', color:'#9FA2B4', paddingTop:'10px'}}>No Events</div>
				)}


				<Row style={TitleBar} className='px-5'>
		 			<Col xs={6}>Title</Col>
					<Col xs={2} className='text-center'>Due Date</Col>
		 			<Col xs={2} className='text-center'>Importance</Col>
		 			<Col className='text-center'>Action</Col>
		 		</Row>
				<ListGroup>
					{tasks.map((event) => (
						<ListGroup.Item key={event.id} style={{borderLeft:'none', borderRight:'none', borderRadius:'0px'}} className='px-5'>
							
							<Row className='py-2'>
								<Col xs={6} style={IndItemTitleDisplay} >
									<p 			
										onClick={handleOpenEventModal}
										aria-controls={`example-collapse-text-${event.id}`}
										aria-expanded={eventStates[event.id] ? 'true' : 'false'} className='mb-0 ps-4'>
										{event.title}
									</p>
									<Button 
										onClick={handleOpenEventModal}
										style={viewDetailsButton}
										aria-controls={`example-collapse-text-${event.id}`}
										aria-expanded={eventStates[event.id] ? 'true' : 'false'} className='ms-4'>View details
									</Button>
								</Col>

								<Col xs={2} style={IndItemDueDate} className='text-center' >
									<div style={{display:'inline-block', textAlign:'left'}}>
										<p style={IndItemDueDateDisplay} className='mb-0'>{event.date}</p>
										<p style={IndItemDueTimeDisplay} >{event.time}</p>
									</div>
									
								</Col>

								<Col xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}} >

									<Button style={event.category ==='TIDS'? tidsBadge : event.category ==='TEAM EVENT'? teamBadge : event.category ==='COP'? copBadge : happyBadge} className='py-2'>
										{event.category}
									</Button>

								</Col>
								<Col style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}}>
									<Button className='bg-success border-success' style={actionBadge}> REGISTER</Button>
								</Col>
							</Row>
							
						</ListGroup.Item>
						
					))}
				</ListGroup>
				<EventModal show={eventModalShow} onHide={handleCloseEventModal} />
				<DetailsModal show={detailsModalShow} onHide={handleCloseDetailsModal}/>
			</Container>
		</Container>
 
		// <div>
		// 	<Container fluid style={EventPanelDiv}>
		// 		<Row>
		// 			Hi
		// 		</Row>
		// 		<Row style={TitleBar} className='px-3'>
		// 			<Col>Currently Registered</Col>
		// 		</Row>

				// <ListGroup style={EventPanelContainer}>
				// 	{registered.map((event) => (
				// 		<ListGroup.Item key={event.id} style={listGroupItem}>
				// 			<Row className='px-3 py-2'>
				// 				<Col xs={6} style={IndItemTitleDisplay} >
				// 					<p 			
				// 						onClick={handleOpenModal}
				// 						aria-controls={`example-collapse-text-${event.id}`}
				// 						aria-expanded={eventStates[event.id] ? 'true' : 'false'} className='mb-0'>
				// 						{event.title}
				// 					</p>
				// 					<Button 
				// 						onClick={handleOpenModal}
				// 						style={viewDetailsButton}
				// 						aria-controls={`example-collapse-text-${event.id}`}
				// 						aria-expanded={eventStates[event.id] ? 'true' : 'false'}>View details
				// 					</Button>
				// 				</Col>

				// 				<Col xs={2} style={IndItemDueDate} className='text-center' >
				// 					<div style={{display:'inline-block', textAlign:'left'}}>
				// 						<p style={IndItemDueDateDisplay} className='mb-0'>{event.date}</p>
				// 						<p style={IndItemDueTimeDisplay} >{event.time}</p>
				// 					</div>
									
				// 				</Col>

				// 				<Col xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}} >

				// 					<Button style={event.category ==='TIDS'? tidsBadge : event.category ==='TEAM EVENT'? teamBadge : event.category ==='COP'? copBadge : happyBadge} className='py-2'>
				// 						{event.category}
				// 					</Button>

				// 				</Col>
				// 				<Col style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}}>
				// 					<Button className='bg-success border-success' style={actionBadge}> REGISTER</Button>
				// 				</Col>
				// 			</Row>
							
				// 		</ListGroup.Item>
						
				// 	))}
				// </ListGroup>

				

		// 		<Row style={TitleBar} className='px-3'>
		// 			<Col xs={6}>Title</Col>
		// 			<Col xs={2} className='text-center'>Due Date</Col>
		// 			<Col xs={2} className='text-center'>Importance</Col>
		// 			<Col className='text-center'>Action</Col>
		// 		</Row>
			

		// 		<ListGroup style={EventPanelContainer}>
		// 			{tasks.map((event) => (
		// 				<ListGroup.Item key={event.id} style={listGroupItem}>
		// 					<Row className='px-3 py-2'>
		// 						<Col xs={6} style={IndItemTitleDisplay} >
									
		// 							<p 			
		// 								onClick={handleOpenModal}
		// 								aria-controls={`example-collapse-text-${event.id}`}
		// 								aria-expanded={eventStates[event.id] ? 'true' : 'false'} className='mb-0'>
		// 								{event.title}
		// 							</p>
		// 							<Button 
		// 								onClick={handleOpenModal}
		// 								style={viewDetailsButton}
		// 								aria-controls={`example-collapse-text-${event.id}`}
		// 								aria-expanded={eventStates[event.id] ? 'true' : 'false'}>View details
		// 							</Button>
		// 						</Col>

		// 						<Col xs={2} style={IndItemDueDate} className='text-center' >
		// 							<div style={{display:'inline-block', textAlign:'left'}}>
		// 								<p style={IndItemDueDateDisplay} className='mb-0'>{event.date}</p>
		// 								<p style={IndItemDueTimeDisplay} >{event.time}</p>
		// 							</div>
									
		// 						</Col>

		// 						<Col xs={2} style={{display:'flex', alignItems:'center', justifyContent:'center'}} >

		// 							<Button style={event.category ==='TIDS'? tidsBadge : event.category ==='TEAM EVENT'? teamBadge : event.category ==='COP'? copBadge : happyBadge} className='py-2'>
		// 								{event.category}
		// 							</Button>

		// 						</Col>
		// 						<Col style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}}>
		// 							<Button className='bg-success border-success' style={actionBadge}> REGISTER</Button>
		// 						</Col>
		// 					</Row>
							
		// 				</ListGroup.Item>
						
		// 			))}
		// 		</ListGroup>
		// 	</Container>

			// <EventModal show={modalShow} onHide={handleCloseModal} />
            
		// </div>
	)
}
    