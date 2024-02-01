import React, { useEffect,CSSProperties  } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Form from 'react-bootstrap/Form'
import { fetchEvents } from '../redux/eventSlice'
import { ListGroup } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export const ReportsTable = () => {
  const dispatch = useAppDispatch()
  const eventsState = useAppSelector((state) => state.events)

  useEffect(() => {
   
    dispatch(fetchEvents())
  }, [dispatch])


  if (eventsState.loading) {
    return <p>Loading...</p>
  }

  if (eventsState.error) {
    return <p>Error: {eventsState.error}</p>
  }


// Styles

  const TitleBar = {
    paddingTop: '24px',
    color: '#9FA2B4',
  }

  const viewDetailsButton = {
    padding: '1px 2px',
    fontSize: '11px',
    background: 'none',
    border: 'none',
    color: 'green',
  }

  
  const IndItemDueTimeDisplay = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    marginBottom: '0',
    color: '#C5C7CD',
    marginLeft: '42px'
    
  }
  const IndItemDueDateDisplay = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    color: '#252733',
    paddingTop: '25px',
    marginLeft: '64px'
  }

  const IndIAttendace = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    color: '#252733',
    paddingTop: '25px',
    marginLeft: '25px'
  }

  const IndCompliance = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    color: '#252733',
    paddingTop: '25px',
    marginLeft: '25px'
  }
  
  const actionBadge = {
    width: '100px',
    height: '30px',
    margin: '3px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    borderColor: 'green'
    
  }
  

  const tableBorders: CSSProperties = {
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: '15px',
    borderRadius: '0',
    textAlign: 'center',
  
  }

  const tableBordersIndiv: CSSProperties = {
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: '15px',
    borderRadius: '0',
    textAlign: 'center',
    height: '111px',
    
  }


  const titleTableBorder: CSSProperties = {
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: '15px',
    borderRadius: '0',
    textAlign: 'left',
  }

  const GroupListBorder = {
    paddingRight: 'none',
    paddingLeft: 'none',
    
    
  }

  const radioBoxCol: CSSProperties = {
    maxWidth: '20px',
  
    display: 'flex',
    alignItems: 'center',
  }

  const radioBoxColTitle = {
    
  }


  const setTimeFormat = (aDateString: string): string => {
    const aDate = new Date(aDateString)
    const timeString = aDate.toLocaleTimeString().slice(0, -6)
    const newFormat = aDate.getHours() >= 12 ? 'PM' : 'AM'
    return `${timeString} ${newFormat}`
  }

  const formatDateTime = (dateString: string): { date: string; time: string } => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    } as const
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
    const time = setTimeFormat(dateString.slice(0, -1))
    return { date: formattedDate, time }
  }


  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

   

  const filteredEvents = eventsState.events.filter((event: any) => event.status !== 'Archived')

  return (
    
    <div>
    <Row style={TitleBar} className='px-5'>
      {isAdmin && (
        <>
          
          <Col style={titleTableBorder}>
          <p>Event Title</p>
          </Col>
        </>
      )}
      <Col style={tableBorders} className='text-center'>
        <p>Date</p>
      </Col>
      <Col style={tableBorders} className='text-center'>
        <p>Attendees</p>
      </Col>
      <Col style={tableBorders} className='text-center'>
        <p>Target Compliance</p>
      </Col>
      <Col style={tableBorders} className='text-center'>
        <p>Export</p>
      </Col>
    </Row>

    {filteredEvents.map((event: any) => (
      <ListGroup key={event.eventId} style={GroupListBorder}>
        <ListGroup.Item style={tableBordersIndiv}>
          <Row>
            {isAdmin && (
              <>
                
              <Col style={titleTableBorder} className="d-flex align-items-center">
                <div style={radioBoxCol}>
                  <Form.Check type='radio' aria-label='selected' name='selectedEvent' />
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <p>{event.title}</p>
                  <Button style={viewDetailsButton}> View details </Button>
                </div>
              </Col>
              </>
            )}
            <Col style={tableBordersIndiv}>
                <p style={IndItemDueDateDisplay} className='mb-0'>
                  {formatDateTime(event.startDate).date}
                </p>
                <p style={IndItemDueTimeDisplay}>{formatDateTime(event.startDate).time}</p>
              </Col>
              <Col style={IndIAttendace}>
                {event.attendees ? <p>{event.attendees}%</p> : null}
              </Col>
              <Col style={IndCompliance}>
                {event.targetCompliance ? <p>{event.targetCompliance}%</p> : null}
              </Col>
            <Col style={IndCompliance}>
                 <div style={{ display: 'flex' }}>
                  <Button  style={actionBadge} className='bg-success border-success'>PDF</Button>
                  <Button style={actionBadge} className='bg-success border-success'>Sheet</Button>
                </div>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    ))}
  </div>
  )
}