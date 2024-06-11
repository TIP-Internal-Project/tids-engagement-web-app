import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchEvents } from '../../redux/overviewEventsSlice'
import TaskPanel from './tasks'
import { Components, Events, EventsHeading1, Events1, ViewAll, ViewAll1, Arrow, RowDiv, Category, Rectangle1, Rectangle2, Rectangle3, Rectangle4, EventCategory, Headings, 
	 Title, DateAndTime, Date, DateIcon, DateTime, Time, TimeIcon, Divider, Border, Line } from './style'

const EventsPanel = () => {
	const overviewEvents = useAppSelector((state) => state.overviewEvents)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchEvents())
	}, [])

	const setTimeFormat = (aDateString: string): string => {
      const aDate = new window.Date(aDateString)
      const timeString = aDate.toLocaleTimeString().slice(0, -6)
      const newFormat = aDate.getHours() >= 12 ? 'PM' : 'AM'
      return `${timeString} ${newFormat}`
    }

	const renderedEvents = Object.values(overviewEvents.events).map((event: any, index) => {
		const formattedDate = new (window.Date as any)(event.startDate).toLocaleDateString({},
			{timeZone:'UTC',month:'short', day:'2-digit', year:'numeric'})

		return (
			<RowDiv key={event.eventId}>
				<Category>
					<Rectangle1 style={{ display: event.category === 'teamEvent' ? 'block' : 'none' }}></Rectangle1>
					<Rectangle2 style={{ display: event.category === 'TIDS' ? 'block' : 'none' }}></Rectangle2>
					<Rectangle3 style={{ display: event.category === '#HAPPYHERE' ? 'block' : 'none' }}></Rectangle3>
					<Rectangle4 style={{ display: event.category === 'COP' ? 'block' : 'none' }}></Rectangle4>
					<EventCategory style={{ width: 'max-content' }}>{event.category == 'TIDS'
                  ? 'TIDS'
                  : event.category === 'teamEvent'
                  ? 'TEAM EVENT'
                  : event.category === 'COP'
                  ? 'COP'
                  : '#HAPPYHERE'}</EventCategory>
				</Category>
				<Headings>
					<Title>
						{event.title}
					</Title>
				</Headings>
				<DateAndTime>
					<Date>
						<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
						<DateTime>{formattedDate}</DateTime>
					</Date>
					<Time>
						<TimeIcon><img src={require('../../assets/images/Time.png')} alt="" /></TimeIcon>
						<DateTime>
							{setTimeFormat(event.startDate) + ' Manila Time'}
						</DateTime>
					</Time>
				</DateAndTime>
				<Divider>
					<Border style={{ display: index === overviewEvents.events.length - 1 ? 'none' : 'block' }}>
						<Line></Line>
					</Border>
				</Divider>
			</RowDiv>
		)
	})

	return <Components>
		<Events>
			<EventsHeading1 style={{ width: '-webkit-fill-available' }}>
				<Events1>{'Events'}</Events1>
				
				<a href='url'>
					<Link to='/events'>
						<ViewAll><ViewAll1>{'View all'}</ViewAll1><Arrow><img src={require('../../assets/images/Arrow.png')} alt="" /></Arrow></ViewAll>
					</Link>
			  	</a>
			</EventsHeading1>
			{overviewEvents.loading && <Headings><Title>{'Loading...'}</Title></Headings>}
      		{!overviewEvents.loading && overviewEvents.error ? <Headings><Title>{'Error: ' + overviewEvents.error}</Title></Headings> : null}
			{renderedEvents.length > 0 ? (renderedEvents) : (
				<Headings>
				<div style={{textAlign: 'center', color: 'rgb(159, 162, 180)', paddingTop: '3%', paddingBottom: '4%', fontSize: '14px'}}>No Events</div>
				</Headings>
			)}
		</Events>
		<TaskPanel />
	</Components>
}

export default EventsPanel
