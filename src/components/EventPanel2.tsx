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
import { fetchUnregisteredEvents } from '../redux/unregisteredEventsSlice'
import { fetchRegisteredEvents } from '../redux/registeredEventsSlice'
import { register } from '../redux/eventRegistrationSlice'
import { addStarPoints } from '../redux/addStarPointsSlice'
import Form from 'react-bootstrap/Form'
import { fetchGeolocation } from '../redux/geolocationSlice'
import axios from 'axios'
import { useLocation,useParams  } from 'react-router-dom'
import api from '../api.json'
import { Toast } from './Toast'


export const EventPanel2 = (props: any) => {
  const dispatch = useAppDispatch()

  // const [eventModalShow, setEventModalShow] = useState(false)
  const [action, setAction] = useState('')
  const [event, setEvent] = useState<any[]>([])
  const [detailsModalShow, setDetailsModalShow] = useState(false)
  const [eventToShow, setEventToShow] = useState(null)
  const location = useLocation()
  const [modalUrlParam, setModalUrlParam] = useState<string | null>(null)

  const handleOpenDetailsModal = (action: string, event: any) => {
    setDetailsModalShow(true)
    setAction(action)
    setEvent(event)
  }

 
    const  { modalUrl } = useParams()
  
  

  const handleCloseDetailsModal = () => {
    setDetailsModalShow(false)
  }

  const [deleteEventModalShow, setDeleteEventModalShow] = useState(false)

  const handleDeleteModalShow = (event: any) => {
    setModalData(event)
    setDeleteEventModalShow(true)
  }

  const handleDeleteModalClose = () => {
    setDeleteEventModalShow(false)
  }

  const [fileUploadModalShow, setFileUploadModalShow] = useState(false)

  const handleFileUploadModalClose = () => {
    setFileUploadModalShow(false)
  }

  const handleFileUploadModalShow = () => {
    setFileUploadModalShow(true)
  }


  const API_ROOT = api.ROOT


  const tidsBadge = {
    background: '#2A66FF',
    border: '#2A66FF',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const happyBadge = {
    backgroundColor: '#4B286D',
    border: '#4B286D',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const copBadge = {
    backgroundColor: '#FF0AE6',
    border: '#FF0AE6',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  }

  const teamBadge = {
    backgroundColor: '#66CC00',
    border: '#66CC00',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  }

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

  const IndItemDueDate: React.CSSProperties = {}

  const IndItemDueDateDisplay = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    color: '#252733',
  }

  const IndItemDueTimeDisplay = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    marginBottom: '0',
    color: '#C5C7CD',
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
    borderColor: '#198754'
  }

  const viewDetailsButton = {
    padding: '1px 2px',
    fontSize: '11px',
    background: 'none',
    border: 'none',
    color: 'green',
  }

  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

  const [modalData, setModalData] = useState<any[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortOption, setSortOption] = useState<string>('asc')
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
    
    axios.get(API_ROOT + '/events/getAllEvents')
      .then(response => {
        setEvent(response.data)
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
    
    
    const urlParams = new URLSearchParams(location.search)
    const modalUrl = urlParams.get('modalUrl')
    if (modalUrl) {
      setModalUrlParam(modalUrl)
    }
  }, [location])


  useEffect(() => {
    if (modalUrl && event.length > 0) {
      
      const fullUrl = `http://localhost:3000/events/${modalUrl}`
      const eventToShow = event.find(e => e.modalUrl === fullUrl)
      if (eventToShow) {
        handleOpenModal(eventToShow, false) 
      } else {
        console.log('No matching event found for URL:', fullUrl)
      }
    }
  }, [modalUrl, event])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const unregisteredEvents = useAppSelector((state) => state.unregisteredEvents)

  useEffect(() => {
    const email = props.variable
    dispatch(fetchUnregisteredEvents(email)).then((data: any) => {
      // Sort events based on date
      // const sortedEvents = data.sort((a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate), data)
      const unregisteredEventsArray = Object.values(data.payload)
      // Sort events based on event date
      const events = unregisteredEventsArray.sort(
        (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
      )
      setSortedEvents(events as Event[])
    })
  }, [])

  const [sortedEvents1, setSortedEvents1] = useState<Event[]>([])

  const registeredEvents = useAppSelector((state) => state.registeredEvents)
  useEffect(() => {
    const email = props.variable
    dispatch(fetchRegisteredEvents(email)).then((data: any) => {
      // Sort events based on date
      // const sortedEvents = data.sort((a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate), data)
      const registeredEventsArray = Object.values(data.payload)
      // Sort events based on event date
      const events = registeredEventsArray.sort(
        (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
      )
      setSortedEvents1(events as Event[])
    })
  }, [])

  const handleRegister = async (eventId: any, email: any, pointsToAdd: any) => {
    setSortedEvents([])
    setSortedEvents1([])
    setSortOption('asc')
    setFilterOption(['ALL'])
    const location = await dispatch(fetchGeolocation())
    console.log(location.payload)
    const address = location.payload
    await dispatch(register({ eventId, email, address }))
    const employeeName = localStorage.getItem('givenName') + ' ' + localStorage.getItem('familyName')
    await dispatch(addStarPoints({ employeeName, pointsToAdd }))
    const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
    const registeredEventsArray = Object.values(registeredEventsData.payload)
    const sortedRegisteredEvents = registeredEventsArray
      .sort((a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate))
    setSortedEvents1(sortedRegisteredEvents as Event[])
    console.log(sortedEvents1)
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray
      .sort((a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate))
    setSortedEvents(sortedUnregisteredEvents as Event[])
    console.log(sortedEvents) 

  }

  const handleRefresh = async (email: any) => {
    setSortedEvents([])
    setSortedEvents1([])
    setSortOption('asc')
    setFilterOption(['ALL'])
    const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
    const registeredEventsArray = Object.values(registeredEventsData.payload)
    const sortedRegisteredEvents = registeredEventsArray
      .sort((a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate))
      .filter((event: any) => event.status != 'Archived')
    setSortedEvents1(sortedRegisteredEvents as Event[])
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray
      .sort((a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate))
      .filter((event: any) => event.status != 'Archived')
    setSortedEvents(sortedUnregisteredEvents as Event[])
  }

  const handleSortOption = (option: string) => {
    setSortOption(option)
    setShowSortDropdown(false)
  }

  const handleFilterOption = (option: string[]) => {
    setFilterOption(option)
  }

  const handleChangeInData = () => {
    setDetailsModalShow(false)
    handleRefresh(props.variable)
  }

  const handleDelete = () => {
    setDeleteEventModalShow(false)
    handleRefresh(props.variable)
  }

  useEffect(() => {
    const sort = async () => {
      setSortedEvents([])
      setSortedEvents1([])
      const email = props.variable
      if (filterOption.includes('ALL')) {
        if (sortOption === 'asc') {
          const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
          const registeredEventsArray = Object.values(registeredEventsData.payload)
          const sortedRegisteredEvents = registeredEventsArray.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const sortedUnregisteredEvents = unregisteredEventsArray.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents(sortedUnregisteredEvents as Event[])
        } else if (sortOption === 'desc') {
          const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
          const registeredEventsArray = Object.values(registeredEventsData.payload)
          const sortedRegisteredEvents = registeredEventsArray.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const sortedUnregisteredEvents = unregisteredEventsArray.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents(sortedUnregisteredEvents as Event[])
        }
      } else {
        if (sortOption === 'asc') {
          const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
          const registeredEventsArray = Object.values(registeredEventsData.payload)
          const filteredRegisteredEvents = registeredEventsArray.filter(
            (event: any) => filterOption.includes(event.category)
          )
          const sortedRegisteredEvents = filteredRegisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const filteredUnregisteredEvents = unregisteredEventsArray.filter(
            (event: any) => filterOption.includes(event.category)
          )
          const sortedUnregisteredEvents = filteredUnregisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents(sortedUnregisteredEvents as Event[])
        } else if (sortOption === 'desc') {
          const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
          const registeredEventsArray = Object.values(registeredEventsData.payload)
          const filteredRegisteredEvents = registeredEventsArray.filter(
            (event: any) => filterOption.includes(event.category)
          )
          const sortedRegisteredEvents = filteredRegisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const filteredUnregisteredEvents = unregisteredEventsArray.filter(
            (event: any) => filterOption.includes(event.category)
          )
          const sortedUnregisteredEvents = filteredUnregisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents(sortedUnregisteredEvents as Event[])
        }
      }
    }
    sort()
  }, [sortOption, filterOption])

  const [modalShow, setModalShow] = useState(false)
  const [disableRegistration, setDisableRegistration] = useState(false)

  const handleSortedEvents = (events: Event[]) => {
    setSortedEvents(events)
    setModalShow(false)
  }

  const handleSortedEvents1 = (events: Event[]) => {
    setSortedEvents1(events)
    setModalShow(false)
  }

  const handleOpenModal = (event: any, disableButton: boolean) => {
    setModalShow(true)
    setModalData(event)
    setDisableRegistration(disableButton)
  }

  const handleCloseModal = () => {
    setModalShow(false)
    setModalData([])
  }

  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const setTimeFormat = (aDateString: string): string => {
    const aDate = new Date(aDateString)
    const timeString = aDate.toLocaleTimeString().slice(0, -6)
    const newFormat = aDate.getHours() >= 12 ? 'PM' : 'AM'
    return `${timeString} ${newFormat}`
  }

  const renderedUnregisteredEvents = Object.values(sortedEvents).filter((event: any) => event.status === 'Active'|| event.status === 'Inactive' || event.status === 'Completed').map((event: any) => {
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
            {isAdmin && (
            <Col xs={1} style={IndItemTitleDisplay}>
              <p className='mb-0'>
                {event.eventId}
              </p>
            </Col>)}

            <Col xs={isAdmin ? 3 : 4} style={IndItemTitleDisplay}>
              <p
                onClick={() => handleOpenModal(event, false)}
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='mb-0'
              >
                {event.title}
              </p>
              <Button
                onClick={() => handleOpenModal(event, false)}
                style={viewDetailsButton}
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='ms-0'
              >
                View details
              </Button>
            </Col>

            <Col xs={isAdmin ? 2 : 3} style={IndItemDueDate} className='text-center'>
              <div style={{ display: 'inline-block', textAlign: 'left' }}>
                <p style={IndItemDueDateDisplay} className='mb-0'>
                  {formattedDate}
                </p>
                <p style={IndItemDueTimeDisplay}>{setTimeFormat(event.startDate.slice(0, -1))}</p>
              </div>
            </Col>

            <Col xs={isAdmin ? 2 : 3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                style={
                  event.category === 'TIDS'
                    ? tidsBadge
                    : event.category === 'teamEvent'
                      ? teamBadge
                      : event.category === 'COP'
                        ? copBadge
                        : happyBadge
                }
                className='py-2'
              >
                {event.category == 'TIDS'
                  ? 'TIDS'
                  : event.category === 'teamEvent'
                    ? 'TEAM EVENT'
                    : event.category === 'COP'
                      ? 'COP'
                      : '#HAPPYHERE'}
              </Button>
            </Col>
            <Col xs={isAdmin ? 4 : 2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
                <Button
                  onClick={() => handleRegister(event.eventId, props.variable, event.starsNum)}
                  className={`bg-success border-success ${event.status === 'Inactive' || event.status === 'Completed' ? 'disabled' : ''}`}
                  style={actionBadge}
                  disabled={event.status === 'Inactive'}
                >
                  {' '}
                  REGISTER
                </Button>
              {isAdmin && (
                <Button
                  onClick={() => handleOpenDetailsModal('edit', event)}
                  className={`bg-success border-success' ${event.status === 'Completed' ? 'disabled' : ''}`}
                  style={actionBadge}
                >
                  {' '}
                  MODIFY
                </Button>
              )}
              {isAdmin && (
                <Button onClick={() => handleDeleteModalShow(event)} variant='success' style={{ width: '100px', backgroundColor: '#DC3545', fontSize: '11px', borderColor: '#DC3545' }}>ARCHIVE</Button>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    )
  })

  const renderedRegisteredEvents = Object.values(sortedEvents1).filter((event: any) => event.status === 'Inactive' || event.status === 'Active' || event.status === 'Completed').map((event: any) => {
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
            {isAdmin && (
            <Col xs={1} style={IndItemTitleDisplay}>
              <p className='mb-0'>
                {event.eventId}
              </p>
            </Col>)}

            <Col xs={isAdmin ? 3 : 4} style={IndItemTitleDisplay}>
              <p
                onClick={() => handleOpenModal(event, true)}
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='mb-0'
              >
                {event.title}
              </p>
              <Button
                onClick={() => handleOpenModal(event, true)}
                style={viewDetailsButton}
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
              >
                View details
              </Button>
            </Col>

            <Col xs={isAdmin ? 2 : 3} style={IndItemDueDate} className='text-center'>
              <div style={{ display: 'inline-block', textAlign: 'left' }}>
                <p style={IndItemDueDateDisplay} className='mb-0'>
                  {formattedDate}
                </p>
                <p style={IndItemDueTimeDisplay}>{setTimeFormat(event.startDate)}</p>
              </div>
            </Col>

            <Col xs={isAdmin ? 2 : 3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                style={
                  event.category === 'TIDS'
                    ? tidsBadge
                    : event.category === 'teamEvent'
                      ? teamBadge
                      : event.category === 'COP'
                        ? copBadge
                        : happyBadge
                }
                className='py-2'
              >
                {event.category == 'TIDS'
                  ? 'TIDS'
                  : event.category === 'teamEvent'
                    ? 'TEAM EVENT'
                    : event.category === 'COP'
                      ? 'COP'
                      : '#HAPPYHERE'}
              </Button>
            </Col>
            <Col xs={isAdmin ? 1 : 2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              <div style={{paddingRight: '5%'}}>
                Registered
              </div>
            </Col>
            {isAdmin && (
            <Col xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
              }}
            >
                <Button
                  onClick={() => handleOpenDetailsModal('edit', event)}
                  className={`bg-success border-success' ${event.status === 'Completed' ? 'disabled' : ''}`}
                  style={actionBadge}
                >
                  {' '}
                  MODIFY
                </Button>
                <Button onClick={() => handleDeleteModalShow(event)} variant='success' style={{ width: '100px', backgroundColor: '#DC3545', fontSize: '11px', borderColor: '#DC3545', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ARCHIVE</Button>
            </Col>)}
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
            {isAdmin && (
              <Col xs={8} style={{ color: '#7175B', paddingLeft: '2%', width: '-webkit-fill-available' }}>
                <Nav.Link
                  className=''
                  style={{ fontSize: '14px' }}
                  onClick={() => handleOpenDetailsModal('add', null)}
                >
                  <span className='mx-2' style={{ fontSize: '20px' }}>
                    +
                  </span>{' '}
                  Add new event here
                </Nav.Link>
              </Col>
            )}
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
            {isAdmin && (
            <Nav.Link
              className='mx-3'
              style={{ fontSize: '14px' }}
              onClick={handleFileUploadModalShow}
            >
              <img
                style={{ height: '15px', width: '15px', marginRight: '10px' , filter: 'opacity(0.4)'}}
                src={require('../assets/images/upload.png')}
              />
              Upload
            </Nav.Link>)}
          </div>
        </div>
        <Row style={TitleBar} className='px-5'>
          <Col style={{ fontSize: '14px' }}>Currently Registered</Col>
        </Row>

        {registeredEvents.loading && (
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
        {!registeredEvents.loading && registeredEvents.error ? (
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
            {'Error: ' + unregisteredEvents.error}
          </div>
        ) : null}

        {sortedEvents1.filter((event: any) => event.status != 'Archived').length > 0 ? (
          <div style={{ paddingBottom: '3%' }}>{renderedRegisteredEvents}</div>
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

        {sortedEvents.filter((event: any) => event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed').length > 0 ? (
          <Row style={TitleBar} className='px-5'>
            {isAdmin && (
              <Col xs={1} style={{ fontSize: '14px' }}>
              Event ID
            </Col>
            )}
            <Col xs={isAdmin? 3 : 4} style={{ fontSize: '14px' }}>
              Title
            </Col>
            <Col xs={isAdmin? 2 : 3} style={{ fontSize: '14px' }} className='text-center'>
              Date
            </Col>
            <Col xs={isAdmin? 2 : 3} style={{ fontSize: '14px' }} className='text-center'>
              Category
            </Col>
            <Col xs={isAdmin ? 4 : 2} style={{ fontSize: '14px' }} className='text-center'>
              Action
            </Col>
          </Row>
        ) : null}
        {unregisteredEvents.loading && (
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
        {!unregisteredEvents.loading && unregisteredEvents.error ? (
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
            {'Error: ' + unregisteredEvents.error}
          </div>
        ) : null}
        {renderedUnregisteredEvents}
        <EventModal
          show={modalShow}
          onHide={handleCloseModal}
          modalData={modalData}
          disableRegistration={disableRegistration}
          email={props.variable}
          showButtons={true}
          onSortedEvents={handleSortedEvents}
          onSortedEvents1={handleSortedEvents1}
        />
        {detailsModalShow && (
          <DetailsModal
            show={detailsModalShow}
            onHide={handleCloseDetailsModal}
            onChange={handleChangeInData}
            event={event}
            action={action}
          />)}
        <DeleteEventModal
          show={deleteEventModalShow}
          onHide={handleDeleteModalClose}
          onChange={handleDelete}
          modalData={modalData}
        />
        <FileUploadModal
          show={fileUploadModalShow}
          onHide={handleFileUploadModalClose}
        />
      </Container>
    </Container>
  )
}
