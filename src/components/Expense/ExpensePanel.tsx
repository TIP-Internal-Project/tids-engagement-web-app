import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ExpenseModal from './ExpenseModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchEvents } from '../../redux/eventSlice'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useLocation,useParams  } from 'react-router-dom'
import api from '../../api.json'
import './styles.css'


export const ExpensePanel = (props: any) => {
  const dispatch = useAppDispatch()
  const [action, setAction] = useState('')
  const [event, setEvent] = useState<any[]>([])
  const [addExpenseModalShow, setAddExpenseModalShow] = useState(false)
  const location = useLocation()
  const [modalData, setModalData] = useState<any[]>([])
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [sortOption, setSortOption] = useState<string>('desc')
  const [filterOption, setFilterOption] = useState<string[]>(['ALL'])
  const [sortedEvents, setSortedEvents] = useState<Event[]>([])
  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})
  const dropdownSortRef = useRef<HTMLDivElement>(null)
  const dropdownFilterRef = useRef<HTMLDivElement>(null)
  const API_ROOT = api.ROOT
  const events = useAppSelector((state) => state.events)

  useEffect(() => {
    axios.get(API_ROOT + '/events/getAllEvents')
      .then(response => {
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

  useEffect(() => {
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

  const handleOpenAddExpenseModal = (action: string, event: any) => {
    setAddExpenseModalShow(true)
    setAction(action)
    setEvent(event)
  }

  const handleCloseDetailsModal = () => {
    setAddExpenseModalShow(false)
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

  const renderedEvents = Object.values(sortedEvents).filter((event: any) =>  event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed').map((event: any) => {

    return (
      <ListGroup key={event.eventId}>
        <ListGroup.Item
          className='px-5 event-item-list'
        >
          <Row className='py-2'>

            <Col xs={3} className='ind-item-title-display'>
              <p
                aria-controls={`example-collapse-text-${event.eventId}`}
                aria-expanded={eventStates[event.eventId] ? 'true' : 'false'}
                className='mb-0'
              >
                {event.title}
              </p>
            </Col>

            <Col xs={3} className='text-center'>
              <div className='estimated-budget-display'>
                <p className='mb-0 amount-display'>
                  {event.estimatedBudget}
                </p>
              </div>
            </Col>

            <Col xs={3} className='text-center'>
              
            </Col>
            <Col xs={3}
              className='action-buttons-display'
            >
                <Button
                  variant='success'
                  className='action-badge'
                  onClick={() => handleOpenAddExpenseModal('add', event)}
                >
                  {' '}
                  ADD EXPENSE
                </Button>
                <Button 
                  variant='success' 
                  className='action-badge'
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
      className='mx-auto expense-container'
    >
      <Container
        fluid
        className='px-0 py-4 expense-container-inner'
      >
        <div className="d-flex justify-content-between nav-link-container">
          <div className='div-space'>
          </div>
          <div className='d-flex flex-row-reverse px-5'>
            <Nav.Link className='mx-3 nav-link-font-size' onClick={handleFilterButtonClick}>
              <img
                className='nav-link-filter-icon'
                src={require('../../assets/images/filter.png')}
              />
              Filter
            </Nav.Link>
            {showFilterDropdown && (
              <div ref={dropdownFilterRef} className='floating-div2'>
                <Form className='nav-link-font-size'>
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

            <Nav.Link className='mx-3 nav-link-font-size' onClick={handleSortButtonClick}>
              <img
                className='nav-link-sort-icon'
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
                  onClick={() => handleSortOption('desc')}
                >
                  <a>Sort by Date Descending</a>
                </p>
              </div>
            )}

            <Nav.Link
              className='mx-3 nav-link-font-size'
              onClick={() => handleRefresh(props.variable)}
            >
              <img
                className='nav-link-refresh-icon'
                src={require('../../assets/images/refresh.png')}
              />
              Refresh
            </Nav.Link>
          </div>
        </div>

        {sortedEvents.filter((event: any) => event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed').length > 0 ? (
          <Row className='px-5 title-bar'>
            <Col xs={3} className='nav-link-font-size'>
              Title
            </Col>
            <Col xs={3} className='text-center nav-link-font-size'>
              Estimated Budget
            </Col>
            <Col xs={3} className='text-center nav-link-font-size'>
              Actual Budget
            </Col>
            <Col xs={3} className='text-center nav-link-font-size'>
              Action
            </Col>
          </Row>
        ) : null}
        {events.loading && (
          <div className='event-loading-style'
          >
            {'Loading...'}
          </div>
        )}
        {!events.loading && events.error ? (
          <div className='event-loading-style'
          >
            {'Error: ' + events.error}
          </div>
        ) : null}
        {sortedEvents.filter((event: any) => event.status != 'Archived').length > 0 ? (
          <div className='pb-3per'>{renderedEvents}</div>
        ) : (
          <div  className='event-loading-style'
          >
            No Events
          </div>
        )} 
        {addExpenseModalShow && (
          <ExpenseModal
            show={addExpenseModalShow}
            onHide={handleCloseDetailsModal}
            event={event}
            action={action}
          />)}
      </Container>
    </Container>
  )
}
