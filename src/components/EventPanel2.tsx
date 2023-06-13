import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventModal from './EventModal'
import 'bootstrap/dist/css/bootstrap.min.css'



export const EventPanel2 = () => {
	const [modalShow, setModalShow] = useState(false)

	const handleOpenModal = () => {
		setModalShow(true)
	  }
	
	  const handleCloseModal = () => {
		setModalShow(false)
	  }


	const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})


	const handleToggle = (eventId:number) => {
		setEventStates((prevState) => ({
			...prevState,
			[eventId]: !prevState[eventId]
		}))
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
		marginLeft: '32px',
		backgroundColor: '#fff',
		border: '1px solid #ccc',
		borderTop: 'none',
		borderBottomRightRadius: '0',
		borderBottomLeftRadius: '0',
		paddingTop: '24px',
		marginRight: '32px',
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
		marginRight: '10px'

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


	const eventContentButtons: React.CSSProperties = {
		padding: '3px 6px',
		fontSize: '14px',
		background: 'none',
		border: 'none',
		color: 'green',
		paddingTop: '18px'
		
	}


	const eventContent = {
		padding: '11px'
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
      
    
	return (
 
		<div style={EventPanelDiv}>
			<div style={TaskPanelSubheader1}>
				<div style={TaskPanelSubheader2Content}> <span id="boot-icon" className='bi bi-plus' style={{ fontSize: '18px', color: 'rgb(128, 128, 128)' }}></span>
					<p style={addNewTaskTypeHereButton}> + Add new task type here </p> </div>
				<div style={TaskPanelSubheader2Content}>
					<Nav.Item>
						<Nav.Link style={TaskPanelSubheader2ContentRgiht} href="/home"><img style={TaskPanelSubheader2ContentRgihtIcons} src ={require('../assets/images/filter.png')} />Filter</Nav.Link>
						<Nav.Link style={TaskPanelSubheader2ContentRgiht} href="/home"><img style={TaskPanelSubheader2ContentRgihtIcons} src ={require('../assets/images/sort-up.png')} />Sort</Nav.Link>
					</Nav.Item>
				</div>
			</div>

			<Container fluid style={{margin: '0', padding: '0'}}>
				<Row style={TitleBar} className='px-3'>
					<Col xs={6}>Title</Col>
					<Col xs={2} className='text-center'>Due Date</Col>
					<Col xs={2} className='text-center'>Importance</Col>
					<Col className='text-center'>Action</Col>
				</Row>
			</Container>

			<ListGroup style={EventPanelContainer}>
				{tasks.map((event) => (
					<ListGroup.Item key={event.id} style={listGroupItem}>
						<Row className='px-3 py-2'>
							<Col xs={6} style={IndItemTitleDisplay} >
								
								<p 			
									onClick={handleOpenModal}
									aria-controls={`example-collapse-text-${event.id}`}
									aria-expanded={eventStates[event.id] ? 'true' : 'false'} className='mb-0'>
									{event.title}
								</p>
								<Button 
									onClick={handleOpenModal}
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

			<EventModal show={modalShow} onHide={handleCloseModal} />
            
		</div>
	)
}
    