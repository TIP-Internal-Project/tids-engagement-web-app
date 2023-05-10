import React from 'react'
import { Components, Events, EventsHeading1, Events1, ViewAll, ViewAll1, Arrow, Row, Category,
	 Rectangle1, EventCategory, Headings, Title, DateAndTime, Date, DateIcon, DateTime, Time, TimeIcon, 
	 Divider, Border, Line, Category1, Rectangle2, DateAndTime1, Category2, Rectangle3, DateAndTime2,
	 Category3, Rectangle4, DateAndTime3 } from './style.js'

function DashboardTmView(): JSX.Element {
	return (
		<Components>
			<Events>
				<EventsHeading1>
					<Events1>{'Events'}</Events1>
					<ViewAll><ViewAll1>{'View all'}</ViewAll1><Arrow><img src={require('../../assets/images/Arrow.png')} alt="" /></Arrow></ViewAll>
				</EventsHeading1>
				<Row>
					<Category>
						<Rectangle1></Rectangle1>
						<EventCategory>{'Team Event'}</EventCategory>
					</Category>
					<Headings>
						<Title>
							{'Save the date: Be part of the TELUS Days of Giving event on October 1, 2022'}
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
				</Row>
				<Row>
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
				</Row>
				<Row>
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
				</Row>
				<Row>
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
				</Row>
			</Events>
		</Components>
	)
}

export default DashboardTmView
