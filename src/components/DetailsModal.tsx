import React, { ChangeEvent, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import { addEvent } from '../redux/addEventSlice'
import { useDispatch } from 'react-redux'
import { updateEvent } from '../redux/eventSlice'
import { AppDispatch } from '../redux/store'
import Spinner from 'react-bootstrap/Spinner'


interface EventModalProps {
  show: boolean
  onHide: () => void
  onChange: () => void
  event: any
  action: string
}

const currentDateTime = new Date()

const timestamp = currentDateTime.getTime()

const updatedAtDate = new Date(timestamp)

type category = {
  label: string
  eventTypeSelectOptions: string[]
}

const categorySelectOptions: {[index: string]: category} = {
  '': {
    label: 'Select a category',
    eventTypeSelectOptions: []
  },
  'TIDS': {
    label: 'TIDS Wide Event (5 stars/50 Points)',
    eventTypeSelectOptions: []
  },
  'happyhere': {
    label: '#HAPPYHERE',
    eventTypeSelectOptions: []
  },
  'teamEvent': {
    label: 'Team Level Event (3 stars/30 Points)',
    eventTypeSelectOptions: [
      'Select an Event Type',
      'Practice Event',
      'OM Event',
      'Offsite Team building',
      'Recognition',
      'Engagement Activity'
    ]
  },
  'COP': {
    label: 'COP',
    eventTypeSelectOptions: [
      'Select an Event Type',
      'Brown Bag Sessions',
      'Practice Community Event'
    ]
  }
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide, onChange, event, action }) => {
  const [data, setData] = useState<any>({})
  const dispatch = useDispatch<AppDispatch>()
const [toggleStatus, setToggleStatus] = useState(event?.status === 'Active' || false)

  const [formData, setFormData] = useState({
    eventId: '',
    title: '',
    venueDetails: '',
    eventDetails: '',
    startDate: '',
    endDate: '',
    updatedAt: new Date,
    code: '',
    category: '',
    importance: '',
    gmeetLink: '',
    postEventSurveyURL: '',
    starsNum: '',
    regLink: '',
    imageUrl:'',
    eventType:'',
    imageFile: '',
    status: ''
  })

  useEffect(() => {
    if (!show) {
      setFormData({
        eventId: '',
        title: '',
        venueDetails: '',
        eventDetails: '',
        startDate: '',
        endDate: '',
        updatedAt: new Date,
        code: '',
        category: '',
        importance: '',
        gmeetLink: '',
        postEventSurveyURL: '',
        starsNum: '',
        regLink: '',
        imageUrl:'',
        eventType:'',
        imageFile: '',
        status: ''
      })
    }
  }, [show])

  const reload = () => window.location.reload()

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  

  const handleAddEvent  = async () => {
    const { title, regLink, eventId } = formData
   
    
    setTitleError('')
 		setVenueError('')
    setDetailsError('')
    setStartDateTimeError('')
    setEndDateTimeError('')
    setImportanceError('')
    setCategoryError('')
    setEventTypeError('')

  	let hasError = false

		if (formData.title.trim() === '') {
			setTitleError('Title is required.')
			hasError = true
		}

    if (formData.venueDetails.trim() === '') {
			setVenueError('Venue details are required.')
			hasError = true
		}

    if (formData.eventDetails.trim() === '') {
			setDetailsError('Details are required.')
			hasError = true
		}

		if (formData.startDate === null || formData.startDate.trim() === '') {
			setStartDateTimeError('Start date and time is required.')
			hasError = true
		}

    if (formData.endDate === null || formData.endDate.trim() === '') {
			setEndDateTimeError('End date and time is required.')
			hasError = true
		}

    if (formData.importance === '') {
			setImportanceError('Importance is required.')
			hasError = true
		}

    if (formData.category.trim() === '') {
			setCategoryError('Category is required.')
			hasError = true
		}

    if (formData.eventType === '') {
			setEventTypeError('Event Type is required.')
			hasError = true
		}

		if (hasError) {
			return
		}



    function generateRandomString(length:number) {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
      }
      return result
    }

    const randomWord = generateRandomString(6)


    generateQr()

    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(title + randomWord)}`


    const defaultStarsNum = 0

    const someDefaultFile = new File([''], 'engagementAppLogo.png', { type: 'image/png' })

    try {
     
      setCreatingEvent(true)

      await dispatch(
          addEvent({
              eventId: 0,
              title: formData.title,
              venueDetails: formData.venueDetails,
              eventDetails: formData.eventDetails,
              startDate: formData.startDate,
              endDate: formData.endDate,
              code: formData.code,
              category: formData.category,
              importance: formData.importance,
              gmeetLink: formData.gmeetLink,
              postEventSurveyURL: formData.postEventSurveyURL,
              starsNum: parseInt(formData.starsNum) || defaultStarsNum,
              regLink: formData.regLink,
              createdDate: new Date(),
             
              createdBy: '',
              qrCodeUrl: qrCodeUrl,
              imageFile: selectedImage,
              imageUrl: formData.imageUrl,
              eventType: formData.eventType
          })
      ) 

      onChange()
      onHide()

      // Wait for a brief moment before reloading (optional)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Adjust the delay as needed

      
  } catch (error) {
      console.error('Error adding event:', error)
      // Handle error as needed
  }
  finally {
    setCreatingEvent(false) // Hide the spinner
  }
}

const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedImage(file)

    const imagePrev = document.getElementById('imagePreview') as HTMLImageElement

    if (imagePrev && file) {
      imagePrev.src = URL.createObjectURL(file)
      imagePrev.style.height = '116px'
      imagePrev.style.borderRadius = '25px'
      imagePrev.style.width = '100%'
    }
  }

  

	useEffect(()=>{
		setData(event)
	}, [event])

	useEffect(()=>{
    if(action === 'edit'){
      setFormData(data)
    }
	}, [data, action])
  
  const handleEventUpdate = async () => {
    setTitleError('')
 		setVenueError('')
    setDetailsError('')
    setStartDateTimeError('')
    setEndDateTimeError('')
    setImportanceError('')
    setCategoryError('')
    setEventTypeError('')

  	let hasError = false

		if (formData.title.trim() === '') {
			setTitleError('Title is required.')
			hasError = true
		}

    if (formData.venueDetails.trim() === '') {
			setVenueError('Venue details are required.')
			hasError = true
		}

    if (formData.eventDetails.trim() === '') {
			setDetailsError('Details are required.')
			hasError = true
		}

		if (formData.startDate === null || formData.startDate.trim() === '') {
			setStartDateTimeError('Start date and time is required.')
			hasError = true
		}

    if (formData.endDate === null || formData.endDate.trim() === '') {
			setEndDateTimeError('End date and time is required.')
			hasError = true
		}

    if (formData.importance === '') {
			setImportanceError('Importance is required.')
			hasError = true
		}

    if (formData.category.trim() === '') {
			setCategoryError('Category is required.')
			hasError = true
		}

    if (formData.eventType === '') {
			setEventTypeError('Event Type is required.')
			hasError = true
		}

		if (hasError) {
			return
		}
    
  
    const updatedEvent = {
      
      ...formData,
      imageFile: selectedImage !== null ? selectedImage : event.imageFile,
      status: toggleStatus ? 'Active' : 'Inactive'
      
    }
  
    await dispatch(updateEvent(updatedEvent))
  
    
    onChange()
  }



  function beforeSubmit() {
    formData.eventId = event.eventId
    formData.title = formData.title == '' ? event.title : formData.title
    formData.venueDetails = formData.venueDetails == '' ? event.venueDetails : formData.venueDetails
    formData.eventDetails = formData.eventDetails == '' ? event.eventDetails : formData.eventDetails
    formData.startDate = formData.startDate == '' ? event.startDate : formData.startDate
    formData.endDate = formData.endDate == '' ? event.endDate : formData.endDate
    formData.updatedAt = updatedAtDate
    formData.code = formData.code == '' ? event.code : formData.code
    formData.category = formData.category == '' ? event.category : formData.category
    formData.eventType = formData.eventType == '' ? event.eventType : formData.eventType
    formData.importance = formData.importance == '' ? event.importance : formData.importance
    formData.gmeetLink = formData.gmeetLink == '' ? event.gmeetLink : formData.gmeetLink
    formData.postEventSurveyURL == '' ? event.postEventSurveyURL : formData.postEventSurveyURL
    formData.starsNum = formData.starsNum == '' ? event.starsNum : formData.starsNum
    formData.regLink = formData.regLink == '' ? event.regLink : formData.regLink
    formData.imageUrl = formData.imageUrl == '' ? event.imageUrl : formData.imageUrl
    formData.imageFile = selectedImage !== null ? selectedImage : event.imageFile
    formData.status = formData.status == '' ? event.status: formData.status
    
  }

  function formatDate(eventDate: string) {
    const newEventDate = new Date(eventDate)
    const year = newEventDate.getFullYear()
    const month = addZero(newEventDate.getMonth() + 1)
    const date = addZero(newEventDate.getDate())
    const hour = addZero(newEventDate.getHours())
    const minute = addZero(newEventDate.getMinutes())
    const formattedDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute
    return formattedDate
  }

  function addZero(number: number) {
    return number < 10 ? '0' + number.toString() : number
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    const nextFormData = {
      [name]: value
    }
    if (name === 'category') {
      if (value === 'TIDS' || value === 'happyhere') {
        nextFormData['eventType'] = 'na'
      } else {
        nextFormData['eventType'] = ''
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      ...nextFormData
    }))
  }

  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [titleError, setTitleError] = useState('')
	const [venueError, setVenueError] = useState('')
	const [detailsError, setDetailsError] = useState('')
  const [startDateTimeError, setStartDateTimeError] = useState('')
	const [endDateTimeError, setEndDateTimeError] = useState('')
	const [importanceError, setImportanceError] = useState('')
  const [categoryError, setCategoryError] = useState('')
	const [eventTypeError, setEventTypeError] = useState('')

  const [creatingEvent, setCreatingEvent] = useState(false)

  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString().slice(0, 16))

  useEffect(() => {
    if (formData.endDate) {
      const startDateInput = document.querySelector('input[name="startDate"]')
      if (startDateInput) {
        startDateInput.setAttribute('max', formatDate(formData.endDate))
      }
    }
  }, [formData.endDate])

  useEffect(() => {
    if (formData.startDate) {
      const endDateInput = document.querySelector('input[name="endDate"]')
      if (endDateInput) {
        endDateInput.setAttribute('min', formatDate(formData.startDate))
      }
    }
  }, [formData.startDate])

  // const generateQr = () => {
  //   console.log('generateQr function called')
  //   if (formData.regLink === '') {
  //     alert('Please enter a registration link')
  //     return
  //   }
  //   const clickQR = document.getElementById('clickQR')
  //   const eventQR = document.getElementById('eventQR') as HTMLImageElement

  //   console.log('eventQR:', eventQR)

  //   if (clickQR) {
  //     clickQR.style.display = 'none'
  //   }
  //   if (eventQR) {
  //     const url = `https://quickchart.io/qr?text=${encodeURIComponent(formData.regLink)}`
  //     setQrCodeUrl(url)
  //   }
  // }

  const generateQr = () => {
    console.log('generateQr function called')
    if (formData.regLink === '') {
      return
    }

    const url = `https://quickchart.io/qr?text=${encodeURIComponent(formData.title)}`
    setQrCodeUrl(url)
  }

  const updatedEventStatus = toggleStatus ? 'Active' : 'Inactive'

  const modalStyle = {
    border: 'none', // Add a new border style
    margin: '4%',
    marginBottom: '0',
  }

  const ModalButton = {
    marginRight: '5px',
    borderColor: '#2B8000',
    backgroundColor: '#2B8000',
    width: '125px',
    fontSize: '11px',
    fontFamily: 'Mulish',
  }

  const ModalTitleDiv = {
    display: 'inline-flex',
  }

  const ModalStatus = {
    marginTop: '6px',
    paddingLeft: '11px',
  }

  if (action == 'edit'){
    console.log(event.startDate)
    console.log(formData.endDate)
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id='contained-modal-title-vcenter' className='mx-3' style={ModalTitleDiv}>
          {action == 'add' ? 'Add' : 'Edit'} Event
        </Modal.Title>
      </Modal.Header>

      <hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

      <Modal.Body>
        <Container fluid className='px-5 pb-4'>
          <Row>
            <Col xs={8}>
              <Form.Group className='mb-3'>
                <Form.Control
                  required
                  type='hidden'
                  value={action == 'edit' ? event.eventId : ''}
                  name='eventId'
                />
                <Form.Label>Event Title<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  required
                  type='text'
                  defaultValue={action == 'edit' ? event.title : ''}
                  name='title'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  onChange={handleFormChange}
                />{titleError && <div className="text-danger">{titleError}</div>}</Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control
                    required
                    type='hidden'
                    value={action == 'edit' ? event.tinyURL : ''}
                    name='eventId'
                  />
                  {/* <Form.Label>Tiny URL</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    defaultValue={action == 'edit' ? event.tinyURL : ''}
                    name='tinyURL'
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                    onChange={handleFormChange}
                  /> */}
                </Form.Group>
              {/* </Row> */}

              <Row>
                <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Details<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control
                  required
                  as='textarea'
                  defaultValue={action == 'edit' ? event.eventDetails : ''}
                  name='eventDetails'
                  style={{ backgroundColor: '#DEDEDE', height: '116px', borderRadius: '25px', resize:'none'}}
                  onChange={handleFormChange}
                />{detailsError && <div className="text-danger">{detailsError}</div>}
              </Form.Group>
              </Col>
              <Col>
              <Form.Group className='mb-3'>
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                id='imageInput'
                required
                type='file'
                defaultValue=''
                style={{ backgroundColor: '#DEDEDE', height: '116px', display: 'none' }}
                onChange={handleImageSelect}
              />
              <br />
              <label
                style={{
                  height: '116px',
                  backgroundColor: '#DEDEDE',
                  borderRadius: '25px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                htmlFor='imageInput'
              >
                {formData.imageUrl ? ( 
                  <img
                    id='imagePreview'
                    src={formData.imageUrl} 
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <img
                    id='imagePreview'
                    src={require('../assets/images/image.png')}
                    style={{ width: '40px', height: '40px' }}
                  />
                )}
              </label>
            </Form.Group>
              
              </Col>

              </Row>
            </Col>

            <Col>
              <Row>
                    <Form.Group className='mb-3'>
                    <Form.Label>Venue Details<span style={{color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                      required
                      type='text'
                      defaultValue={action == 'edit' ? event.venueDetails : ''}
                      name='venueDetails'
                      style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                      onChange={handleFormChange}
                    />{venueError && <div className="text-danger">{venueError}</div>}
                  </Form.Group>  
              </Row>
              <Row className=''>
                <Form.Group className='mb-3'>
                  <Form.Label>Start Date & Time<span style={{color: 'red'}}>*</span></Form.Label>
                  <div className='d-flex align-items-center'>
                    <Form.Control
                      required
                      type='datetime-local'
                      defaultValue={action == 'edit' ? formatDate(event.startDate) : ''}
                      max={action == 'edit' ? formatDate(event.endDate) : formData.endDate}
                      min={currentDateTime}
                      name='startDate'
                      style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                      onChange={handleFormChange}
                    />
                  </div>
                  {startDateTimeError && <div className="text-danger">{startDateTimeError}</div>}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className='mb-3'>
                  <Form.Label>End Date & Time<span style={{color: 'red'}}>*</span></Form.Label>
                  <div className='d-flex align-items-center'>
                    <Form.Control
                      required
                      type='datetime-local'
                      defaultValue={action == 'edit' ? formatDate(event.endDate) : ''}
                      name='endDate'
                      max='9999-12-31 23:59'
                      min={action == 'edit' ? formatDate(event.startDate) : new Date().toISOString().slice(0, 16)}
                      style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                      onChange={handleFormChange}
                    />
                  </div>
                  {endDateTimeError && <div className="text-danger">{endDateTimeError}</div>}
                </Form.Group>
              </Row>
              {/* <Row>
              <Form.Group className='mb-3'>
                <Form.Label>Importance</Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  defaultValue={action == 'edit' ? event.importance : 'required'}
                  name='importance'
                  onChange={handleSelectChange}
                >
                  <option value='required'>Required</option>
                  <option value='optional'>Optional</option>
                </Form.Select>
              </Form.Group>
              </Row> */}
            </Col>
          </Row>




          <Row>
                  

          <Col xs={8}>
            <Row>
            <Form.Group className='mb-3'>
                <Form.Label>Google Meet Link</Form.Label>
                <Form.Control
                  required
                  type='text'
                  defaultValue={action == 'edit' ? event.gmeetLink : ''}
                  name='gmeetLink'
                  onChange={handleFormChange}
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                />
              </Form.Group>
              </Row>
              <Row>
              <Form.Group className='mb-3'>
                <Form.Label>Post Survey Link</Form.Label>
                <Form.Control
                  required
                  type='text'
                  defaultValue={action == 'edit' ? event.postEventSurveyURL : ''}
                  name='postEventSurveyURL'
                  onChange={handleFormChange}
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                />
              </Form.Group>
              </Row>
            </Col>

            <Col xs={4}>
              <Form.Group className='mb-3'>
                <Form.Label>Importance<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  defaultValue={action == 'edit' ? event.importance : ''}
                  name='importance'
                  onChange={handleSelectChange}
                >
                  <option value=''>Select importance</option>
                  <option value='required'>Required</option>
                  <option value='optional'>Optional</option>
                </Form.Select>
                {importanceError && <div className="text-danger">{importanceError}</div>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Category<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  defaultValue={action == 'edit' ? event.category : ''}
                  name='category'
                  onChange={handleSelectChange}
                >
                  {Object.keys(categorySelectOptions).map((o, index) => <option key={index} value={o}>{categorySelectOptions[o].label}</option>)}
                </Form.Select>
                {categoryError && <div className="text-danger">{categoryError}</div>}
              </Form.Group>


              <Form.Group className='mb-3'>
                <Form.Label>Event Type<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  defaultValue={action == 'edit' ? event.eventType : ''}
                  name='eventType'
                  onChange={handleSelectChange}
                >
                  {categorySelectOptions[formData.category]?.eventTypeSelectOptions.map((o, index) =>
                    <option key={index} selected={o === formData.eventType} value={index === 0 ? '' : o}>{o}</option>
                  )}
                </Form.Select>
                {eventTypeError && <div className="text-danger">{eventTypeError}</div>}
              </Form.Group>
            </Col>
          </Row>

          {/* <Row>
            <Col xs={4}>
              <Form.Group>
                <Form.Label>Event Code</Form.Label>
                <Form.Control
                  required
                  type='text'
                  defaultValue={action == 'edit' ? event.code : ''}
                  name='code'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  onChange={handleFormChange}
                />
              </Form.Group>
            </Col>

            <Col xs={4}>
             
            </Col>

            <Col xs={4}>
              
            </Col>
          </Row> */}

          <Row className='mt-4 mb-4'>
            {/* <Col xs={4}>
              <Form.Group>
                <Form.Label># of Stars to earn</Form.Label>
                <Form.Control
                  required
                  type='number'
                  min='1'
                  defaultValue={action == 'edit' ? event.starsNum : ''}
                  name='starsNum'
                  onChange={handleFormChange}
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  onKeyDown={(evt) =>
                    ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()
                  }
                />
              </Form.Group>
            </Col> */}
          </Row>

          <Row>
            <Col xs={6} className='px-5' style={{ color: '#9FA2B4' }}></Col>

            <Col
              xs={2}
              className='text-center'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2B8000',
              }}
            >
            </Col>

              

              
            <Col
              xs={2}
              className='text-center'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2B8000',
              }}
            >
              <Nav.Link href='' className='' style={{width: '-webkit-fill-available', fontSize: '14px'}}>
                Clear Fields
              </Nav.Link>

              
              {action === 'edit' && (
  <Form>
    <Form.Check
      type="switch"
      id="custom-switch"
      label=""
      checked={toggleStatus}
      onChange={() => setToggleStatus(!toggleStatus)}
      defaultValue={event?.status || ''}
    />
  </Form>
)}
            </Col>

            <Col xs={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {action == 'add' ? (
               <Button variant='success' className='px-4' onClick={handleAddEvent}  disabled={creatingEvent}>
               {creatingEvent ? (
                      <>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Creating...
                      </>
                    ) : (
                      'Create Event'
                    )}
             </Button>
              ) : (
                <Button variant='success' className='px-3' onClick={handleEventUpdate} style={{width: '-webkit-fill-available', borderColor: '#2B8000', backgroundColor: '#2B8000', fontSize: '11px'}}>
                  Update Event
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default EventModal
