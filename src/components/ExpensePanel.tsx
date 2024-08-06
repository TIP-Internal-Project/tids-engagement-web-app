import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchEvents } from '../redux/eventSlice'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { Event } from '../interfaces/adminFeatureApi/Event'
import ButtonBase from '@mui/material/ButtonBase'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ActualAndEstimatedBudgetChart from './ActualAndEstimatedBudgetChart'

export const ExpensePanel = (props: any) => {
  const dispatch = useAppDispatch()

  // const [eventModalShow, setEventModalShow] = useState(false)
  const [action, setAction] = useState('')
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [detailsModalShow, setDetailsModalShow] = useState(false)
  const location = useLocation()

  const API_ROOT = process.env.REACT_APP_API_URL

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
    borderColor: '#198754',
  }

  const radioBoxCol = {
    maxWidth: '20px',
    marginRight: '7px',
    display: 'flex',
    alignItems: 'center',
  }

  const eventOverviewTitle = {
    marginLeft: '20px',
    marginTop: '17px',
    alignItems: 'center',
  }

  const eventOverviewBudget = {
    marginLeft: '20px',
    marginTop: '17px',
  }

  const eventOverviewHistory = {
    marginLeft: '5px',
    marginTop: '17px',
  }

  const Image = styled('img')({
    width: 40,
    height: 40,
  })

  const DialogImage = styled('img')({
    width: 'auto',
    maxHeight: '80vh',
    margin: 'auto',
    display: 'block',
  })

  const ExpensePanelsBorders = {
    border: '1px solid #eeeeee',
    boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.15)',
  }

  interface ImageThumbnailProps {
    src: string
  }

  function createData(
    cip: number,
    addedBy: string,
    modifiedBy: string,
    description: string,
    receipts: string
  ) {
    return { cip, addedBy, modifiedBy, description, receipts }
  }

  const rows = [
    createData(2000, 'Mau', 'Mau', '', ''),
    createData(2000, 'Mau', 'Mau', '', ''),
    createData(560, 'Mau', 'Mau', '', ''),
    createData(300, 'Mau', 'Mau', '', ''),
    createData(4000, 'Mau', 'Mau', '', ''),
  ]

  const actualBudget = rows.reduce((acc, row) => acc + row.cip, 0)

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
    axios
      .get(API_ROOT + '/events/getAllEvents')
      .then((response) => {
        console.log('get data..')
        setEvent(response.data)
      })
      .catch((error) => {
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
      .sort(
        (a: any, b: any) => new (window.Date as any)(b.startDate) - new (window.Date as any)(a.startDate)
      )
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
          const filteredEvents = eventsArray.filter((event: any) =>
            filterOption.includes(event.category)
          )
          const sortedEvents = filteredEvents.sort(
            (a: any, b: any) =>
              new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
          )
          setSortedEvents(sortedEvents as Event[])
        } else if (sortOption === 'desc') {
          const eventsData = await dispatch(fetchEvents())
          const eventsArray = Object.values(eventsData.payload)
          const filteredEvents = eventsArray.filter((event: any) =>
            filterOption.includes(event.category)
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

  useEffect(() => {
    const activeEvents = sortedEvents.filter((event) => event.status !== 'Archived')
    const sortedByCreationDate = activeEvents.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )

    if (sortedByCreationDate.length > 0) {
      setSelectedEvent(sortedByCreationDate[0])
    }
  }, [sortedEvents])

  const renderedEvents = Object.values(sortedEvents)
    .filter(
      (event) =>
        event.status === 'Active' ||
        event.status === 'Inactive' ||
        event.status === 'Completed' ||
        event.status !== 'Archived'
    )
    .map((event, index) => {
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
              <Col xs={3} style={IndItemTitleDisplay} className='d-flex align-items-center'>
                <div style={radioBoxCol}>
                  <Form.Check
                    type='radio'
                    aria-label='selected'
                    name='selectedEvent'
                    onChange={() => setSelectedEvent(event)}
                    checked={selectedEvent ? event.eventId === selectedEvent.eventId : index === 0}
                  />
                </div>

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

              <Col xs={3} className='text-center'></Col>
              <Col
                xs={3}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}
              >
                <Button variant='success' style={actionBadge}>
                  {' '}
                  ADD EXPENSE
                </Button>
                <Button variant='success' style={actionBadge}>
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
        style={{ backgroundColor: 'white', height: 'auto%', width: '100%', borderRadius: '20px' }}
        className='px-0 py-4'
      >
        <div className='d-flex justify-content-between' style={{ color: '#7175B', padding: '0 2%' }}>
          <div style={{ width: '250px' }}></div>
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

        {sortedEvents.filter(
          (event: any) =>
            event.status === 'Active' || event.status === 'Inactive' || event.status === 'Completed'
        ).length > 0 ? (
          <Row style={TitleBar} className='text-center'>
            <Col xs={3} style={{ fontSize: '14px' }}></Col>
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
          <div style={{ paddingBottom: '1%' }}>{renderedEvents}</div>
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

        <Row>
          <Col>
            <Container className='expenseOverview'>
              {selectedEvent && (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h5 style={eventOverviewTitle}> {selectedEvent.title}</h5>
                </div>
              )}

              <Row>
                {selectedEvent && (
                  <>
                    <Col md={3} style={ExpensePanelsBorders}>
                      <p style={eventOverviewBudget}>
                        Estimated Budget: {selectedEvent.estimatedBudget}
                      </p>
                      <p style={eventOverviewBudget}>Actual Budget: {actualBudget}</p>
                      <p
                        style={{
                          fontFamily: 'Mulish',
                          fontSize: '16px',
                          paddingTop: '12px',
                          paddingLeft: '18px',
                          width: 'auto',
                        }}
                      >
                        Budget Utilization:
                        {selectedEvent.estimatedBudget > 0
                          ? `${((actualBudget / selectedEvent.estimatedBudget) * 100).toFixed(2)}%`
                          : 'N/A'}
                      </p>
                      <ActualAndEstimatedBudgetChart
                        actualBudget={actualBudget}
                        estimatedBudget={selectedEvent.estimatedBudget}
                      />
                    </Col>

                    <Col md={9}>
                      <p style={eventOverviewHistory}>History of Expense:</p>
                      <TableContainer component={Paper} style={ExpensePanelsBorders}>
                        <Table sx={{ minWidth: 650 }} size='medium' aria-label='a dense table'>
                          <TableHead>
                            <TableRow>
                              <TableCell>Amount</TableCell>
                              <TableCell align='center'>Added By</TableCell>
                              <TableCell align='center'>Modified By</TableCell>
                              <TableCell align='center'>Description</TableCell>
                              <TableCell align='center'>Receipts</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow
                                key={row.cip}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component='th' scope='row'>
                                  {row.cip}
                                </TableCell>
                                <TableCell align='center'>{row.addedBy}</TableCell>
                                <TableCell align='center'>{row.modifiedBy}</TableCell>
                                <TableCell align='center'>
                                  <p>{row.description}</p>
                                </TableCell>

                                <TableCell align='center'>
                                  <ButtonBase onClick={handleClickOpen}>
                                    <Image
                                      src={require('../assets/images/receiptSample.png')}
                                      alt='thumbnail'
                                    />
                                  </ButtonBase>
                                  <Dialog open={open} onClose={handleClose}>
                                    <DialogImage
                                      src={require('../assets/images/receiptSample.png')}
                                      alt='full size'
                                    />
                                  </Dialog>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Col>
                  </>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
