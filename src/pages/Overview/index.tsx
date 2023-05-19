import React, { useEffect, useState  } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchEvents } from '../../redux/eventSlice'
import { Event } from '../../interfaces/adminFeatureApi/Event'
import '../../App.css'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Sidebar } from '../../components/Sidebar'
import { StyledStarDiv,StyledEventDiv,StyledTaskDiv,StyledCOPDiv, TitleDiv, IconDiv, ValueDiv } from '../../components/Div/Div.styles'
import { Components, Events, EventsHeading1, Events1, ViewAll, ViewAll1, Arrow, RowDiv, Category,
	 Rectangle1, EventCategory, Headings, Title, DateAndTime, Date, DateIcon, DateTime, Time, TimeIcon, 
	 Divider, Border, Line, Category1, Rectangle2, DateAndTime1, Category2, Rectangle3, DateAndTime2,
	 Category3, Rectangle4, DateAndTime3 } from './style.js'
import { HeaderRight } from '../../components/HeaderRight'
import { HeaderLeft } from '../../components/HeaderLeft'
import { EventPanel } from '../../components/EventPanel'
import { Subheader } from '../../components/Subheader'

export default function OverviewPage() {
	const dispatch = useAppDispatch()
	const { events } = useAppSelector((state) => state.events)
	const userSession = useAppSelector((state) => state.userSession)

	const firstEvent: Event | undefined = events && events[0]
	
	
	// CSS samples



	

	const header = {
		height: '81px',
		// border:'1px solid red'
	}

	

	const header2 = {
		height: 'auto',
		// border:'1px solid red'
	}

	const eventComponent = {
		height: '700px',
		// border:'1px solid red'
	}
	
	const taskComponent = {
		height: '700px',
		// border:'1px solid red'
	}
	
	const footerComponent = {
		height: '69px',
		// border:'1px solid red'
	}


	


	useEffect(() => {
	  dispatch(fetchEvents())
	}, [dispatch])

	return (
		

		<div>
			
			<Sidebar />


			<div className='div1' >
				<Row>
				
					<Col style={header}>
						<HeaderLeft/>
					</Col>

					<Col style={header}> 

						<HeaderRight />
	
					</Col>
				</Row>

				<Row>
					<Col style={header2}>
						<Subheader/>

					</Col>
				</Row>
				
				<Row>
					<Col style={eventComponent}>					
						<EventPanel/>
					</Col>
					<Col style={taskComponent}>
					</Col>
				</Row>

				<Row>
					<Col style={footerComponent}></Col>
				
				</Row>
			</div>
		
	
			
		</div>
	)
}




		 {/* <h1>Overview</h1>

		  <ListGroup>
	 {events &&
  events.map((event: Event, index: number) => (
				 <ListGroup.Item key={index}>

		   <div>Welcome! {userSession.givenName} </div>
		  <div>{event.title}</div>
		 <div>{event.startDate ? new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</div>
		   <div>{event.category}</div>

		 <StyledButton>Register</StyledButton>
					 </ListGroup.Item>
			  ))}
		  </ListGroup> */}


			