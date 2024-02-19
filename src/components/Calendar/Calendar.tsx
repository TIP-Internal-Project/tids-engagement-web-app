/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import './calendar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import Button from 'react-bootstrap/Button'
import { useAppDispatch } from '../../redux/store'
import { fetchEvents, getEventDetailsByDate } from '../../redux/eventSlice'






// Event Attendance


// Event Attendace




type Event = {
  id: number;
  title: string;
  attendees: number;
  registered: number;
  didNotAttend: number;
  numberOfInviteSent: number;
  date: string;
};

// Dummy date for Event, it will look for a similar event using title on the Events Report Component//
export const events: Event[] = [
	{
		id: 1,
		title: 'Join the Kape and Kame hybrid activity',
		attendees: 40,
		registered: 300,
		didNotAttend: 260,
		numberOfInviteSent: 400,
		date: 'January 10, 2024',
	},
	{
		id: 2,
		title: 'What is Data Scientist by Raymond Zano1',
		attendees: 200,
		registered: 600,
		didNotAttend: 400,
		numberOfInviteSent: 621,
		date: 'January 10, 2024',
	},
	{
		id: 3,
		title: 'TELUS Wellness Webinar | Boost Your Wellbeing',
		attendees: 100,
		registered: 300,
		didNotAttend: 200,
		numberOfInviteSent: 311,
		date: 'June 2, 2023',
	},
	{
		id: 4,
		title: 'TELUS Leadership Conference | Unleashing Your Leadership Potential',
		attendees: 61,
		registered: 300,
		didNotAttend: 120,
		numberOfInviteSent: 231,
		date: 'June 2, 2023',
	},
	{
		id: 5,
		title: 'TELUS Town Hall Meeting | Connecting for Success',
		attendees: 43,
		registered: 300,
		didNotAttend: 80,
		numberOfInviteSent: 170,
		date: 'June 2, 2023',
	},
	{
		id: 6,
		title: 'SAFE Refresher',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'January 01, 2024',
	},
	{
		id: 7,
		title: 'Negosyo Caravan',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'February 01, 2024',
	},
	{
		id: 8,
		title: 'Back to School',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'March 01, 2024',
	},
	{
		id: 9,
		title: 'Fun Run',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'April 01, 2024',
	},
	{
		id: 10,
		title: 'Valentines Event',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'Feb 14, 2024',
	},
	{
		id: 11,
		title: 'Photo booth',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'January 24, 2024',
	},
	{
		id: 12,
		title: 'Brown Bag',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'January 24, 2024',
	},
	{
		id: 13,
		title: 'GA',
		attendees: 200,
		registered: 300,
		didNotAttend: 100,
		numberOfInviteSent: 400,
		date: 'January 24, 2024',
	}
]

const ProgressBarDiv = {
	height: '100%',
	display: 'inlineBlock',
}

const TitleBar = {
	
	backgroundColor: '#fff',
	paddingTop: '24px',
	marginRight: '32px',
}

const IntegratedDiv = {
	padding: '20px',
	width: 'auto'
}


// Event Attendance
const viewDetailsButton = {
	padding: '1px 2px',
	fontSize: '16px',
	background: 'none',
	border: 'none',
	color: 'green',
	float:'right',
	marginBottom:'10px'
	, fontWeight: '700', fontFamily:'Mulish',fontStyle:'normal'
} as React.CSSProperties

const legendCircle1 = {
	height : '32px',
	width : '32px',
	borderRadius: '50%',
	backgroundColor:'#4B286D',
} as React.CSSProperties

const legendCircle2 = {
	height : '32px',
	width : '32px',
	borderRadius: '50%',
	backgroundColor:'#F4F0FD',
} as React.CSSProperties

const legendCircle3 = {
	height : '32px',
	width : '32px',
	borderRadius: '50%',
	backgroundColor:'#E5DAFB',
} as React.CSSProperties

ChartJS.register(ArcElement, Tooltip, Legend)

