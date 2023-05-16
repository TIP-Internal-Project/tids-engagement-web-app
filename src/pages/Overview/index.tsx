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
			
			{<div className='sidebar'> 
				<div className='sidebarContent'>
					<img src= {require('../../assets/images/TI Logo.png')} />
				
					<p>Dashboard</p>
					
					<ul>
						<li><img src ={require('../../assets/images/home logo.png')} /> <a href="">Overview</a></li>
						<li><img src ={require('../../assets/images/events.png')} />Events</li>
						<li><img src ={require('../../assets/images/tasks.png')} />Tasks</li>
					</ul> 

					<p>External Links</p>

					<ul>
						<li><img src ={require('../../assets/images/tids shoppee.png')} />Tids Shoppee</li>
						<li><img src ={require('../../assets/images/intranet.png')} /> Intranet</li>
						<li><img src ={require('../../assets/images/skills matrix.png')} />Skills Matrix</li>
					</ul> 

				</div>
			</div>}


			<div className='div1' >
				<Row>
				
					<Col style={header}>
						<div className='headerLeft'><p>Overview</p> </div>	
					</Col>

					<Col style={header}> 
				

						<div className='headerRight'>

								
							<div> <img className="notification" src ={require('../../assets/images/notification.png')} /> </div> 
							<div>  |  </div>
								 <div> <p>{userSession.givenName} {userSession.familyName} <img className='userPic' src ={require('../../assets/images/user pic.png')} /> </p></div>
							
							
						</div>
						
					</Col>
				</Row>
				<Row>
					<Col style={header2}>
						<StyledStarDiv>
							<TitleDiv>Stars</TitleDiv>
							<IconDiv><img src={require('./../../assets/images/Star.png')} /></IconDiv>
							<ValueDiv>9,999</ValueDiv>
						</StyledStarDiv>

						<StyledEventDiv>
							<TitleDiv>Upcoming Events</TitleDiv>
							<IconDiv><img src={require('./../../assets/images/Calendar.png')} /></IconDiv>
							<ValueDiv>10</ValueDiv>
						</StyledEventDiv>

						<StyledTaskDiv>
							<TitleDiv>Pending Tasks</TitleDiv>
							<IconDiv><img src={require('./../../assets/images/burgerSmall.png')} /></IconDiv>
							<ValueDiv>10</ValueDiv>
						</StyledTaskDiv>

						<StyledCOPDiv>
							<TitleDiv>POC</TitleDiv>
							<IconDiv><img src={require('./../../assets/images/Calendar.png')} /></IconDiv>
							<ValueDiv>10</ValueDiv>
						</StyledCOPDiv>

					</Col>
				
				</Row>
				
				<Row>
					<Col style={eventComponent}>
						<Components>
							<Events>
								<EventsHeading1>
									<Events1>{'Events'}</Events1>
									<ViewAll><ViewAll1>{'View all'}</ViewAll1><Arrow><img src={require('../../assets/images/Arrow.png')} alt="" /></Arrow></ViewAll>
								</EventsHeading1>
								<RowDiv>
									<Category>
										<Rectangle1></Rectangle1>
										<EventCategory>{'Team Event'}</EventCategory>
									</Category>
									<Headings>
										<Title>
											test
										</Title>
									</Headings>
									<DateAndTime>
										<Date>
											<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
											<DateTime>{'Oct 1, 2022'}</DateTime>
										</Date>
										<Time>
											<TimeIcon><img src={require('../../assets/images/Time.png')} alt="" /></TimeIcon>
											<DateTime>
												{'09:00 AM Manila Time'}
											</DateTime>
										</Time>
									</DateAndTime>
									<Divider>
										<Border>
											<Line></Line>
										</Border>
									</Divider>
								</RowDiv>
								<RowDiv>
									<Category1>
										<Rectangle2></Rectangle2>
										<EventCategory>{'TIDS'}</EventCategory>
									</Category1>
									<Headings>
										<Title>
											{'Open Web-Session | BigQuery GCP | 31st August 2022 | Meeting Details'}
										</Title>
									</Headings>
									<DateAndTime1>
										<Date>
											<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
											<DateTime>{'Aug 31, 2022'}</DateTime>
										</Date>
										<Time>
											<TimeIcon><img src={require('../../assets/images/Time.png')} alt="" /></TimeIcon>
											<DateTime>
												{'09:00 PM Manila Time'}
											</DateTime>
										</Time>
									</DateAndTime1>
									<Divider>
										<Border>
											<Line></Line>
										</Border>
									</Divider>
								</RowDiv>
								<RowDiv>
									<Category2>
										<Rectangle3></Rectangle3>
										<EventCategory>{'#happyhere'}</EventCategory>
									</Category2>
									<Headings>
										<Title>
											{'See you tonight for the first ever HappyHere FlipTIP intersite competition!'}
										</Title>
									</Headings>
									<DateAndTime2>
										<Date>
											<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
											<DateTime>{'Aug 25, 2022'}</DateTime>
										</Date>
										<Time>
											<TimeIcon><img src={require('../../assets/images/Time.png')} alt="" /></TimeIcon>
											<DateTime>
												{'09:00 PM Manila Time'}
											</DateTime>
										</Time>
									</DateAndTime2>
									<Divider>
										<Border>
											<Line></Line>
										</Border>
									</Divider>
								</RowDiv>
								<RowDiv>
									<Category3>
										<Rectangle4></Rectangle4>
										<EventCategory>{'COP'}</EventCategory>
									</Category3>
									<Headings>
										<Title>
											{'DevOps CoP: Call for Video Content'}
										</Title>
									</Headings>
									<DateAndTime3>
										<Date>
											<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
											<DateTime>{'Aug 25, 2022'}</DateTime>
										</Date>
										<Time><TimeIcon><img src={require('../../assets/images/Time.png')} alt="" /></TimeIcon>
											<DateTime>
												{'09:00 PM Manila Time'}
											</DateTime>
										</Time>
									</DateAndTime3>
								</RowDiv>
							</Events>
						</Components>




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


			