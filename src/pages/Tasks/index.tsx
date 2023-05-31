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
import EventsPanel from '../../components/overviewComponents/events'
import { HeaderRight } from '../../components/HeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import { EventPanel } from '../../components/EventPanel'
import { Subheader } from '../../components/Subheader'
import { TaskPanel } from '../../components/TaskPanel'
import ListGroup from 'react-bootstrap/ListGroup'


export default function TaskPage() {
	const dispatch = useAppDispatch()
	const { events } = useAppSelector((state) => state.events)
	const userSession = useAppSelector((state) => state.userSession)

	const firstEvent: Event | undefined = events && events[0]
	
	
	// CSS samples



	

	const header = {
		height: '81px',
		// border:'1px solid red'
	}

	


	
	const footerComponent = {
		height: '210px',
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
						<HeaderLeft pageTitle="Tasks" />
					</Col>

					<Col style={header}> 

						<HeaderRight />
	
					</Col>
				</Row>

				<TaskPanel/>
                        

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


			