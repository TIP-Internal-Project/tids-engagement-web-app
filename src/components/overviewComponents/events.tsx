import React, { useEffect } from 'react'
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

	const renderedEvents = Object.values(overviewEvents.events).map((event: any, index) => {
		const formattedDate = new (window.Date as any)(event.startDate).toLocaleDateString({},
			{timeZone:'UTC',month:'short', day:'2-digit', year:'numeric'})
		const time = new (window.Date as any)(event.startTime)
		let hours = time.getHours()
		let minutes = time.getMinutes()
		const newformat = time.getHours() >= 12 ? 'PM' : 'AM'
		hours = hours % 12 
		// To display "0" as "12" 
		hours = hours ? hours : 12 
		minutes = minutes < 10 ? '0' + minutes : minutes
		const formattedTime = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ' ' + newformat

		return (
			<RowDiv key={event.eventId}>
				<Category>
					<Rectangle1></Rectangle1>
					<Rectangle1 style={{ display: event.category === 'TEAM EVENT' ? 'block' : 'none' }}></Rectangle1>
					<Rectangle2 style={{ display: event.category === 'TIDS' ? 'block' : 'none' }}></Rectangle2>
					<Rectangle3 style={{ display: event.category === '#HAPPYHERE' ? 'block' : 'none' }}></Rectangle3>
					<Rectangle4 style={{ display: event.category === 'COP' ? 'block' : 'none' }}></Rectangle4>
					<EventCategory style={{ width: 'max-content' }}>{event.category}</EventCategory>
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
							{formattedTime + ' Manila Time'}
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
				<ViewAll><ViewAll1>{'View all'}</ViewAll1><Arrow><img src={require('../../assets/images/Arrow.png')} alt="" /></Arrow></ViewAll>
			</EventsHeading1>
			{overviewEvents.loading && <Headings><Title>{'Loading...'}</Title></Headings>}
      		{!overviewEvents.loading && overviewEvents.error ? <Headings><Title>{'Error: ' + overviewEvents.error}</Title></Headings> : null}
			{renderedEvents}
		</Events>
		<TaskPanel />
	</Components>
}

export default EventsPanel