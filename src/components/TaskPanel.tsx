



import { BiPlus  } from 'react-icons/bi'
import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
export const TaskPanel = () => {


	const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})


	const handleToggle = (eventId:number) => {
		setEventStates((prevState) => ({
			...prevState,
			[eventId]: !prevState[eventId]
		}))
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
		flex: '1',
		textAlign: 'left',
		marginLeft: '14px'
		

	}


	const TaskPanelSubheader2ContentAction: React.CSSProperties = {
		flex: '1',
		textAlign: 'center',
		marginLeft: '14px'
		

	}

	const TaskPanelSubheader2ContentDueDate: React.CSSProperties = {
		flex: '1',
		textAlign: 'center',
		marginLeft: '14px'
		

	}


	const TaskPanelSubheader2ContentImportance: React.CSSProperties = {
		flex: '1',
		textAlign: 'center',
		marginLeft: '14px',
      
	}


	const IndItemTitle: React.CSSProperties = {
		flex: '1',
		textAlign: 'left',
    
	}

	const IndItemTitleDisplay = {
		fontFamily: 'Mulish',
		color: '#2A2C2E',
		fontWeight: '700',
		fontSize: '16px',
		lineHeight: '24px',
		FontStyle: 'normal',
		marginBottom: '0'

	}
    
	const IndItemDueDate: React.CSSProperties = {
		flex: '1',
		textAlign: 'center',
		marginLeft: '14px'
      
	}

	const IndItemDueDateDisplay = {
		fontFamily: 'Mulish',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '28px',
		FontStyle: 'normal',
		marginBottom: '0',
		marginTop: '9px',
		color: '#252733'
	}

	const IndItemImportance: React.CSSProperties = {
		flex: '1',
		textAlign: 'center',
		marginLeft: '14px'
      
	}

	const IndImportanceBadge = {
		width: '84px',
		height: '28px',
		borderRadius: '11px',
		paddingTop: '9px',
	}




	const IndItemAction: React.CSSProperties = {
		flex: '1',
		textAlign: 'center',
		marginLeft: '14px'
      
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
		paddingTop: '104px'

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
		fontSize: '16px',
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
		paddingLeft: '61px'
        
	}
  

	// ++++++ task items


	type Task = {
        id: number;
        title: string;
        dueDate: string;
        dueTime: string;
        content: string;
        importance: 'Low' | 'Medium' | 'High';
      };
    
	const tasks: Task[] = [
		{
			id: 1,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'High',
		},
		{
			id: 2,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'Medium',
		},

		{
			id: 3,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'Low',
		},
		{
			id: 4,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'High',
		},
		{
			id: 5,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'Medium',
		},

		{
			id: 6,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'Low',
		},
		{
			id: 7,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'Low',
		},

		{
			id: 8,
			title: 'Task 1',
			dueDate: '2023-05-30',
			dueTime: '12:00 PM',
			content: 'Task 1 content',
			importance: 'Low',
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


			<div style={TaskPanelSubheader2}>
				<h6 style={TaskPanelSubheader2ContentTitle}>Title</h6>
				<h6 style={TaskPanelSubheader2ContentDueDate}>Due Date</h6>
				<h6 style={TaskPanelSubheader2ContentImportance}>Importance</h6>
				<h6 style={TaskPanelSubheader2ContentAction}>Action</h6>
			</div>
            
			<ListGroup style={EventPanelContainer}>
				{tasks.map((event) => (
					<ListGroup.Item key={event.id} style={listGroupItem}>
						<Form.Text
                    
						>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div style={IndItemTitle}>
									<div >
										<p style={IndItemTitleDisplay} 
											onClick={() => handleToggle(event.id)}
											aria-controls={`example-collapse-text-${event.id}`}
											aria-expanded={eventStates[event.id] ? 'true' : 'false'}>{event.title}</p>
									</div>
									<Button 
										
										style={viewDetailsButton}
										onClick={() => handleToggle(event.id)}
										aria-controls={`example-collapse-text-${event.id}`}
										aria-expanded={eventStates[event.id] ? 'true' : 'false'}>view details</Button>
								</div>
								<div style={IndItemDueDate}>
									<p style={IndItemDueDateDisplay}>{event.dueDate}</p>
									<p>{event.dueTime}</p>
								</div>
								<div style={IndItemImportance}>
									<Badge
										bg={event.importance === 'High' ? 'danger' : event.importance === 'Medium' ? 'warning' : 'secondary'}
										style={IndImportanceBadge}
									>
										{event.importance}
									</Badge>
								</div>
								<div style={IndItemAction}>
									<Button variant="primary">Tag as complete</Button>
								</div>
							</div>
						</Form.Text>
						<Collapse in={eventStates[event.id]}>
							<div id={`example-collapse-text-${event.id}`}>{event.content}
								
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
    