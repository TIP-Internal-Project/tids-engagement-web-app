import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventModal from './EventModal'
import DetailsModal from './DetailsModal'
import DeleteEventModal from './DeleteEventModal'
import FileUploadModal from './FileUploadModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { register } from '../redux/eventRegistrationSlice'
import { addStarPoints } from '../redux/addStarPointsSlice'
import { fetchEvents } from '../redux/eventSlice'
import Form from 'react-bootstrap/Form'
import { fetchGeolocation } from '../redux/geolocationSlice'
import axios from 'axios'
import { useLocation,useParams  } from 'react-router-dom'
import api from '../api.json'


export const ExpensePanel = (props: any) => {
  const dispatch = useAppDispatch()

  // const [eventModalShow, setEventModalShow] = useState(false)
  const [action, setAction] = useState('')
  const [event, setEvent] = useState<any[]>([])
  const [detailsModalShow, setDetailsModalShow] = useState(false)
  const location = useLocation()

  const API_ROOT = api.ROOT

  const TitleBar = {
    paddingTop: '24px',
    color: '#9FA2B4',
  }

  const IndItemTitleDisplay = {
    fontFamily: 'Mulish',
    color: '#2A2C2E',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '24px',
    FontStyle: 'normal',
    marginBottom: '0',
  }

  const amountDisplay = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    color: '#252733',
  }

  const actionBadge = {
    width: '150px',
    height: '30px',
    margin: '3px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    borderColor: '#198754'
  }


  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortOption, setSortOption] = useState<string>('desc')
  const [filterOption, setFilterOption] = useState<string[]>(['ALL'])
  const [sortedEvents, setSortedEvents] = useState<Event[]>([])
  const dropdownSortRef = useRef<HTMLDivElement>(null)
  const dropdownFilterRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownSortRef.current && !dropdownSortRef.current.contains(event.target as Node)) {
      setShowSortDropdown(false)
    }
    if (dropdownFilterRef.current && !dropdownFilterRef.current.contains(event.target as Node)) {
      setShowFilterDropdown(false)
    }
  }

  const handleSortButtonClick = () => {
    setShowSortDropdown((prevShowSortDropdown) => !prevShowSortDropdown)
  }

  const handleFilterButtonClick = () => {
    setShowFilterDropdown((prevShowFilterDropdown) => !prevShowFilterDropdown)
  }


  useEffect(() => {
    console.log('on load..')
    axios.get(API_ROOT + '/events/getAllEvents')
      .then(response => {
        console.log('get data..')
        setEvent(response.data)
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
    
  }, [location])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    const email = props.variable
    dispatch(fetchEvents()).then((data: any) => {
      // Sort events based on date 
      const eventsArray = Object.values(data.payload)
      // Sort events based on event date
      const events = eventsArray.sort(
        (a: any, b: any) => new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
      )
      setSortedEvents(events as Event[])
    })
  }, [])


  const events = useAppSelector((state) => state.events)


  const handleRefresh = async (email: any) => {
    setSortedEvents([])
    setSortOption('desc')
    setFilterOption(['ALL'])
    const sortedEvents = event
      .sort((a: any, b: any) => new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate))
      .filter((event: any) => event.status != 'Archived')
    setSortedEvents(sortedEvents as Event[])
  }

  const handleSortOption = (option: string) => {
    setSortOption(option)
    setShowSortDropdown(false)
  }

  const handleFilterOption = (option: string[]) => {
    setFilterOption(option)
  }
  useEffect(() => {
    console.log('Sorting..')
    const sort = async () => {
      setSortedEvents([])
      if (filterOption.includes('ALL')) {
        if (sortOption === 'asc') {
          const eventsData = await dispatch(fetchEvents())
          const eventsArray = Object.values(eventsData.payload)
          const sortedEvents = eventsArray.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents(sortedEvents as Event[])
        } else if (sortOption === 'desc') {
          const eventsData = await dispatch(fetchEvents())
          const eventsArray = Object.values(eventsData.payload)
          const sortedEvents = eventsArray.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents(sortedEvents as Event[])
        }
      } else {
        if (sortOption === 'asc') {
          const eventsData = await dispatch(fetchEvents())
          const eventsArray = Object.values(eventsData.payload)
          const filteredEvents = eventsArray.filter(
            (event: any) => filterOption.includes(event.category)
          )
          const sortedEvents = filteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents(sortedEvents as Event[])
        } else if (sortOption === 'desc') {
          const eventsData = await dispatch(fetchEvents())
          const eventsArray = Object.values(eventsData.payload)
          const filteredEvents = eventsArray.filter(
            (event: any) => filterOption.includes(event.category)
          )
          const sortedEvents = filteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents(sortedEvents as Event[])
        }
      }
    }
    sort()
  }, [sortOption, filterOption])

  const [modalShow, setModalShow] = useState(false)
  const [disableRegistration, setDisableRegistration] = useState(false)


  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const setTimeFormat = (aDateString: string): string => {
    const aDate = new Date(aDateString)
    const timeString = aDate.toLocaleTimeString().slice(0, -6)
    const newFormat = aDate.getHours() >= 12 ? 'PM' : 'AM'
    return `${timeString} ${newFormat}`
  }

  const renderedEvents = Object.values(sortedEvents).filter((event: any) =>  event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed').map((event: any) => {
    const formattedDate = new (window.Date as any)(event.startDate).toLocaleDateString(
      {},
      { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric' }
    )

    return (
      <ListGroup key={event.eventId}>
        <ListGroup.Item
          style={{ borderLeft: 'none', borderRight: 'none', borderRadius: '0px' }}
          className='px-5'
        >
          <Row className='py-2'>

            <Col xs={3} style={IndItemTitleDisplay}>
              <p
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='mb-0'
              >
                {event.title}
              </p>
            </Col>

            <Col xs={3} className='text-center'>
              <div style={{ display: 'inline-block', textAlign: 'left' }}>
                <p style={amountDisplay} className='mb-0'>
                  {event.estimatedBudget}
                </p>
              </div>
            </Col>

            <Col xs={3} className='text-center'>
              
            </Col>
            <Col xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
                <Button
                  variant='success'
                  style={actionBadge}
                >
                  {' '}
                  ADD EXPENSE
                </Button>
                <Button 
                  variant='success' 
                  style={actionBadge}
                >
                  MODIFY EXPENSE
                </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    )
  })

  return (
    <Container
      fluid
      style={{ backgroundColor: '#f5f5f5', height: '100vh', width: '100%', padding: '32px' }}
      className='mx-auto'
    >
      <Container
        fluid
        style={{ backgroundColor: 'white', height: '100%', width: '100%', borderRadius: '20px' }}
        className='px-0 py-4'
      >
        <div className="d-flex justify-content-between" style={{ color: '#7175B', padding: '0 2%' }}>
          <div style={{ width: '250px' }}>
          </div>
          <div className='d-flex flex-row-reverse px-5'>
            <Nav.Link className='mx-3 ' style={{ fontSize: '14px' }} onClick={handleFilterButtonClick}>
              <img
                style={{ height: '15px', width: '14px', marginRight: '10px' }}
                src={require('../assets/images/filter.png')}
              />
              Filter
            </Nav.Link>
            {showFilterDropdown && (
              <div ref={dropdownFilterRef} className='floating-div2'>
                <Form style={{ fontSize: '14px' }}>
                  {['ALL', 'happyhere', 'COP', 'teamEvent', 'TIDS'].map((value) => {
                    let label = value
                    if (value === 'happyhere') {
                      label = '#HAPPYHERE'
                    } else if (value === 'teamEvent') {
                      label = 'TEAM EVENT'
                    }
                    return <div key={`default-${value}`}>
                      <Form.Check
                        id={`default-${value}`}
                        label={label}
                        onChange={() => {
                          const newFilterOption = [...filterOption]
                          if (newFilterOption.includes(value)) {
                            newFilterOption.splice(newFilterOption.indexOf(value), 1)
                          } else {
                            if (value === 'ALL') {
                              newFilterOption.length = 0
                            } else if (filterOption.includes('ALL')) {
                              newFilterOption.splice(newFilterOption.indexOf('ALL'), 1)
                            }
                            newFilterOption.push(value)
                          }
                          setFilterOption(newFilterOption)
                          handleFilterOption(newFilterOption)
                        }}
                        checked={filterOption.includes(value)}
                      />
                    </div>
                  })}
                </Form>
              </div>
            )}

            <Nav.Link className='mx-3 ' style={{ fontSize: '14px' }} onClick={handleSortButtonClick}>
              <img
                style={{ height: '15px', width: '15px', marginRight: '10px' }}
                src={require('../assets/images/sort-up.png')}
              />
              Sort
            </Nav.Link>
            {showSortDropdown && (
              <div ref={dropdownSortRef} className='floating-div'>
                <p className='textStyle' onClick={() => handleSortOption('asc')}>
                  <a>Sort by Date Ascending</a>
                </p>
                <p
                  className='textStyle'
                  style={{ marginBottom: '0' }}
                  onClick={() => handleSortOption('desc')}
                >
                  <a>Sort by Date Descending</a>
                </p>
              </div>
            )}

            <Nav.Link
              className='mx-3'
              style={{ fontSize: '14px' }}
              onClick={() => handleRefresh(props.variable)}
            >
              <img
                style={{ height: '22px', width: '19px', marginRight: '10px' }}
                src={require('../assets/images/refresh.png')}
              />
              Refresh
            </Nav.Link>
          </div>
        </div>

        {sortedEvents.filter((event: any) => event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed').length > 0 ? (
          <Row style={TitleBar} className='px-5'>
            <Col xs={3} style={{ fontSize: '14px' }}>
              Title
            </Col>
            <Col xs={3} style={{ fontSize: '14px' }} className='text-center'>
              Estimated Budget
            </Col>
            <Col xs={3} style={{ fontSize: '14px' }} className='text-center'>
              Actual Budget
            </Col>
            <Col xs={3} style={{ fontSize: '14px' }} className='text-center'>
              Action
            </Col>
          </Row>
        ) : null}
        {events.loading && (
          <div
            style={{
              borderTop: '0.5px solid #9FA2B4',
              textAlign: 'center',
              color: '#9FA2B4',
              paddingTop: '3%',
              paddingBottom: '4%',
              fontSize: '14px',
            }}
          >
            {'Loading...'}
          </div>
        )}
        {!events.loading && events.error ? (
          <div
            style={{
              borderTop: '0.5px solid #9FA2B4',
              textAlign: 'center',
              color: '#9FA2B4',
              paddingTop: '3%',
              paddingBottom: '4%',
              fontSize: '14px',
            }}
          >
            {'Error: ' + events.error}
          </div>
        ) : null}
        {sortedEvents.filter((event: any) => event.status != 'Archived').length > 0 ? (
          <div style={{ paddingBottom: '3%' }}>{renderedEvents}</div>
        ) : (
          <div
            style={{
              borderTop: '0.5px solid #9FA2B4',
              textAlign: 'center',
              color: '#9FA2B4',
              paddingTop: '3%',
              paddingBottom: '4%',
              fontSize: '14px',
            }}
          >
            No Events
          </div>
        )}
      </Container>
    </Container>
  )
}
