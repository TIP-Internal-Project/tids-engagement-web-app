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
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchUnregisteredEvents } from '../redux/unregisteredEventsSlice'
import { fetchRegisteredEvents } from '../redux/registeredEventsSlice'
import { register } from '../redux/eventRegistrationSlice'
import { Email } from './profileSettingsComponents/style'

interface EventModalProps {
  show: boolean
  onHide: () => void
  // addedEvents: (orders: OrderState) => void
}

export const EventPanel2 = (props: any) => {
  const dispatch = useAppDispatch()

  const [eventModalShow, setEventModalShow] = useState(false)
  const handleOpenEventModal = () => {
    setEventModalShow(true)
  }

  const [action, setAction] = useState('')

  const [event, setEvent] = useState(null)

  const handleCloseEventModal = () => {
    setEventModalShow(false)
  }
  const [detailsModalShow, setDetailsModalShow] = useState(false)
  const handleOpenDetailsModal = (action: string, event: any) => {
    setDetailsModalShow(true)
    setAction(action)
    setEvent(event)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalShow(false)
  }

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
    width: '115px',
    height: '30px',
    margin: '3px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
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
  const [sortOption, setSortOption] = useState<string>()
  const [filterOption, setFilterOption] = useState<string>()
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

  const handleRegister = async (eventId: any, email: any) => {
    setSortedEvents([])
    setSortedEvents1([])
    setSortOption('asc')
    setFilterOption('')
    await dispatch(register({ eventId, email }))
    const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
    const registeredEventsArray = Object.values(registeredEventsData.payload)
    const sortedRegisteredEvents = registeredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    setSortedEvents1(sortedRegisteredEvents as Event[])
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    setSortedEvents(sortedUnregisteredEvents as Event[])
  }

  const handleRefresh = async (email: any) => {
    setSortedEvents([])
    setSortedEvents1([])
    setSortOption('asc')
    setFilterOption('')
    const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
    const registeredEventsArray = Object.values(registeredEventsData.payload)
    const sortedRegisteredEvents = registeredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    setSortedEvents1(sortedRegisteredEvents as Event[])
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    setSortedEvents(sortedUnregisteredEvents as Event[])
  }

  const handleSortOption = (option: string) => {
    setSortOption(option)
    setShowSortDropdown(false)
  }

  const handleFilterOption = (option: string) => {
    setFilterOption(option)
    setShowFilterDropdown(false)
  }

  const handleChangeInData = () => {
    setDetailsModalShow(false)
    handleRefresh(props.variable)
  }

  useEffect(() => {
    const sort = async () => {
      setSortedEvents([])
      setSortedEvents1([])
      const email = props.variable
      if (filterOption === null || filterOption === '' || filterOption === undefined) {
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
        if (sortOption === 'asc' || sortOption === undefined) {
          const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
          const registeredEventsArray = Object.values(registeredEventsData.payload)
          const filteredRegisteredEvents = registeredEventsArray.filter(
            (event: any) => event.category === filterOption
          )
          const sortedRegisteredEvents = filteredRegisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const filteredUnregisteredEvents = unregisteredEventsArray.filter(
            (event: any) => event.category === filterOption
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
            (event: any) => event.category === filterOption
          )
          const sortedRegisteredEvents = filteredRegisteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
          )
          setSortedEvents1(sortedRegisteredEvents as Event[])
          const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
          const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
          const filteredUnregisteredEvents = unregisteredEventsArray.filter(
            (event: any) => event.category === filterOption
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

  // export { sortedEvents, sortedEvents1 }

  const handleCloseModal = () => {
    setModalShow(false)
    setModalData([])
  }

  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const renderedUnregisteredEvents = Object.values(sortedEvents).map((event: any, index) => {
    const formattedDate = new (window.Date as any)(event.startDate).toLocaleDateString(
      {},
      { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric' }
    )
    const time = new Date(event.startDate)
    const timeString = time.toLocaleTimeString().slice(0,-3)

    // Convert 24 Clock to 12 Hour Clock
    const newformat = time.getHours() >= 12 ? 'PM' : 'AM'
    const hours = parseInt(timeString.slice(0,3))
    const finalHour = newformat === 'PM' && timeString.slice(0,2) != '12' ? '0' + (hours-12).toString() : hours
    let formattedTime = timeString + ' ' + newformat


    formattedTime = finalHour + formattedTime.slice(2,)


    return (
      <ListGroup key={event.eventId}>
        <ListGroup.Item
          style={{ borderLeft: 'none', borderRight: 'none', borderRadius: '0px' }}
          className='px-5'
        >
          <Row className='py-2'>
            <Col xs={4} style={IndItemTitleDisplay}>
              <p
                onClick={() => handleOpenModal(event, false)}
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='mb-0 ps-4'
              >
                {event.title}
              </p>
              <Button
                onClick={() => handleOpenModal(event, false)}
                style={viewDetailsButton}
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='ms-4'
              >
                View details
              </Button>
            </Col>

            <Col xs={2} style={IndItemDueDate} className='text-center'>
              <div style={{ display: 'inline-block', textAlign: 'left' }}>
                <p style={IndItemDueDateDisplay} className='mb-0'>
                  {formattedDate}
                </p>
                <p style={IndItemDueTimeDisplay}>{formattedTime}</p>
              </div>
            </Col>

            <Col xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                style={
                  event.category === 'TIDS'
                    ? tidsBadge
                    : event.category === 'TEAM EVENT'
                    ? teamBadge
                    : event.category === 'COP'
                    ? copBadge
                    : happyBadge
                }
                className='py-2'
              >
                {event.category}
              </Button>
            </Col>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              <Button
                onClick={() => handleRegister(event.eventId, props.variable)}
                className='bg-success border-success'
                style={actionBadge}
              >
                {' '}
                REGISTER
              </Button>
              <Button
                onClick={() => handleOpenDetailsModal('edit', event)}
                className='bg-success border-success'
                style={actionBadge}
              >
                {' '}
                MODIFY
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    )
  })

  const renderedRegisteredEvents = Object.values(sortedEvents1).map((event: any, index) => {
    const formattedDate = new (window.Date as any)(event.startDate).toLocaleDateString(
      {},
      { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric' }
    )
    const time = new Date(event.startDate)
    const timeString = time.toLocaleTimeString().slice(0,-3)

    // Convert 24 Clock to 12 Hour Clock
    const newformat = time.getHours() >= 12 ? 'PM' : 'AM'
    const hours = parseInt(timeString.slice(0,3))
    const finalHour = newformat === 'PM' && timeString.slice(0,2) != '12' ? '0' + (hours-12).toString() : hours
    let formattedTime = timeString + ' ' + newformat
    formattedTime = finalHour + formattedTime.slice(2,)

    return (
      <ListGroup key={event.eventId}>
        <ListGroup.Item
          style={{ borderLeft: 'none', borderRight: 'none', borderRadius: '0px' }}
          className='px-5'
        >
          <Row className='py-2'>
            <Col xs={6} style={IndItemTitleDisplay}>
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

            <Col xs={2} style={IndItemDueDate} className='text-center'>
              <div style={{ display: 'inline-block', textAlign: 'left' }}>
                <p style={IndItemDueDateDisplay} className='mb-0'>
                  {formattedDate}
                </p>
                <p style={IndItemDueTimeDisplay}>{formattedTime}</p>
              </div>
            </Col>

            <Col xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                style={
                  event.category === 'TIDS'
                    ? tidsBadge
                    : event.category === 'TEAM EVENT'
                    ? teamBadge
                    : event.category === 'COP'
                    ? copBadge
                    : happyBadge
                }
                className='py-2'
              >
                {event.category}
              </Button>
            </Col>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                paddingTop: '1%',
                fontWeight: 'bold',
              }}
            >
              <p>Registered</p>
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
        {isAdmin && (
          <Col xs={8} className='px-5' style={{ color: '#7175B' }}>
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
              <p className='textStyle' onClick={() => handleFilterOption('#HAPPYHERE')}>
                <a>#HAPPYHERE</a>
              </p>
              <p className='textStyle' onClick={() => handleFilterOption('COP')}>
                <a>COP</a>
              </p>
              <p className='textStyle' onClick={() => handleFilterOption('TEAM EVENT')}>
                <a>TEAM EVENT</a>
              </p>
              <p
                className='textStyle'
                style={{ marginBottom: '0' }}
                onClick={() => handleFilterOption('TIDS')}
              >
                <a>TIDS</a>
              </p>
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

        {sortedEvents1.length > 0 ? (
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

        {sortedEvents.length > 0 ? (
          <Row style={TitleBar} className='px-5'>
            <Col xs={4} style={{ fontSize: '14px' }}>
              Title
            </Col>
            <Col xs={2} style={{ fontSize: '14px' }} className='text-center'>
              Date
            </Col>
            <Col xs={2} style={{ fontSize: '14px' }} className='text-center'>
              Category
            </Col>
            <Col style={{ fontSize: '14px' }} className='text-center'>
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
          onSortedEvents={handleSortedEvents}
          onSortedEvents1={handleSortedEvents1}
        />
        <DetailsModal
          show={detailsModalShow}
          onHide={handleCloseDetailsModal}
          onChange={handleChangeInData}
          event={event}
          action={action}
        />
      </Container>
    </Container>
  )
}
