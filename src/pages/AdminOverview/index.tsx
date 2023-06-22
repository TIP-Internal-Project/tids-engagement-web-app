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
import  HeaderLeft  from '../../components/HeaderLeft'
import { EventPanel } from '../../components/EventPanel'
import { Subheader } from '../../components/Subheader'
import { EventAttendance } from '../../components/EventAttendance'
import { EventsReport } from '../../components/EventsReport'
import Calendar from '../../components/Calendar/Calendar'

export default function AdminOverviewPage() {
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
						<HeaderLeft pageTitle="Admin Overview" />
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
				<Col>
					<Calendar/>
					
					
				</Col>


				
				<EventsPanel></EventsPanel>

				<Row>
					<Col style={footerComponent}></Col>
				
				</Row>
			</div>
		
	
			
		</div>
	)
}





			