const dummyData = {
	labels:['Attendees', 'Didn\'t Attend', 'No Response'],
	datasets:[
		{
			data: [20, 30, 50],
			backgroundColor: ['#4B286D', '#F4F0FD', '#E5DAFB']
		}
	]
}

const options = {
	responsive: true,
	aspectRatio: 1,
	plugins: {
		legend: {
			display: false, // Set this to false to remove the legend
		},
	}
}

const defaultOptions = {
	responsive: true,
	aspectRatio: 1,
	plugins: {
		legend: {
			display: false, // Set this to false to remove the legend
		},
		tooltip: {
			enabled: false,
		}
	}
}


const total = dummyData.datasets[0].data[0] + dummyData.datasets[0].data[1] + dummyData.datasets[0].data[2]
const attendees = dummyData.datasets[0].data[0] / total * 100
const nonAttend = dummyData.datasets[0].data[1] / total * 100
const nonResponse = dummyData.datasets[0].data[2] / total * 100





const Calendar = () => {
	const dispatch = useAppDispatch()
	const [currentDate, setCurrentDate] = useState(new Date())
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth()


	const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
	const startingDayOfWeek = firstDayOfMonth.getDay()

	const datesOfTheMonth: Array<Date | null> = Array.from({ length: 31 }, (_, i) => {
		const date = i + 1
		return new Date(currentYear, currentMonth, date)
	})

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
	datesOfTheMonth.length = daysInMonth

	for (let i = 0; i < startingDayOfWeek; i++) {
		datesOfTheMonth.unshift(null)
	}

	const handlePreviousMonth = () => {
		const previousMonth = new Date(currentYear, currentMonth - 1)
		setCurrentDate(previousMonth)
	}

	const handleNextMonth = () => {
		const nextMonth = new Date(currentYear, currentMonth + 1)
		setCurrentDate(nextMonth)
	}

	const renderPopoverContent = (event: Event | undefined) => {
		if (event) {
		  const eventsWithSameDay = events.filter(
				(eventItem) => eventItem.date === event.date
		  )
		  return (
			<Popover id={`popover-${event.id}`}>
			  <Popover.Header as="h3">{event.date}</Popover.Header>
			  <Popover.Body>
						{eventsWithSameDay.map((eventItem) => (
				  <div key={eventItem.id}>
								<p>{eventItem.title}</p>
				  </div>
						))}
			  </Popover.Body>
			</Popover>
		  )
		} else {
		  // Render content for an empty popover
		  return (
			<Popover id={'popover-empty'}>
			  <Popover.Header as="h3">No Events</Popover.Header>
			  <Popover.Body>No events for this date.</Popover.Body>
			</Popover>
		  )
		}
	  }

	const [eventsday, setEvents] = useState<Event[]>([])
	const [clickedDate, setClickedDate] = useState<string | null>(null)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
	const [selectedEvent, setSelectedEvent] = useState<string | number | undefined>(undefined)

	const handleClickDate = async (date: Date, event: Event | undefined) => {
		setEvents([])
		const formattedDate = date.toLocaleDateString()
		setClickedDate(formattedDate)

		const eventDetails = await dispatch(getEventDetailsByDate(formattedDate))
		// console.log(eventDetails.payload)

		const flattenedArray = eventDetails.payload.flatMap((array: any) => array)

		const eventDetailsArray = flattenedArray.map((event: any) => {
			const id = event.eventId
			const title = event.title
			const attendees = event.attendees
			const registered = event.registrants
			const didNotAttend = event.didNotAttend
			const numberOfInviteSent = event.numberOfInviteSent
			return { id, title, attendees, registered, didNotAttend, numberOfInviteSent }
		  })
		  


		  

		// const eventTitles = []
		// for (const event of flattenedArray) {
  		// const title = event.title
		// eventTitles.push(title)

		// setSelectedEvent((prevSelectedEvent: any) => [...prevSelectedEvent, title])
  		// console.log(title)
		// }
		

		// Set the events for the selected date
		// const eventsForSelectedDate = events.filter((eventItem: { date: string | number | Date }) => {
		// 	const eventDate = new Date(eventItem.date)
		// 	return (
		// 	eventDate.getDate() === date.getDate() &&
		// 	eventDate.getMonth() === date.getMonth() &&
		// 	eventDate.getFullYear() === date.getFullYear()
		// 	)
		// })

		// Check if the clicked date is the currently selected date
		if (selectedDate && date.getTime() === selectedDate.getTime()) {
			// Reset the background color if it's the same date
			setClickedDate(null)
			setSelectedDate(null)
		  } else {
			// Change the background color for the clicked date
			setSelectedDate(date)

			// Set the events for the selected date\
			console.log(eventDetailsArray)
			 setEvents(eventDetailsArray)
		  }
		  

		  

	}

	const defaultDataset = {
		data: [100, 100, 100],
		backgroundColor: ['#f0f0f0', '#f0f0f0', '#f0f0f0'],
	}

	const handleHoverDate = (date: Date | null) => {
		setHoveredDate(date)
	}

	const handleDropdownChange = (event: any | null) => {
		// Update the selected event when dropdown changes
		setSelectedEvent(event.target.value)
	}
	

	const eventForClickedDate = events.find((eventItem) => {
		const eventDate = new Date(eventItem.date)
		return (
	  eventDate.getDate() === currentDate.getDate() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
		)
	})

	return (

		// calendar
		<div style={IntegratedDiv}>
			<Row className="calendar">
				
				<Col xs={5} >
					<div className='CalendarCol'>
						<div className="calendar-head">
							<div>
								<img
									src={require('../Calendar/assets/previous.png')}
									alt="Previous Month"
									onClick={handlePreviousMonth}
									className="head-icons"
								/>
							</div>
							<div className="month-year">
								<div className="selected-month">
									{firstDayOfMonth.toLocaleDateString('default', { month: 'long' })}{' '}
								</div>
								<div className="selected-year">{currentYear}</div>
							</div>
							<div>
								<img
									src={require('../Calendar/assets/next.png')}
									alt="Next Month"
									onClick={handleNextMonth}
									className="head-icons"
								/>
							</div>
						</div>
						<hr />
						<div className="main-table-div">
							<table>
								<thead>
									<tr className="days">
										{daysOfTheWeek.map((day) => (
											<th key={day}>{day}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{Array.from({ length: Math.ceil(datesOfTheMonth.length / 7) }, (_, i) => (
										<tr key={i} className="date-rows">
											{Array.from({ length: 7 }, (_, j) => {
												const dateIndex = i * 7 + j
												const date = datesOfTheMonth[dateIndex]
												const isCurrentDate =
                      date &&
                      date.getDate() === new Date().getDate() &&
                      date.getMonth() === new Date().getMonth() &&
                      date.getFullYear() === new Date().getFullYear()
					  
												const eventForDate = events.find((eventItem) => {
													const eventDate = new Date(eventItem.date)
													return (
														eventDate.getDate() === date?.getDate() &&
                        eventDate.getMonth() === date?.getMonth() &&
                        eventDate.getFullYear() === date?.getFullYear()
													)
												})

												const isSelectedDate =
													selectedDate &&
													date &&
													date.getTime() === selectedDate.getTime()

													return (
														<td
														  className={`date-cells ${eventForDate ? 'date-with-events' : ''} ${isSelectedDate ? 'selected-date' : ''}`}
														  key={dateIndex}
														  onClick={() => handleClickDate(date as Date, eventForDate)}
														  onMouseOver={() => handleHoverDate(date as Date)}
														  onMouseLeave={() => handleHoverDate(null)}
														>
														  <p>
															{date && (
															  <OverlayTrigger
																trigger={['hover', 'focus']}
																placement="top"
																overlay={renderPopoverContent(eventForDate)}
															  >
																<div className={`${isCurrentDate ? 'current-date' : ''}`}>
																  {date.getDate()}
																</div>
															  </OverlayTrigger>
															)}
														  </p>
														</td>
													  )
											})}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</Col>





				{/* Events Attendance */}

				
				<Col xs={7} >
					<div className='EventsAttendanceCol'>
						{/* Dropdown to select events for the day */}
						{eventsday.length > 0 ? 
							<div className="mt-3 px-5">
								<label htmlFor="eventDropdown" style={{ marginRight: '10px' }}>
								Select Event:
								</label>
								<select
								id="eventDropdown"
								onChange={handleDropdownChange}
								value={selectedEvent}
								>
								<option value={''}>Select an event</option>
								{/* Map through eventsday to populate dropdown options */}
								
								{eventsday.map((event) => (
									<option key={event.id} value={event.title}>
									{event.title}
									</option>
								))}
								</select>
							</div>
							: <div className="mt-3 px-5"><label htmlFor="eventDropdown" style={{ marginRight: '10px' }}></label></div>
						}
						<Container fluid style={{maxWidth:'710px', maxHeight: '412px', borderRadius: '20px'}} className='px-5 py-3'>
							<Row >
								<Col xs={6} >
									<p style={{fontFamily:'Mulish', fontSize:'20px'}}>Overall Events Attendance</p>
									<div style={{height: '200px', width:'200px'}}>
										{eventsday.length > 0 ? (
											<Pie
												data={{
													labels: ['Attendees', 'Didn\'t Attend', 'No Response'],
													datasets: [ selectedEvent ?
													{
														data: [
															Math.round(eventsday.reduce((total, e) => total + (e.title === selectedEvent ? (e.attendees) : 0), 0)),
															Math.round(eventsday.reduce((total, e) => total + (e.title === selectedEvent ? (e.didNotAttend) : 0), 0)),
															Math.round(eventsday.reduce((total, e) => total + (e.title === selectedEvent ? ((e.numberOfInviteSent - e.registered)) : 0), 0)),
														],
														backgroundColor: ['#4B286D', '#F4F0FD', '#E5DAFB'],
													} : defaultDataset,
													],
												}}
												options={ selectedEvent ? options : defaultOptions}
											/>
										) : (
											<Pie data={{ labels: [], datasets: [defaultDataset] }} options={defaultOptions} />
										)}
										
									</div>
                    
								</Col>

								<Col >
									<Button style={viewDetailsButton}> 
                        View details <img  style={{height: '12px', width: '13px', marginLeft:'5px', marginBottom:'3px'}} src={require('../../assets/images/Arrow.png')} alt="" />
									</Button>

									<Container fluid className='mt-5 px-1 py-2' >
										<Row className='pt-4' style={{alignItems:'center'}}>
											<div style={legendCircle1}></div>
											{ <p className='mb-0' style={{width:'max-content', fontSize:'16px', display:'inline-block'}}>Attendees <span style={{color:'lightgrey'}}>_____________</span>  {Math.round(eventsday.reduce((total, e) => total + (e.title === selectedEvent ? (e.attendees/e.numberOfInviteSent)*100 : 0), 0))}%</p> }
										</Row>
										<Row className='mt-3' style={{alignItems:'center'}}>
											<div style={legendCircle2}></div>
											{ <p className='mb-0' style={{width:'max-content', fontSize:'16px', display:'inline-block'}}>Didn't Attend <span style={{color:'lightgrey'}}>___________</span>{Math.round(eventsday.reduce((total, e) => total + (e.title === selectedEvent ? (e.didNotAttend/e.numberOfInviteSent)*100 : 0), 0))}% </p> }
										</Row>
										<Row className='mt-3' style={{alignItems:'center'}}>
											<div style={legendCircle3}></div>
											{ <p className='mb-0' style={{width:'max-content', fontSize:'16px', display:'inline-block'}}>No Response <span style={{color:'lightgrey'}}>___________</span>{Math.round(eventsday.reduce((total, e) => total + (e.title === selectedEvent ? ((e.numberOfInviteSent - e.registered)/e.numberOfInviteSent)*100 : 0), 0))}% </p> }
										</Row>

										<Row className='mt-5' style={{alignItems:'center', paddingLeft:'10%'}}>
											<img  style={{height: '25px', width: '50px'}} src={require('../../assets/images/Date.png')}/>
											<p className='text-center mb-0 p-0' style={{fontSize:'14px',width:'max-content', display:'inline-block'}}>Date Period June - July 2023</p>
										</Row>
									</Container>
                    
                    
								</Col>
							</Row>
          
						</Container>
					</div>
				</Col>
				
			</Row>








			{/* Events Report */}
			<Row style={{padding:'12px'}}>					
				<div style={{backgroundColor: '#FFFF', padding:'12px', borderRadius: '20px'}}>

	  				<Container fluid style={{margin: '0', padding: '0', backgroundColor: '#FFFF'}}>
						<Row style={{paddingTop: '21px'}}> 
					
							<Col style={{paddingTop: '28px'}}> 
								<h4 style={{ display: 'inline-block', paddingLeft: '1rem' }}>Events Report</h4>
								
							 </Col>
											
					
							<Col>
								<div style={{ display: 'inline-block',float: 'right' , paddingLeft: '20px' }}><Button style={viewDetailsButton}> 
                        Generate Report <img  style={{height: '12px', width: '13px', marginLeft:'5px', marginBottom:'3px'}} src={require('../../assets/images/Arrow.png')} alt="" />
								</Button> </div>
								<div style={{ display: 'inline-block',float: 'right', paddingLeft: '20px', paddingTop:'3px' }}><p> <img className='EventReportCircle' src ={require('../../assets/images/greyIcon.png')} /> Didn't Attend </p></div> 
								<div style={{ display: 'inline-block',float: 'right', paddingLeft: '20px', paddingTop:'3px' }}><p> <img className='EventReportCircle' src ={require('../../assets/images/greenIcon.png')} />Attendees </p> </div>
								
							</Col>
					
					
						</Row>
						<Row style={TitleBar} className='px-3'>
							<Col xs={5}><h5 style={{fontWeight: '700'}}>Event</h5></Col>
							<Col xs={7}><h5>Performance</h5></Col>

						</Row>
					</Container>


					<div className="event-details">
						{clickedDate && (
							<div>
						
								{events.map((event) => {
									const eventDate = new Date(event.date).toLocaleDateString()
									if (eventDate === clickedDate) {
										return (
											<Row className = ' horizontal-line' key={event.id}> 
												<Col>
													<div >
														<h6 className='EventItem'>{event.title}</h6>
														<p>Date: {event.date}</p>
														
													</div>
												</Col>
												<Col xs={7} key={event.id}  className='EventItemRightDiv'style={{padding: '0'}} >
													<Row>
														<div>
															<div className='EventItemRightDivTotalInvites'>
															Total Invites: {event.numberOfInviteSent}
															</div>
															<div  className='EventItemRightDivIcons'> <img className='EventReportCircle' src ={require('../../assets/images/greyIcon.png')} /> {event.didNotAttend}</div>
															<div  className='EventItemRightDivIcons'> <img className='EventReportCircle' src ={require('../../assets/images/greenIcon.png')} /> {event.attendees} </div>
														
													
															
														</div>
													</Row>
 
													<Row>
														<div className='ProgressBar'>
														<ProgressBar
																		style={ProgressBarDiv}
																		now={(event.attendees / event.numberOfInviteSent) * 100}
																		label={<span style={{backgroundColor:'#66CC00'}}>&nbsp;</span>}
																		className="custom-progress-bar custom-progress-bar-success"
																		/>
														</div>
														</Row>
												</Col>
											</Row>
				  
										)
									}
									return null
								})}
							</div>

			

						)}
      		</div>
				
		  </div>
		  </Row>
		</div>
	)
	
}


export default Calendar
