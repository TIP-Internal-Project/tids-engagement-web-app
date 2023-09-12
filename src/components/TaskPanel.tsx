import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse'
import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
// import {fetchTasks} from '../redux/taskSlice'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddTaskModal from './AddTaskModal'
import UpdateTaskModal from './UpdateTaskModal'
import { completeTask } from '../redux/taskCompletionSlice'
import { fetchCompletedTasks } from '../redux/completedTasksSlice'
import { fetchIncompleteTasks } from '../redux/incompleteTasksSlice'
import Form from 'react-bootstrap/Form'

interface TaskPanelProps {
  email: string
}

export const TaskPanel = (props: TaskPanelProps) => {
  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const handleToggle = (eventId: number) => {
    setEventStates((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }))
  }

  const TitleBar = {
	paddingTop: '24px',
	color:'#9FA2B4'
}

  // const EventStyle = {
  //   color: 'black',
  // }

  // const EventPanelDiv = {
  //   backgroundColor: '#f5f5f5',
  //   borderTopLeftRadius: '6px',
  //   borderTopRightRadius: '6px',
  //   paddingTop: '62px',
  // }

  const listGroupItem = {
	borderLeftColor: 'white',
	borderRightColor: 'white',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
  }

  // const TaskPanelSubheader2ContentRgihtIcons = {
  //   width: '18px',
  //   heigth: '19px',
  //   marginRight: '10px',
  // }

  // const TaskPanelSubheader2Content: React.CSSProperties = {
  //   flex: '1',
  //   textAlign: 'left',
  // }

  // const TaskPanelSubheader2ContentRgiht: React.CSSProperties = {
  //   flex: '1',
  //   float: 'right',
  //   margin: '20px',
  // }

  // const TaskPanelSubheader2ContentTitle: React.CSSProperties = {
  //   textAlign: 'left',
  //   paddingLeft: '31px',
  //   paddingBottom: '8px',
  //   width: '605px',
  // }

  // const TaskPanelSubheader2ContentAction: React.CSSProperties = {}

  // const TaskPanelSubheader2ContentDueDate: React.CSSProperties = {
  //   textAlign: 'left',
  //   paddingLeft: '15px',
  //   width: '401px',
  // }

  // const TaskPanelSubheader2ContentImportance: React.CSSProperties = {
  //   width: '312px',
  // }

  // const IndItemTitle: React.CSSProperties = {
  //   textAlign: 'left',
  //   paddingLeft: '10px',
  //   width: '605px',
  // }

  const IndItemTitleDisplay = {
    fontFamily: 'Mulish',
    color: '#2A2C2E',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '24px',
    FontStyle: 'normal',
    marginBottom: '0',
  }

  // const IndItemTitleDiv = {}
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

  // const IndItemImportance: React.CSSProperties = {
  //   textAlign: 'left',
  //   width: '312px',
  // }

  const IndImportanceBadge = {
    width: '84px',
    height: '28px',
    borderRadius: '11px',
    paddingTop: '9px',
  }

  // const IndItemAction: React.CSSProperties = {
  //   paddingLeft: '21px',
  // }

  // const TaskPanelSubheader1: React.CSSProperties = {
  //   display: 'flex',
  //   marginLeft: '32px',
  //   backgroundColor: '#fff',
  //   marginRight: '32px',
  //   border: '1px solid #ccc',
  //   borderRadius: '2px',
  //   borderBottom: 'none',
  //   borderBottomRightRadius: '0',
  //   borderBottomLeftRadius: '0',
  //   borderTopRightRadius: '17px',
  //   borderTopLeftRadius: '17px',
  // }

  // const TaskPanelSubheader2: React.CSSProperties = {
  //   display: 'flex',
  //   marginLeft: '32px',
  //   backgroundColor: '#fff',
  //   marginRight: '32px',
  //   border: '1px solid #ccc',

  //   borderTop: 'none',
  //   borderBottomRightRadius: '0',
  //   borderBottomLeftRadius: '0',
  //   paddingTop: '24px',
  // }

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

  // const disabledButtons: React.CSSProperties = {
  //   padding: '3px 6px',
  //   fontSize: '14px',
  //   background: 'none',
  //   border: 'none',
  //   color: '#9fa5aa',
  //   paddingTop: '18px',
  // }

  const eventContent = {
    padding: '11px',
  }

  // const addNewTaskTypeHereButton = {
  //   fontFamily: 'Mulish',
  //   fontWeight: '400',
  //   fontSize: '16px',
  //   lineHeight: '24px',
  //   FontStyle: 'normal',
  //   marginBottom: '0',
  //   marginTop: '25px',
  //   color: '#71757B',
  //   paddingLeft: '28px',
  // }

  // const taskContentTitle = {}

  // ++++++ task items

  type Task = {
    id: number
    title: string
    dueDate: string
    dueTime: string
    content: string
    importance: 'Required' | 'Optional'
  }

  const tasks = useAppSelector((state: any) => state.incompleteTasks)
  const dispatch = useAppDispatch()

  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [modalData, setModalData] = useState<Task[]>([])
  const [updateModalShow, setUpdateModalShow] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [filterOption, setFilterOption] = useState<string[]>(['ALL'])
  const dropdownFilterRef = useRef<HTMLDivElement>(null)
  const dropdownSortRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownSortRef.current && !dropdownSortRef.current.contains(event.target as Node)) {
      setShowSortDropdown(false)
    }
    if (dropdownFilterRef.current && !dropdownFilterRef.current.contains(event.target as Node)) {
      setShowFilterDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleOpenAddTaskModal = () => {
	setShowAddTaskModal(true)
  }

  const handleAddedTasks = () => {
	setShowAddTaskModal(false)
  handleRefresh(props.email)
  }

  const handleUpdatedTask = () => {
	setUpdateModalShow(false)
  handleRefresh(props.email)
	}

  const handleCloseAddTaskModal = () => {
	setShowAddTaskModal(false)
  }

  const handleOpenUpdateModal = (task: Task) => {
		setModalData([task])
		setUpdateModalShow(true)
	}

	const handleCloseUpdateModal = () => {
		setUpdateModalShow(false)
	}

  const [completedTasks, setCompletedTasks] = useState<Task[]>([])

  // useEffect(() => {
  //   const email = props.email
  //   dispatch(fetchCompletedTasks(email)).then((data: any) => {
  //     const completedTasks = Object.values(data.payload)
  //     setCompletedTasks(completedTasks as Task[])
  //   })
  // }, [])

  const [incompleteTasks, setIncompleteTasks] = useState<Task[]>([])

  // useEffect(() => {
  //   const email = props.email
  //   dispatch(fetchIncompleteTasks(email)).then((data: any) => {
  //     const incompleteTasks = Object.values(data.payload)
  //     setIncompleteTasks(incompleteTasks as Task[])
  //   })
  // }, [])

  useEffect(() => {
    const filter = async () => {
      const email = props.email
      const completedTasksData = await dispatch(fetchCompletedTasks(email))
      const completedTasksArray = Object.values(completedTasksData.payload)
      const incompleteTasksData = await dispatch(fetchIncompleteTasks(email))
      const incompleteTasksArray = Object.values(incompleteTasksData.payload)
      
      if (!filterOption.includes('ALL')) {
        let filteredCompletedTasksArray = [...completedTasksArray]
        let filteredIncompleteTasksArray = [...incompleteTasksArray]
        if (filterOption.includes('Due Today')) {
          const todaysDate = new Date()
          filteredCompletedTasksArray = filteredCompletedTasksArray.filter((task: any) => 
            (new (window.Date as any)(task?.dueDate).setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) 
          )
          filteredIncompleteTasksArray = filteredIncompleteTasksArray.filter((task: any) => 
            (new (window.Date as any)(task?.dueDate).setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0)) 
          )
        }
        if (filterOption.includes('7 Days')) {
          const todaysDate = new Date()
          todaysDate.setDate(todaysDate.getDate() + 7)
          filteredCompletedTasksArray = filteredCompletedTasksArray.filter((task: any) => 
            (new (window.Date as any)(task?.dueDate).setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) 
          )
          filteredIncompleteTasksArray = filteredIncompleteTasksArray.filter((task: any) => 
            (new (window.Date as any)(task?.dueDate).setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) 
          )
        }
        if (filterOption.includes('30 Days')) {
          const todaysDate = new Date()
          todaysDate.setDate(todaysDate.getDate() + 30)
          filteredCompletedTasksArray = filteredCompletedTasksArray.filter((task: any) => 
            (new (window.Date as any)(task?.dueDate).setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) 
          )
          filteredIncompleteTasksArray = filteredIncompleteTasksArray.filter((task: any) => 
            (new (window.Date as any)(task?.dueDate).setHours(0,0,0,0) < todaysDate.setHours(0,0,0,0)) 
          )
        }
        if (filterOption.includes('Required') || filterOption.includes('Optional')) {
          filteredCompletedTasksArray = filteredCompletedTasksArray.filter((task: any) => filterOption.includes(task?.importance))
          filteredIncompleteTasksArray = filteredIncompleteTasksArray.filter((task: any) => filterOption.includes(task?.importance))
        }
        setCompletedTasks(filteredCompletedTasksArray as Task[])
        setIncompleteTasks(filteredIncompleteTasksArray as Task[])
      } else {
        setCompletedTasks(completedTasksArray as Task[])
        setIncompleteTasks(incompleteTasksArray as Task[])
      }
    }
    filter()
  }, [filterOption])

  const handleCompleteTask = async (taskId: any, email: any, completionDate: any) => {
    await dispatch(completeTask({ taskId, email, completionDate }))
    handleRefresh(email)    
  }

  const handleRefresh = async (email: any) => {
    const incompleteTasksData = await dispatch(fetchIncompleteTasks(email))
    const incompleteTasks = Object.values(incompleteTasksData.payload)
    setIncompleteTasks(incompleteTasks as Task[])
    const completedTasksData = await dispatch(fetchCompletedTasks(email))
    const completedTasks = Object.values(completedTasksData.payload)
    setCompletedTasks(completedTasks as Task[])
  }

  const handleFilterOption = (option: string[]) => {
    setFilterOption(option)
  }

  const handleFilterButtonClick = () => {
    setShowFilterDropdown((prevShowFilterDropdown) => !prevShowFilterDropdown)
  }

  const renderedCompletedTasks = Object.values(completedTasks).map((tasks: any, index) =>{
    let ts = tasks.time
      const H = +ts.substr(0, 2)
      let h = (H % 12) || 12
      h = (h < 10)?Number('0'+h):h // leading 0 at the left for 1 digit hours
      const ampm = H < 12 ? ' AM' : ' PM'
      ts = h + ts.substr(2, 3) + ampm

      function generateLink(url: any) {
        if (url && (typeof url === 'string' || url instanceof String)) {
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url
          } else {
            return `https://${url}`
          }
        } else {
          return 'Invalid URL'
        }
      }
      const link = generateLink(tasks.link)

      return(
  
        <ListGroup.Item key={tasks.taskId} style={listGroupItem} className='px-5'>
          <Row className='py-2'>
            <Col xs={4} style={IndItemTitleDisplay}>
        { isAdmin === true ? (
              <p
                 onClick={() => handleOpenUpdateModal(tasks)}
                aria-controls={`example-collapse-text-${tasks.taskId}`}
                aria-expanded={eventStates[tasks.taskId] ? 'true' : 'false'}
                className='mb-0'
          style={{cursor:'pointer'}}
              >
                {tasks.title}
              </p>
        ) : (
          <p
                aria-controls={`example-collapse-text-${tasks.taskId}`}
                aria-expanded={eventStates[tasks.taskId] ? 'true' : 'false'}
                className='mb-0'
              >
                {tasks.title}
              </p>
          )
        }
              <Button
                style={viewDetailsButton}
                onClick={() => handleToggle(tasks.taskId)}
                aria-controls={`example-collapse-text-${tasks.taskId}`}
                aria-expanded={eventStates[tasks.taskId] ? 'true' : 'false'}
              >
                View details
              </Button>
            </Col>
  
            <Col xs={2} style={IndItemDueDate} className='text-center'>
              <div style={{ display: 'inline-block', textAlign: 'left' }}>
                <p style={IndItemDueDateDisplay} className='mb-0'>
                  {`${new (window.Date as any)(tasks.dueDate).toLocaleDateString({},{timeZone:'UTC',month:'short', day:'2-digit', year:'numeric'})}`}
                </p>
                <p style={IndItemDueTimeDisplay}>{tasks.time}</p>
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
            <Col xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p className="mb-0" style={{ fontFamily: 'Mulish', fontWeight: '600', fontSize: '14px', lineHeight: '28px', color: 'rgb(37, 39, 51)' }}>Completed</p></Col>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              <Button onClick={() => handleCompleteTask(tasks.taskId, props.email, new Date())} variant='success' style={{ backgroundColor: '#9fa5aa', borderColor: '#9fa5aa', fontSize: '11px' }} disabled>MARK AS COMPLETED</Button>
            </Col>
            <Collapse in={eventStates[tasks.taskId]}>
              <div style={eventContent} id={`example-collapse-text-${tasks.taskId}`}>
                <h3>{tasks.title}</h3>
                {tasks.details}
  
                <div>
                  {tasks.link !== '' && (<a href={`${link}`} target="_blank" rel="noreferrer">
                    <Button style={eventContentButtons}>Link<img style={{ height: '20px', marginLeft: '5px', marginBottom: '5px' }} src={require('../assets/images/link.png')} /></Button>
                  </a>)}
                </div>
              </div>
            </Collapse>
          </Row>
        </ListGroup.Item>
    )})

    const renderedIncompleteTasks = Object.values(incompleteTasks).map((tasks: any, index) =>{
      let ts = tasks.time
        const H = +ts.substr(0, 2)
        let h = (H % 12) || 12
        h = (h < 10)?Number('0'+h):h // leading 0 at the left for 1 digit hours
        const ampm = H < 12 ? ' AM' : ' PM'
        ts = h + ts.substr(2, 3) + ampm

        function generateLink(url: any) {
          if (url && (typeof url === 'string' || url instanceof String)) {
            if (url.startsWith('http://') || url.startsWith('https://')) {
              return url
            } else {
              return `https://${url}`
            }
          } else {
            return 'Invalid URL'
          }
        }
        
        const link = generateLink(tasks.link)

        return(
    
          <ListGroup.Item key={tasks.taskId} style={listGroupItem} className='px-5'>
            <Row className='py-2'>
              <Col xs={4} style={IndItemTitleDisplay}>
          { isAdmin === true ? (
                <p
                   onClick={() => handleOpenUpdateModal(tasks)}
                  aria-controls={`example-collapse-text-${tasks.taskId}`}
                  aria-expanded={eventStates[tasks.taskId] ? 'true' : 'false'}
                  className='mb-0'
            style={{cursor:'pointer'}}
                >
                  {tasks.title}
                </p>
          ) : (
            <p
                  aria-controls={`example-collapse-text-${tasks.taskId}`}
                  aria-expanded={eventStates[tasks.taskId] ? 'true' : 'false'}
                  className='mb-0'
                >
                  {tasks.title}
                </p>
            )
          }
                <Button
                  style={viewDetailsButton}
                  onClick={() => handleToggle(tasks.taskId)}
                  aria-controls={`example-collapse-text-${tasks.taskId}`}
                  aria-expanded={eventStates[tasks.taskId] ? 'true' : 'false'}
                >
                  View details
                </Button>
              </Col>
    
              <Col xs={2} style={IndItemDueDate} className='text-center'>
                <div style={{ display: 'inline-block', textAlign: 'left' }}>
                  <p style={IndItemDueDateDisplay} className='mb-0'>
                    {`${new (window.Date as any)(tasks.dueDate).toLocaleDateString({},{timeZone:'UTC',month:'short', day:'2-digit', year:'numeric'})}`}
                  </p>
                  <p style={IndItemDueTimeDisplay}>{tasks.time}</p>
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
              <Col xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p className="mb-0" style={{ fontFamily: 'Mulish', fontWeight: '600', fontSize: '14px', lineHeight: '28px', color: 'rgb(37, 39, 51)' }}>Not Started</p></Col>
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}
              >
                <Button onClick={() => handleCompleteTask(tasks.taskId, props.email, new Date())} variant='success' style={{ backgroundColor: '#2B8000', fontSize: '11px' }}>MARK AS COMPLETED</Button>
              </Col>
              <Collapse in={eventStates[tasks.taskId]}>
                <div style={eventContent} id={`example-collapse-text-${tasks.taskId}`}>
                  <h3>{tasks.title}</h3>
                  {tasks.details}
    
                  <div>
                    {tasks.link !== '' && (<a href={`${link}`} target="_blank" rel="noreferrer">
                      <Button style={eventContentButtons}>Link<img style={{ height: '20px', marginLeft: '5px', marginBottom: '5px' }} src={require('../assets/images/link.png')} /></Button>
                    </a>)}
                  </div>
                </div>
              </Collapse>
            </Row>
          </ListGroup.Item>
      )})

  return (
      	<Container fluid style={{backgroundColor:'#f5f5f5', height:'100vh', width:'100%', padding:'32px'}} className='mx-auto'>
			<Container fluid style={{backgroundColor:'white', height:'100%', width:'100%', borderRadius:'20px'}} className='px-0 py-4'>
				<div className="d-flex justify-content-between" style={{ color: '#7175B', padding: '0 2%' }}>
					<div style={{width: '250px'}}>
						{isAdmin && (
						<Col xs={8} style={{ color: '#7175B', paddingLeft: '2%', width: '-webkit-fill-available' }}>
							<Nav.Link className="" style={{ fontSize: '14px' }} onClick={handleOpenAddTaskModal}>
							<span className="mx-2" style={{ fontSize: '20px' }}>+</span> Add new task, type here
							</Nav.Link>
						</Col>
						)}
					</div>
					<div className="d-flex flex-row-reverse px-5">
						<Nav.Link className="mx-3" style={{ fontSize: '14px' }} onClick={handleFilterButtonClick}>
						<img style={{ height: '15px', width: '14px', marginRight: '10px' }} src={require('../assets/images/filter.png')} />
						Filter
						</Nav.Link>
            {showFilterDropdown && (
            <div ref={dropdownFilterRef} className='floating-div2'>
              <Form style={{ fontSize: '14px' }}>
                {['ALL', 'Required', 'Optional', 'Due Today', '7 Days', '30 Days'].map((value) => (
                  <div key={`default-${value}`}>
                    <Form.Check
                      id={`default-${value}`}
                      label={value}
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
                ))}
              </Form>
            </div>
          )}

						<Nav.Link className="mx-3" style={{ fontSize: '14px' }}>
						<img style={{ height: '15px', width: '15px', marginRight: '10px' }} src={require('../assets/images/sort-up.png')} />
						Sort
						</Nav.Link>
            <Nav.Link
            className='mx-3'
            style={{ fontSize: '14px' }}
            onClick={() => handleRefresh(props.email)}
          >
            <img
              style={{ height: '22px', width: '19px', marginRight: '10px' }}
              src={require('../assets/images/refresh.png')}
            />
            Refresh
          </Nav.Link>
					</div>
				</div>
				<Row style={TitleBar} className='px-5'>
					<Col xs={4} style={{fontSize: '14px'}}>Title</Col>
					<Col xs={2} style={{fontSize: '14px'}} className='text-center'>Due Date</Col>
					<Col xs={2} style={{fontSize: '14px'}} className='text-center'>Importance</Col>
          <Col xs={2} style={{fontSize: '14px'}} className='text-center'>Status</Col>
					<Col style={{fontSize: '14px'}} className='text-center'>Action</Col>
				</Row>
				<ListGroup>
					{tasks.loading && <div style={{borderTop:'0.5px solid #9FA2B4', textAlign:'center', color:'#9FA2B4', paddingTop:'3%', paddingBottom:'4%', fontSize:'14px'}}>{'Loading...'}</div>}
					{!tasks.loading && tasks.error ? <div style={{borderTop:'0.5px solid #9FA2B4', textAlign:'center', color:'#9FA2B4', paddingTop:'3%', paddingBottom:'4%', fontSize:'14px'}}>{'Error: ' + tasks.error}</div> : null}
					{renderedIncompleteTasks.length > 0 || renderedCompletedTasks.length > 0 ? (
						<div>
              {renderedIncompleteTasks}
              {renderedCompletedTasks}
            </div>
					) : (
						<div style={{borderTop:'0.5px solid #9FA2B4', textAlign:'center', color:'#9FA2B4', paddingTop:'3%', paddingBottom:'4%', fontSize:'14px'}}>No Tasks</div>
					)}
				</ListGroup>
      		</Container>
			<AddTaskModal show={showAddTaskModal} onHide={handleCloseAddTaskModal} addedTasks={handleAddedTasks} email={props.email} />
			{updateModalShow && (
				<UpdateTaskModal show={updateModalShow} onHide={handleCloseUpdateModal} modalData={modalData} updatedTasks={handleUpdatedTask}/>
			)}
		</Container>
  	)
}
