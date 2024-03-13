import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventModal from '../EventModal'
import DetailsModal from '../DetailsModal'
import DeleteEventModal from '../DeleteEventModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchUnregisteredEvents } from '../../redux/unregisteredEventsSlice'
import { fetchRegisteredEvents } from '../../redux/registeredEventsSlice'
import { register } from '../../redux/eventRegistrationSlice'
import { addStarPoints } from '../../redux/addStarPointsSlice'
import Form from 'react-bootstrap/Form'
import { fetchGeolocation } from '../../redux/geolocationSlice'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import api from '../../api.json'
import { Dropdown, Pagination } from 'react-bootstrap'
import {
  IndItemTitleDisplay,
  tidsBadge,
  teamBadge,
  copBadge,
  happyBadge,
  TitleBar,
  IndItemDueDateDisplay,
  IndItemDueTimeDisplay,
  actionBadge,
  paginationStyle,
  viewDetailsButton,
} from './style'
import { setTimeFormat } from './utils'
import FileUploadModal from '../FileUploadModal'

export const EventPanel2 = (props: any) => {
  const dispatch = useAppDispatch()
  const { modalUrl } = useParams()
  const location = useLocation()

  const [action, setAction] = useState('')
  const [event, setEvent] = useState<any[]>([])
  const [detailsModalShow, setDetailsModalShow] = useState(false)

  const [modalUrlParam, setModalUrlParam] = useState<string | null>(null)
  const [deleteEventModalShow, setDeleteEventModalShow] = useState(false)
  const [fileUploadModalShow, setFileUploadModalShow] = useState(false)
  const [modalData, setModalData] = useState<any[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortOption, setSortOption] = useState<string>('asc')
  const [filterOption, setFilterOption] = useState<string[]>(['ALL'])
  const [sortedEvents, setSortedEvents] = useState<Event[]>([])
  const [sortedEvents1, setSortedEvents1] = useState<Event[]>([])
  const [modalShow, setModalShow] = useState(false)
  const [disableRegistration, setDisableRegistration] = useState(false)

  // Registered Events Pagination
  const [regEventsPerPage, setRegEventsPerPage] = useState(5)
  const [currentRegPage, setCurrentRegPage] = useState(1)

  // Unregistered Events Pagination
  const [unregEventsPerPage, setUnregEventsPerPage] = useState(5)
  const [currentUnregPage, setCurrentUnregPage] = useState(1)

  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const unregisteredEvents = useAppSelector((state) => state.unregisteredEvents)
  const registeredEvents = useAppSelector((state) => state.registeredEvents)

  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false
  const API_ROOT = api.ROOT
  const IndItemDueDate: React.CSSProperties = {}
  const dropdownSortRef = useRef<HTMLDivElement>(null)
  const dropdownFilterRef = useRef<HTMLDivElement>(null)

  const indexOfLastRegEvent = currentRegPage * regEventsPerPage
  const indexOfFirstRegEvent = indexOfLastRegEvent - regEventsPerPage
  const currentRegEvents = Object.values(sortedEvents1)
    .filter(
      (event: any) =>
        event.status === 'Inactive' || event.status === 'Active' || event.status === 'Completed'
    )
    .slice(indexOfFirstRegEvent, indexOfLastRegEvent)
  const totalRegEventsPages = Math.ceil(
    Object.values(sortedEvents1).filter(
      (event: any) =>
        event.status === 'Inactive' || event.status === 'Active' || event.status === 'Completed'
    ).length / regEventsPerPage
  )

  const indexOfLastUnregEvent = currentUnregPage * unregEventsPerPage
  const indexOfFirstUnregEvent = indexOfLastUnregEvent - unregEventsPerPage
  const currentUnRegEvents = Object.values(sortedEvents)
    .filter(
      (event: any) =>
        event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed'
    )
    .slice(indexOfFirstUnregEvent, indexOfLastUnregEvent)
  const totalUnregEventsPages = Math.ceil(
    Object.values(sortedEvents).filter(
      (event: any) =>
        event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed'
    ).length / unregEventsPerPage
  )

  useEffect(() => {
    axios
      .get(API_ROOT + '/events/getAllEvents')
      .then((response) => {
        setEvent(response.data)
      })
      .catch((error) => {
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
      const eventToShow = event.find((e) => e.modalUrl === fullUrl)
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
          const filteredRegisteredEvents = registeredEventsArray.filter((event: any) =>
            filterOption.includes(event.category)
          )
          const sortedRegisteredEvents = filteredRegisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const filteredUnregisteredEvents = unregisteredEventsArray.filter((event: any) =>
            filterOption.includes(event.category)
          )
          const sortedUnregisteredEvents = filteredUnregisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents(sortedUnregisteredEvents as Event[])
        } else if (sortOption === 'desc') {
          const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
          const registeredEventsArray = Object.values(registeredEventsData.payload)
          const filteredRegisteredEvents = registeredEventsArray.filter((event: any) =>
            filterOption.includes(event.category)
          )
          const sortedRegisteredEvents = filteredRegisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const filteredUnregisteredEvents = unregisteredEventsArray.filter((event: any) =>
            filterOption.includes(event.category)
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

  const handleOpenDetailsModal = (action: string, event: any) => {
    setDetailsModalShow(true)
    setAction(action)
    setEvent(event)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalShow(false)
  }

  const handleDeleteModalShow = (event: any) => {
    setModalData(event)
    setDeleteEventModalShow(true)
  }

  const handleDeleteModalClose = () => {
    setDeleteEventModalShow(false)
  }

  const handleFileUploadModalClose = () => {
    setFileUploadModalShow(false)
  }

  const handleFileUploadModalShow = () => {
    setFileUploadModalShow(true)
  }

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
    const sortedRegisteredEvents = registeredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    setSortedEvents1(sortedRegisteredEvents as Event[])
    console.log(sortedEvents1)
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
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
      .sort(
        (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
      )
      .filter((event: any) => event.status != 'Archived')
    setSortedEvents1(sortedRegisteredEvents as Event[])
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray
      .sort(
        (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
      )
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

  const handleRegPageChange = (pageNumber: number) => {
    setCurrentRegPage(pageNumber)
  }

  const handleRegEventsPerPageChange = (value: number) => {
    setRegEventsPerPage(value)
    setCurrentRegPage(1)
  }

  const handleUnregPageChange = (pageNumber: number) => {
    setCurrentUnregPage(pageNumber)
  }

  const handleUnregEventsPerPageChange = (value: number) => {
    setUnregEventsPerPage(value)
    setCurrentUnregPage(1)
  }

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

  const renderedUnregisteredEvents = currentUnRegEvents.map((event: any) => {
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
                <p className='mb-0'>{event.eventId}</p>
              </Col>
            )}

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

            <Col
              xs={isAdmin ? 2 : 3}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
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
            <Col
              xs={isAdmin ? 4 : 2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              <Button
                onClick={() => handleRegister(event.eventId, props.variable, event.starsNum)}
                className={`bg-success border-success ${
                  event.status === 'Inactive' || event.status === 'Completed' ? 'disabled' : ''
                }`}
                style={actionBadge}
                disabled={event.status === 'Inactive'}
              >
                {' '}
                REGISTER
              </Button>
              {isAdmin && (
                <Button
                  onClick={() => handleOpenDetailsModal('edit', event)}
                  className={`bg-success border-success' ${
                    event.status === 'Completed' ? 'disabled' : ''
                  }`}
                  style={actionBadge}
                >
                  {' '}
                  MODIFY
                </Button>
              )}
              {isAdmin && (
                <Button
                  onClick={() => handleDeleteModalShow(event)}
                  variant='success'
                  style={{
                    width: '100px',
                    backgroundColor: '#DC3545',
                    fontSize: '11px',
                    borderColor: '#DC3545',
                  }}
                >
                  ARCHIVE
                </Button>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    )
  })

  const renderedRegisteredEvents = currentRegEvents.map((event: any) => {
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
                <p className='mb-0'>{event.eventId}</p>
              </Col>
            )}

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

            <Col
              xs={isAdmin ? 2 : 3}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
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
            <Col
              xs={isAdmin ? 1 : 2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              <div style={{ paddingRight: '5%' }}>Registered</div>
            </Col>
            {isAdmin && (
              <Col
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}
              >
                <Button
                  onClick={() => handleOpenDetailsModal('edit', event)}
                  className={`bg-success border-success' ${
                    event.status === 'Completed' ? 'disabled' : ''
                  }`}
                  style={actionBadge}
                >
                  {' '}
                  MODIFY
                </Button>
                <Button
                  onClick={() => handleDeleteModalShow(event)}
                  variant='success'
                  style={{
                    width: '100px',
                    backgroundColor: '#DC3545',
                    fontSize: '11px',
                    borderColor: '#DC3545',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ARCHIVE
                </Button>
              </Col>
            )}
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
        <div className='d-flex justify-content-between' style={{ color: '#7175B', padding: '0 2%' }}>
          <div style={{ width: '250px' }}>
            {isAdmin && (
              <Col
                xs={8}
                style={{ color: '#7175B', paddingLeft: '2%', width: '-webkit-fill-available' }}
              >
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
                src={require('../../assets/images/filter.png')}
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
                    return (
                      <div key={`default-${value}`}>
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
                    )
                  })}
                </Form>
              </div>
            )}
            <Nav.Link className='mx-3 ' style={{ fontSize: '14px' }} onClick={handleSortButtonClick}>
              <img
                style={{ height: '15px', width: '15px', marginRight: '10px' }}
                src={require('../../assets/images/sort-up.png')}
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
                src={require('../../assets/images/refresh.png')}
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
                  style={{ height: '15px', width: '15px', marginRight: '10px', filter: 'opacity(0.4)' }}
                  src={require('../../assets/images/upload.png')}
                />
                Upload
              </Nav.Link>
            )}
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

        <div className='d-flex justify-content-center align-items-center'>
          <div style={paginationStyle}>
            <Pagination>
              <Pagination.First onClick={() => handleRegPageChange(1)} disabled={currentRegPage === 1} />
              <Pagination.Prev
                onClick={() => handleRegPageChange(currentRegPage - 1)}
                disabled={currentRegPage === 1}
              />
              {[...Array(totalRegEventsPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentRegPage}
                  onClick={() => handleRegPageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handleRegPageChange(currentRegPage + 1)}
                disabled={currentRegPage === totalRegEventsPages}
              />
              <Pagination.Last
                onClick={() => handleRegPageChange(totalRegEventsPages)}
                disabled={currentRegPage === totalRegEventsPages}
              />
            </Pagination>
          </div>

          <div>
            <Dropdown className='mx-2'>
              <Dropdown.Toggle variant='outline-primary' id='dropdown-basic'>
                {regEventsPerPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleRegEventsPerPageChange(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRegEventsPerPageChange(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleRegEventsPerPageChange(20)}>20</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {sortedEvents.filter(
          (event: any) =>
            event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed'
        ).length > 0 ? (
          <Row style={TitleBar} className='px-5'>
            {isAdmin && (
              <Col xs={1} style={{ fontSize: '14px' }}>
                Event ID
              </Col>
            )}
            <Col xs={isAdmin ? 3 : 4} style={{ fontSize: '14px' }}>
              Title
            </Col>
            <Col xs={isAdmin ? 2 : 3} style={{ fontSize: '14px' }} className='text-center'>
              Date
            </Col>
            <Col xs={isAdmin ? 2 : 3} style={{ fontSize: '14px' }} className='text-center'>
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
          />
        )}

        <div className='d-flex justify-content-center align-items-center'>
          <div style={paginationStyle}>
            <Pagination>
              <Pagination.First
                onClick={() => handleUnregPageChange(1)}
                disabled={currentUnregPage === 1}
              />
              <Pagination.Prev
                onClick={() => handleUnregPageChange(currentUnregPage - 1)}
                disabled={currentUnregPage === 1}
              />
              {[...Array(totalUnregEventsPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentUnregPage}
                  onClick={() => handleUnregPageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handleUnregPageChange(currentUnregPage + 1)}
                disabled={currentUnregPage === totalUnregEventsPages}
              />
              <Pagination.Last
                onClick={() => handleUnregPageChange(totalUnregEventsPages)}
                disabled={currentUnregPage === totalUnregEventsPages}
              />
            </Pagination>
          </div>

          <div>
            <Dropdown className='mx-2'>
              <Dropdown.Toggle variant='outline-primary' id='dropdown-basic'>
                {unregEventsPerPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUnregEventsPerPageChange(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUnregEventsPerPageChange(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUnregEventsPerPageChange(20)}>20</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <DeleteEventModal
          show={deleteEventModalShow}
          onHide={handleDeleteModalClose}
          onChange={handleDelete}
          modalData={modalData}
        />
        <FileUploadModal show={fileUploadModalShow} onHide={handleFileUploadModalClose} />
      </Container>
    </Container>
  )
}
