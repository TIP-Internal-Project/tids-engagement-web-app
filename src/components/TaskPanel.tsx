



import { BiPlus  } from 'react-icons/bi'
import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'


export const TaskPanel = () => {


	const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})


	const handleToggle = (eventId:number) => {
		setEventStates((prevState) => ({
			...prevState,
			[eventId]: !prevState[eventId]
		}))
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

	const EventStyle = {
		color: 'black'
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



	const TaskPanelSubheader2ContentTitle: React.CSSProperties = {
		textAlign: 'left',
		paddingLeft: '31px',
		paddingBottom: '8px',
		width: '605px'
		

	}


	const TaskPanelSubheader2ContentAction: React.CSSProperties = {		

	}

	const TaskPanelSubheader2ContentDueDate: React.CSSProperties = {
		
		textAlign: 'left',
		paddingLeft: '15px',
		width: '401px'
		

	}


	const TaskPanelSubheader2ContentImportance: React.CSSProperties = {
		
		width: '312px'
	
      
	}


	const IndItemTitle: React.CSSProperties = {
		
		textAlign: 'left',
		paddingLeft: '10px',
		width: '605px'
    
	}

	const IndItemTitleDisplay = {
		fontFamily: 'Mulish',
		color: '#2A2C2E',
		fontWeight: '700',
		fontSize: '16px',
		lineHeight: '24px',
		FontStyle: 'normal',
		marginBottom: '0',
		width: 'fit-content'

	}


	const IndItemTitleDiv = {
		

	}
    
	const IndItemDueDate: React.CSSProperties = {
		
		textAlign: 'left',
		width: '401px'
		
      
	}

	const IndItemDueDateDisplay = {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '28px',
		FontStyle: 'normal',
		marginBottom: '0',
		marginTop: '9px',
		color: '#252733',
		
		
	}

	const IndItemDueTimeDisplay = {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '28px',
		FontStyle: 'normal',
		marginBottom: '0',
		color: '##C5C7CD',
		
	}

	const IndItemImportance: React.CSSProperties = {
		
		textAlign: 'left',
		width:'312px'
      
	}

	const IndImportanceBadge = {
		width: '84px',
		height: '28px',
		borderRadius: '11px',
		paddingTop: '9px',
	}




	const IndItemAction: React.CSSProperties = {
		
		paddingLeft: '21px'
      
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

	const TaskPanelSubheader2: React.CSSProperties = {
		display: 'flex',
		marginLeft: '32px',
		backgroundColor: '#fff',
		marginRight: '32px',
		border: '1px solid #ccc',
	   
		borderTop: 'none',
		borderBottomRightRadius: '0',
		borderBottomLeftRadius: '0',
		paddingTop: '24px'

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


	const taskContentTitle = {
        

	}



  

	// ++++++ task items


	type Task = {
        id: number;
        title: string;
        dueDate: string;
        dueTime: string;
        content: string;
        importance: 'Required' | 'Optional';
      };
    
	const tasks: Task[] = [
		{
			id: 1,
			title: '[Health] Quebec Clinic Pages',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Required',
		},
		{
			id: 2,
			title: 'MyCare Refresh Launch',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Optional',
		},

		{
			id: 3,
			title: 'Internet Superiority 2022',
			dueDate: 'July 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Required',
		},
		{
			id: 4,
			title: 'HomePro Landing Page',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Required',
		},
		{
			id: 5,
			title: 'XGPU (XBox Game Plus Ultimate)',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Optional',
		},

		{
			id: 6,
			title: 'TIP General Assembly',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Optional',
		},
		{
			id: 7,
			title: 'Easter Egg Hunt',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Optional',
		},

		{
			id: 8,
			title: 'The Running Man',
			dueDate: 'August 23, 2022',
			dueTime: '12:00 PM',
			content: 'Welcome to TELUS comprehensive collection of Quebec Clinic Pages, where you will find exceptional healthcare services tailored to your needs. Our dedicated team of medical professionals is committed to delivering top-quality care in a compassionate and patient-centered environment. With advanced technologies and innovative treatments, we strive to improve the health and well-being of individuals and families across Quebec. Explore our diverse range of specialties and experience personalized care that prioritizes your health and happiness. Trust TELUS to be your partner on your journey towards optimal health.',
			importance: 'Required',
		}
		


		
	]
      
    
	return (
 
		<div style={EventPanelDiv}>
			<div style={TaskPanelSubheader1}>
				<div style={TaskPanelSubheader2Content}> <span id="boot-icon" className='bi bi-plus' style={{ fontSize: '18px', color: 'rgb(128, 128, 128)' }}></span>
					<p style={addNewTaskTypeHereButton}> <BiPlus/> Add new task type here </p> </div>
				<div style={TaskPanelSubheader2Content}>
					<Nav.Item>
						<Nav.Link style={TaskPanelSubheader2ContentRgiht} href="/home"><img style={TaskPanelSubheader2ContentRgihtIcons} src ={require('../assets/images/filter.png')} />Filter</Nav.Link>
						<Nav.Link style={TaskPanelSubheader2ContentRgiht} href="/home"><img style={TaskPanelSubheader2ContentRgihtIcons} src ={require('../assets/images/sort-up.png')} />Sort</Nav.Link>
					</Nav.Item>


				</div>
			</div>


			{/* <div style={TaskPanelSubheader2}>
				<h6 style={TaskPanelSubheader2ContentTitle}>Title</h6>
				<h6 style={TaskPanelSubheader2ContentDueDate}>Due Date</h6>
				<h6 style={TaskPanelSubheader2ContentImportance}>Importance</h6>
				<h6 style={TaskPanelSubheader2ContentAction}>Action</h6>
			</div> */}

			<Container fluid style={{margin: '0', padding: '0'}}>
				<Row style={TitleBar}>
					<Col xs={4} style={{paddingLeft:'28px'}}>Title</Col>
					<Col xs={3} className='text-center' style={{paddingRight:'30px'}}>Due Date</Col>
					<Col xs={3} className='text-center' style={{paddingRight:'30px'}}>Importance</Col>
					<Col className='text-center' style={{paddingLeft:'50px'}}>Action</Col>
				</Row>
			</Container>


            
			<ListGroup style={EventPanelContainer}>
				{tasks.map((event) => (
					<ListGroup.Item key={event.id} style={listGroupItem}>
						<Form.Text
                    
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div style={IndItemTitle}>
									<div style={IndItemTitleDiv}>
										<p style={IndItemTitleDisplay} 
											onClick={() => handleToggle(event.id)}
											aria-controls={`example-collapse-text-${event.id}`}
											aria-expanded={eventStates[event.id] ? 'true' : 'false'}>{event.title}</p>
									</div>
									<Button 
										
										style={viewDetailsButton}
										onClick={() => handleToggle(event.id)}
										aria-controls={`example-collapse-text-${event.id}`}
										aria-expanded={eventStates[event.id] ? 'true' : 'false'}>View details</Button>
								</div>
								<div style={IndItemDueDate}>
									<p style={IndItemDueDateDisplay}>{event.dueDate}</p>
									<p style={IndItemDueTimeDisplay} >{event.dueTime}</p>
								</div>
								<div style={IndItemImportance}>
									<Badge
										bg={event.importance === 'Required' ? 'danger' : event.importance === 'Optional' ? 'warning' : 'secondary'}
										style={IndImportanceBadge}
									>
										{event.importance}
									</Badge>
								</div>
								<div style={IndItemAction}>
									<Button variant="success">Mark as completed</Button>
								</div>
							</div>
						</Form.Text>
						<Collapse in={eventStates[event.id]}>
							
							<div style={eventContent} id={`example-collapse-text-${event.id}`}>
								<h3>{event.title}</h3>
								{event.content}
								
								<div>
                                    
									<Button style={eventContentButtons}>Workday Link</Button>
									<Button style={eventContentButtons}>MyGrowth</Button>
									<Button style={eventContentButtons}>Check Progress</Button>
								</div>
							</div>
						</Collapse>
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
}
    