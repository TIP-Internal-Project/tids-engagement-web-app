import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import {fetchTasks} from '../redux/taskSlice'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const TaskPanel = () => {
  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const handleToggle = (eventId: number) => {
    setEventStates((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }))
  }

  const TitleBar = {
    marginLeft: '32px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderTop: 'none',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
    paddingTop: '24px',
    marginRight: '32px',
  }

  const EventStyle = {
    color: 'black',
  }

  const EventPanelDiv = {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    paddingTop: '62px',
  }

  const EventPanelContainer = {
    marginLeft: '32px',
    marginRight: '32px',
    borderRadius: 'none',
  }

  const listGroupItem = {
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  }

  const TaskPanelSubheader2ContentRgihtIcons = {
    width: '18px',
    heigth: '19px',
    marginRight: '10px',
  }

  const TaskPanelSubheader2Content: React.CSSProperties = {
    flex: '1',
    textAlign: 'left',
  }

  const TaskPanelSubheader2ContentRgiht: React.CSSProperties = {
    flex: '1',
    float: 'right',
    margin: '20px',
  }

  const TaskPanelSubheader2ContentTitle: React.CSSProperties = {
    textAlign: 'left',
    paddingLeft: '31px',
    paddingBottom: '8px',
    width: '605px',
  }

  const TaskPanelSubheader2ContentAction: React.CSSProperties = {}

  const TaskPanelSubheader2ContentDueDate: React.CSSProperties = {
    textAlign: 'left',
    paddingLeft: '15px',
    width: '401px',
  }

  const TaskPanelSubheader2ContentImportance: React.CSSProperties = {
    width: '312px',
  }

  const IndItemTitle: React.CSSProperties = {
    textAlign: 'left',
    paddingLeft: '10px',
    width: '605px',
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

  const IndItemTitleDiv = {}
  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

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

  const IndItemImportance: React.CSSProperties = {
    textAlign: 'left',
    width: '312px',
  }

  const IndImportanceBadge = {
    width: '84px',
    height: '28px',
    borderRadius: '11px',
    paddingTop: '9px',
  }

  const IndItemAction: React.CSSProperties = {
    paddingLeft: '21px',
  }

  const TaskPanelSubheader1: React.CSSProperties = {
    display: 'flex',
    marginLeft: '32px',
    backgroundColor: '#fff',
    marginRight: '32px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    borderBottom: 'none',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
    borderTopRightRadius: '17px',
    borderTopLeftRadius: '17px',
  }

  const TaskPanelSubheader2: React.CSSProperties = {
    display: 'flex',
    marginLeft: '32px',
    backgroundColor: '#fff',
    marginRight: '32px',
    border: '1px solid #ccc',

    borderTop: 'none',
    borderBottomRightRadius: '0',
    borderBottomLeftRadius: '0',
    paddingTop: '24px',
  }

  const viewDetailsButton = {
    padding: '1px 2px',
    fontSize: '11px',
    background: 'none',
    border: 'none',
    color: 'green',
  }

  const eventContentButtons: React.CSSProperties = {
    padding: '3px 6px',
    fontSize: '14px',
    background: 'none',
    border: 'none',
    color: 'green',
    paddingTop: '18px',
  }

  const eventContent = {
    padding: '11px',
  }

  const addNewTaskTypeHereButton = {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    FontStyle: 'normal',
    marginBottom: '0',
    marginTop: '25px',
    color: '#71757B',
    paddingLeft: '28px',
  }

  const taskContentTitle = {}

  // ++++++ task items

  type Task = {
    id: number
    title: string
    dueDate: string
    dueTime: string
    content: string
    importance: 'Required' | 'Optional'
  }

  const tasks = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchTasks())
  },[dispatch])

  const renderedTasks = Object.values(tasks.tasks).map((tasks: any, index) =>{
    return(

      <ListGroup.Item key={tasks.id} style={listGroupItem}>
        <Row className='px-3 py-2'>
          <Col xs={6} style={IndItemTitleDisplay}>
            <p
              onClick={() => handleToggle(tasks.id)}
              aria-controls={`example-collapse-text-${tasks.id}`}
              aria-expanded={eventStates[tasks.id] ? 'true' : 'false'}
              className='mb-0'
            >
              {tasks.title}
            </p>
            <Button
              style={viewDetailsButton}
              onClick={() => handleToggle(tasks.id)}
              aria-controls={`example-collapse-text-${tasks.id}`}
              aria-expanded={eventStates[tasks.id] ? 'true' : 'false'}
            >
              View details
            </Button>
          </Col>

          <Col xs={2} style={IndItemDueDate} className='text-center'>
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
              <p style={IndItemDueDateDisplay} className='mb-0'>
                {`${new Date(tasks.dueDate).toDateString().slice(3)}`}
              </p>
              <p style={IndItemDueTimeDisplay}>{tasks.dueTime}</p>
            </div>
          </Col>

          <Col xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Badge
              bg={
                tasks.importance === 'Required'
                  ? 'danger'
                  : tasks.importance === 'Optional'
                  ? 'warning'
                  : 'secondary'
              }
              style={IndImportanceBadge}
            >
              {tasks.importance}
            </Badge>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          >
            <Button variant='success'>Mark as completed</Button>
          </Col>
          <Collapse in={eventStates[tasks.id]}>
            <div style={eventContent} id={`example-collapse-text-${tasks.id}`}>
              <h3>{tasks.title}</h3>
              {tasks.content}

              <div>
                <Button style={eventContentButtons}>Workday Link</Button>
                <Button style={eventContentButtons}>MyGrowth</Button>
                <Button style={eventContentButtons}>Check Progress</Button>
              </div>
            </div>
          </Collapse>
        </Row>
      </ListGroup.Item>
  )})


  return (
    <div style={EventPanelDiv}>
      <div style={TaskPanelSubheader1}>
        <div style={TaskPanelSubheader2Content}>
          {' '}
          <span
            id='boot-icon'
            className='bi bi-plus'
            style={{ fontSize: '18px', color: 'rgb(128, 128, 128)' }}
          ></span>
          {isAdmin && <p style={addNewTaskTypeHereButton}> + Add new task type here </p>}
        </div>
        <div style={TaskPanelSubheader2Content}>
          <Nav.Item>
            <Nav.Link style={TaskPanelSubheader2ContentRgiht} href='/home'>
              <img
                style={TaskPanelSubheader2ContentRgihtIcons}
                src={require('../assets/images/filter.png')}
              />
              Filter
            </Nav.Link>
            <Nav.Link style={TaskPanelSubheader2ContentRgiht} href='/home'>
              <img
                style={TaskPanelSubheader2ContentRgihtIcons}
                src={require('../assets/images/sort-up.png')}
              />
              Sort
            </Nav.Link>
          </Nav.Item>
        </div>
      </div>

      <Container fluid style={{ margin: '0', padding: '0' }}>
        <Row style={TitleBar} className='px-3'>
          <Col xs={6}>Title</Col>
          <Col xs={2} className='text-center'>
            Due Date
          </Col>
          <Col xs={2} className='text-center'>
            Importance
          </Col>
          <Col className='text-center'>Action</Col>
        </Row>
      </Container>



      <ListGroup style={EventPanelContainer}>
        {renderedTasks}
      </ListGroup>
    </div>
  )
}
