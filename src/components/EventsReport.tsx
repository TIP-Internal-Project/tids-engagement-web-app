import { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import { events as calendarEvent } from '../components/Calendar/Calendar'

export const EventsReport = () => {




type Event = {
    id: number;
    title: string;
    attendees: number;
    registered: number;
    didNotAttend: number;
    totalInvites: number; 
    date: string; 
}



const event: Event[] = calendarEvent

const ProgressBarDiv = {
	height: '100%',
	display: 'inlineBlock'
		
}

const TitleBar = {
	marginLeft: '32px',
	backgroundColor: '#fff',
	
	paddingTop: '24px',
	marginRight: '32px',
}


return (
	<div>
        
		<Container fluid style={{margin: '0', padding: '0', backgroundColor: '#FFFF'}}>
			<Row className = 'px-3 py-2'>Events Report </Row>
			<Row style={TitleBar} className='px-3'>
				<Col xs={5}>Event</Col>
				<Col xs={7}>Performance</Col>

			</Row>
		</Container>
            
		<ListGroup >
			{event.map((event) => (
				<ListGroup.Item key={event.id}>
					<Row className = 'px-3 py-2'> 
						<Col xs={5} className='EventItemLeftDiv'> 
							<p className="EventItem">{event.title} @ {event.date}</p>
									

						</Col>


						<Col xs={7} key={event.id}  className='EventItemRightDiv' >
							<div>
								<p className='EventItemRightDivTotalInvites'>Total Invites: {event.totalInvites}</p>
							</div>
                                
							<div > 
								<p className='EventItemRightDivIcons'> <img className='EventReportCircle' src ={require('../assets/images/greenIcon.png')} />   {event.attendees}  <img className='EventReportCircle' src ={require('../assets/images/greyIcon.png')} />   {event.didNotAttend}  </p>
							</div>

							<ProgressBar
								style={ProgressBarDiv}
								now={event.attendees}
								label={`${event.attendees}%`}
								className="custom-progress-bar .progress-bar"
							/>
						</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
				
			

	</div>
)
}