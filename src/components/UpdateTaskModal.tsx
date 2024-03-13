import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useAppDispatch } from '../redux/store'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import { fetchTasks, taskState } from '../redux/taskSlice'
import { updateTask } from '../redux/updateTaskSlice'

interface EventModalProps {
  show: boolean
  onHide: () => void
  modalData: any[]
  updatedTasks: (tasks: taskState) => void
}

const UpdateTaskModal: React.FC<EventModalProps> = ({ show, onHide, modalData, updatedTasks }) => {
  const modalStyle = {
    border: 'none', // Add a new border style
    margin: '4%',
    marginBottom: '0',
  }

  const ModalTitleDiv = {
    display: 'inline-flex',
  }

  const [titleError, setTitleError] = useState('')
  const [timeError, setTimeError] = useState('')
  const [detailsError, setDetailsError] = useState('')

  const dispatch = useAppDispatch()
  const [buttonClicked, setButtonClicked] = useState(false)

  const [time, setTime] = useState()
  let newTime

  const [data, setData] = useState<any>({})

  useEffect(() => {
    setData(modalData.at(0))
  }, [modalData])

  const [formValues, setFormValues] = useState<any>({})

  useEffect(() => {
    setFormValues(data)
  }, [data])

  const handleInputChange = async (event: any) => {
    let name: any, value: any

    if (event.target) {
      name = event.target.name
      value = event.target.value
    } else {
      name = 'time'
      await setTime(event)
      newTime = event
      value = convertTo12HourFormat(newTime)
    }
    if (name === 'dueDate') {
      const dateValue = new Date(value)
      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        [name]: dateValue,
      }))
    } else {
      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        [name]: value,
      }))
    }
  }

  const handleEditTask = () => {
    setTitleError('')
    setTimeError('')
    setDetailsError('')

    let hasError = false

    if (formValues.title.trim() === '') {
      setTitleError('Title is required.')
      hasError = true
    }

    if (formValues.time === null || formValues.time.trim() === '') {
      setTimeError('Time is required.')
      hasError = true
    }

    if (formValues.details.trim() === '') {
      setDetailsError('Details are required.')
      hasError = true
    }

    if (hasError) {
      return
    }

    setButtonClicked(true)
  }

  const handleModalHide = () => {
    setFormValues(data)
    console.log(formValues)
    onHide()
  }

  useEffect(() => {
    if (buttonClicked) {
      dispatch(updateTask(formValues))
        .then(() => dispatch(fetchTasks()))
        .then((resultAction) => {
          if (resultAction.type === fetchTasks.fulfilled.type) {
            const editedTasks = resultAction.payload as taskState
            updatedTasks(editedTasks)
            setButtonClicked(false)
          }
        })
    }
  }, [buttonClicked])

  const getCurrentTime = () => {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }).split('T')[0]
    if (new Date(formValues.dueDate).toISOString().split('T')[0] === today) {
      const now = new Date()
      const timezone = 'Asia/Manila'
      const timeOptions = {
        timeZone: timezone,
        hour12: true,
      }

      const formattedTime = now.toLocaleString('en-PH', timeOptions)
      const [date, time] = formattedTime.split(', ')

      return new Date(`${date} ${time}`)
    }

    const minTime = new Date()
    minTime.setHours(0)
    minTime.setMinutes(0)
    minTime.setSeconds(0)
    minTime.setMilliseconds(0)
    return minTime
  }

  const getMaxTime = () => {
    // You can set the maximum allowed time here. For example, if you want to allow times up to 23:59 (11:59 PM), use:
    const maxTime = new Date()
    maxTime.setHours(23)
    maxTime.setMinutes(59)
    maxTime.setSeconds(0)
    maxTime.setMilliseconds(0)
    return maxTime
  }

  const convertTo12HourFormat = (time: any) => {
    if (!(time instanceof Date) || isNaN(time.getTime())) {
      return '' // Handle the case when the time is not a valid Date object
    }

    const hours = time.getHours()
    const minutes = time.getMinutes()

    const amOrPm = hours >= 12 ? 'PM' : 'AM'
    const twelveHourFormatHours = hours % 12 || 12

    const formattedTime = `${twelveHourFormatHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`
    return formattedTime
  }

  return (
    <Modal
      show={show}
      onHide={handleModalHide}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id='contained-modal-title-vcenter' className='mx-3' style={ModalTitleDiv}>
          Edit Task
        </Modal.Title>
      </Modal.Header>
      <hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />
      {formValues.dueDate ? (
        <Modal.Body>
          <Container fluid className='px-5 pb-4'>
            <Row className='mb-3'>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label>
                    Title<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type='text'
                    placeholder=''
                    name='title'
                    value={formValues.title}
                    onChange={handleInputChange}
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                    autoComplete='off'
                  />
                  {titleError && <div className='text-danger'>{titleError}</div>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Due Date<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type='date'
                    placeholder=''
                    name='dueDate'
                    value={new Date(formValues.dueDate).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                    min={
                      new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' }).split('T')[0]
                    }
                    autoComplete='off'
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Time<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <div style={{ width: '-webkit-fill-available' }}>
                    <DatePicker
                      required
                      name='time'
                      value={formValues.time}
                      onChange={handleInputChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat='h:mm aa'
                      minTime={getCurrentTime()}
                      maxTime={getMaxTime()}
                      className='custom-timepicker form-control'
                      autoComplete='off'
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </div>
                  {timeError && <div className='text-danger'>{timeError}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Row className='my-4'>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label>
                    Details<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    as='textarea'
                    placeholder=''
                    name='details'
                    value={formValues.details}
                    onChange={handleInputChange}
                    style={{ backgroundColor: '#DEDEDE', height: '116px', borderRadius: '25px' }}
                    autoComplete='off'
                  />
                  {detailsError && <div className='text-danger'>{detailsError}</div>}
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Row className=''>
                  <Form.Group>
                    <Form.Label>Link</Form.Label>
                    <div className='d-flex align-items-center'>
                      <Form.Control
                        required
                        type='text'
                        placeholder=''
                        name='link'
                        value={formValues.link}
                        onChange={handleInputChange}
                        style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                        autoComplete='off'
                      />
                    </div>
                  </Form.Group>
                </Row>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Importance<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <div className='d-flex align-items-center'>
                    <Form.Select
                      aria-label='Default select example'
                      name='importance'
                      value={formValues.importance}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                    >
                      <option value='Required'>Required</option>
                      <option value='Optional'>Optional</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className='justify-content-end' style={{ marginTop: '100px' }}>
              <Col xs={8} className='px-5' style={{ color: '#9FA2B4' }}></Col>
              <Col
                xs={2}
                className='text-center'
                style={{
                  width: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2B8000',
                }}
              >
                <Nav.Link
                  href=''
                  className=''
                  style={{ width: '-webkit-fill-available', fontSize: '14px' }}
                >
                  Clear Fields
                </Nav.Link>
              </Col>
              <Col
                xs={2}
                style={{ width: '116px', display: 'flex', alignItems: 'center', justifyContent: 'end' }}
              >
                <Button
                  variant='success'
                  onClick={handleEditTask}
                  style={{
                    width: '-webkit-fill-available',
                    borderColor: '#2B8000',
                    backgroundColor: '#2B8000',
                    fontSize: '11px',
                  }}
                >
                  EDIT TASK
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      ) : (
        <Modal.Body>Loading...</Modal.Body> // Placeholder content while formValues is being fetched
      )}
    </Modal>
  )
}

export default UpdateTaskModal
