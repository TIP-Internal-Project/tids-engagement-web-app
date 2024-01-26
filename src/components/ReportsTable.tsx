import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchEvents } from '../redux/eventSlice'
import { ListGroup } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export const ReportsTable = () => {
  const dispatch = useAppDispatch()
  const eventsState = useAppSelector((state) => state.events)

  useEffect(() => {
    // Fetch events when the component mounts
    dispatch(fetchEvents())
  }, [dispatch])


  if (eventsState.loading) {
    return <p>Loading...</p>
  }

  if (eventsState.error) {
    return <p>Error: {eventsState.error}</p>
  }


  const TitleBar = {
    paddingTop: '24px',
    color: '#9FA2B4',
  }

  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false


  const filteredEvents = eventsState.events.filter((event: any) => event.status !== 'Archived')

  return (
    
    <div>
      <Row style={TitleBar} className='px-5'>
            {isAdmin && (
              <Col xs={1} style={{ fontSize: '14px' }}>
              Event Title
            </Col>
            )}
            <Col xs={isAdmin? 2 : 3} style={{ fontSize: '14px' }}>
              Date
            </Col>
            <Col xs={isAdmin? 2 : 4} style={{ fontSize: '14px' }} className='text-center'>
              Attendees
            </Col>
            <Col xs={isAdmin? 2 : 4} style={{ fontSize: '14px' }} className='text-center'>
              Target Compliance
            </Col>
            <Col xs={isAdmin ? 2 : 4} style={{ fontSize: '14px' }} className='text-center'>
              Export
            </Col>
          </Row>
            <Row>
              <Col>
        {filteredEvents.map((event: any) => (
          <div key={event.eventId}>
            <p>{event.title}</p>
            {/* Add more event details as needed */}
          </div>
        ))}
        </Col>
      </Row>
    </div>
  )
}