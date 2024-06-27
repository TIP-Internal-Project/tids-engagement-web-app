import React, { ChangeEvent, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { addEvent } from '../../redux/addEventSlice'
import { useDispatch } from 'react-redux'
import { updateEvent } from '../../redux/eventSlice'
import { AppDispatch } from '../../redux/store'
import Spinner from 'react-bootstrap/Spinner'
import TidsModal from '../Modal'
import { modalTitleDiv, modalStyle } from './style'
import { formatDate, generateModalUrl } from './utils'

interface EventModalProps {
  show: boolean
  onHide: () => void
  onChange: () => void
  event: any
  action: string
}

type category = {
  label: string
  eventTypeSelectOptions: string[]
}

const categorySelectOptions: { [index: string]: category } = {
  '': {
    label: 'Select a category',
    eventTypeSelectOptions: [],
  },
  TIDS: {
    label: 'TIDS Wide Event',
    eventTypeSelectOptions: [],
  },
  happyhere: {
    label: 'Happy Here Event',
    eventTypeSelectOptions: [],
  },
  teamEvent: {
    label: 'Team Level Event',
    eventTypeSelectOptions: [
      'Select an Event Type',
      'Practice Event',
      'OM Event',
      'Offsite Team building',
      'Recognition',
      'Engagement Activity',
    ],
  },
  COP: {
    label: 'COP Event',
    eventTypeSelectOptions: ['Select an Event Type', 'Brown Bag Sessions', 'Practice Community Event'],
  },
}

const EventModal: React.FC<EventModalProps> = ({ show, onHide, onChange, event, action }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [data, setData] = useState<any>({})
  const [toggleStatus, setToggleStatus] = useState(event?.status === 'Active' || false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [titleError, setTitleError] = useState('')
  const [venueError, setVenueError] = useState('')
  const [detailsError, setDetailsError] = useState('')
  const [startDateTimeError, setStartDateTimeError] = useState('')
  const [endDateTimeError, setEndDateTimeError] = useState('')
  const [importanceError, setImportanceError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [eventTypeError, setEventTypeError] = useState('')
  const [estimatedBudgetError, setEstimatedBudgetError] = useState('')
  const [numberOfInviteSentError, setNumberOfInviteSentError] = useState('')
  const [targetComplianceError, setTargetComplianceError] = useState('')
  const [creatingEvent, setCreatingEvent] = useState(false)
  // const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString().slice(0, 16))
  const currentDateTime = new Date()
    .toLocaleString('sv-SE', { timeZone: 'Asia/Shanghai', hour12: false })
    .replace(' ', 'T')
    .slice(0, 16)

  const [formData, setFormData] = useState({
    eventId: '',
    title: '',
    venueDetails: '',
    eventDetails: '',
    startDate: '',
    endDate: '',
    updatedAt: new Date(),
    code: '',
    category: '',
    importance: '',
    gmeetLink: '',
    postEventSurveyURL: '',
    estimatedBudget: 0,
    numberOfInviteSent: 0,
    starsNum: '',
    regLink: '',
    imageUrl: '',
    eventType: '',
    imageFile: '',
    status: '',
    tinyUrl: '',
    modalUrl: '',
    targetCompliance: 0,
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
        updatedAt: new Date(),
        code: '',
        category: '',
        importance: '',
        gmeetLink: '',
        postEventSurveyURL: '',
        estimatedBudget: 0,
        numberOfInviteSent: 0,
        starsNum: '',
        regLink: '',
        imageUrl: '',
        eventType: '',
        imageFile: '',
        status: '',
        tinyUrl: '',
        modalUrl: '',
        targetCompliance: 0,
      })
    }
  }, [show])

  useEffect(() => {
    setData(event)
  }, [event])

  useEffect(() => {
    if (action === 'edit') {
      setFormData(data)
    }
  }, [data, action])

  useEffect(() => {
    if (formData.startDate) {
      const endDateInput = document.querySelector('input[name="endDate"]')
      if (endDateInput) {
        endDateInput.setAttribute('min', formatDate(formData.startDate))
      }
    }
  }, [formData.startDate])

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleAddEvent = async () => {
    const { title } = formData
    setTitleError('')
    setVenueError('')
    setDetailsError('')
    setStartDateTimeError('')
    setEndDateTimeError('')
    setImportanceError('')
    setCategoryError('')
    setEventTypeError('')
    setEstimatedBudgetError('')
    setNumberOfInviteSentError('')
    setTargetComplianceError('')

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
    } else if (formData.startDate < currentDateTime) {
      setStartDateTimeError(
        'Invalid start date and time. Please select a date and time that occur after the current date and time.'
      )
      hasError = true
    }

    if (formData.endDate === null || formData.endDate.trim() === '') {
      setEndDateTimeError('End date and time is required.')
      hasError = true
    } else if (formData.endDate < formData.startDate) {
      setEndDateTimeError(
        'Invalid end date and time. Please select an end date and time that occur after the start date and time.'
      )
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

    if (isNaN(Number(formData.estimatedBudget))) {
      setEstimatedBudgetError('Estimated Budget must be a number.')
      hasError = true
    }

    if (Number(formData.estimatedBudget) < 0) {
      setEstimatedBudgetError('Estimated Budget must not be less than 0.')
      hasError = true
    }


    if (isNaN(Number(formData.numberOfInviteSent)) || !Number.isInteger(Number(formData.numberOfInviteSent))) {
      setNumberOfInviteSentError('Number of Invite Sent must be a number.')
      hasError = true
    }
    

    if (Number(formData.numberOfInviteSent) < 0) {
      setNumberOfInviteSentError('Number of Invite Sent must not be less than 0.')
      hasError = true
    }

    if (formData.numberOfInviteSent === null || Number(formData.numberOfInviteSent) === 0) {
      setNumberOfInviteSentError('Number of Invite Sent is required.')
      hasError = true
    }

    if (formData.targetCompliance === null || Number(formData.targetCompliance) === 0) {
      setTargetComplianceError('Target Compliance is required.')
      hasError = true
    }

    if (!percentageRegex.test(Number(formData.targetCompliance).toString())) {
      setTargetComplianceError('Please enter a valid percentage (1-100)')
      hasError = true
    }

    if (hasError) {
      return
    }

    function generateRandomString(length: number) {
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
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(modalUrl)}`
    const defaultStarsNum = 0

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
          estimatedBudget: formData.estimatedBudget,
          numberOfInviteSent: formData.numberOfInviteSent,
          starsNum: parseInt(formData.starsNum) || defaultStarsNum,
          regLink: formData.regLink,
          createdDate: new Date(),

          createdBy: '',
          qrCodeUrl: qrCodeUrl,
          imageFile: selectedImage,
          imageUrl: formData.imageUrl,
          eventType: formData.eventType,
          tinyUrl: formData.tinyUrl,
          modalUrl: modalUrl,
          targetCompliance: formData.targetCompliance,
        })
      )

      onChange()
      onHide()

      // Wait for a brief moment before reloading (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Adjust the delay as needed
    } catch (error) {
      console.error('Error adding event:', error)
      // Handle error as needed
    } finally {
      setCreatingEvent(false) // Hide the spinner
    }
  }

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

  const handleEventUpdate = async () => {
    setTitleError('')
    setVenueError('')
    setDetailsError('')
    setStartDateTimeError('')
    setEndDateTimeError('')
    setImportanceError('')
    setCategoryError('')
    setEventTypeError('')
    setEstimatedBudgetError('')
    setNumberOfInviteSentError('')
    setTargetComplianceError('')

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
    } else if (formData.startDate < currentDateTime) {
      setStartDateTimeError(
        'Invalid start date and time. Please select a date and time that occur after the current date and time.'
      )
      hasError = true
    }

    if (formData.endDate === null || formData.endDate.trim() === '') {
      setEndDateTimeError('End date and time is required.')
      hasError = true
    } else if (formData.endDate < formData.startDate) {
      setEndDateTimeError(
        'Invalid end date and time. Please select an end date and time that occur after the start date and time.'
      )
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

    if (isNaN(Number(formData.estimatedBudget))) {
      setEstimatedBudgetError('Estimated Budget must be a number.')
      hasError = true
    }

    if (isNaN(Number(formData.numberOfInviteSent))) {
      setNumberOfInviteSentError('Number of Invite Sent must be a number.')
      hasError = true
    }

    if (formData.numberOfInviteSent === null || Number(formData.numberOfInviteSent) === 0) {
      setNumberOfInviteSentError('Number of invite sent is required.')
      hasError = true
    }

    if (formData.targetCompliance === null || Number(formData.targetCompliance) === 0) {
      setTargetComplianceError('Target Compliance is required.')
      hasError = true
    }

    if (!percentageRegex.test(Number(formData.targetCompliance).toString())) {
      setTargetComplianceError('Please enter a valid percentage (1-100)')
      hasError = true
    }

    if (hasError) {
      return
    }

    const updatedEvent = {
      ...formData,
      imageFile: selectedImage !== null ? selectedImage : event.imageFile,
      status: toggleStatus ? 'Active' : 'Inactive',
    }

    await dispatch(updateEvent(updatedEvent))

    onChange()
  }

  const handleEventComplete = async () => {
    const completedEvent = {
      ...formData,
      imageFile: selectedImage !== null ? selectedImage : event.imageFile,
      status: 'Completed',
    }
    await dispatch(updateEvent(completedEvent))
    onChange()
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    const nextFormData = {
      [name]: value,
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
      ...nextFormData,
    }))
  }

  const percentageRegex = /^(100|\d{1,2})$/
  const modalUrl = formData.title ? generateModalUrl(formData.title) : ''

  const generateQr = () => {
    console.log('generateQr function called')
    if (formData.regLink === '') {
      return
    }

    const url = `https://quickchart.io/qr?text=${encodeURIComponent(modalUrl)}`
    setQrCodeUrl(url)
  }

  const headerContent = (
    <>
      <Modal.Title id='contained-modal-title-vcenter' className='mx-3' style={modalTitleDiv}>
        {action == 'add' ? 'Add' : 'Edit'} Event
      </Modal.Title>
    </>
  )

  const bodyContent = (
    <>
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
              <Form.Label>
                Event Title<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                required
                type='text'
                defaultValue={action == 'edit' ? event.title : ''}
                name='title'
                style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                onChange={(e) => {
                  handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                  setTitleError('')
                }}
              />
              {titleError && <div className='text-danger'>{titleError}</div>}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                required
                type='hidden'
                value={action == 'edit' ? event.tinyURL : ''}
                name='eventId'
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Details<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    as='textarea'
                    defaultValue={action == 'edit' ? event.eventDetails : ''}
                    name='eventDetails'
                    style={{
                      backgroundColor: '#DEDEDE',
                      height: '116px',
                      borderRadius: '25px',
                      resize: 'none',
                    }}
                    onChange={(e) => {
                      handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                      setDetailsError('')
                    }}
                  />
                  {detailsError && <div className='text-danger'>{detailsError}</div>}
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
                        style={{ width: '100%', height: '100%' , borderRadius: '25px',}}
                      />
                    ) : (
                      <img
                        id='imagePreview'
                        src={require('../../assets/images/image.png')}
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
                <Form.Label>
                  Venue Details<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  required
                  type='text'
                  defaultValue={action == 'edit' ? event.venueDetails : ''}
                  name='venueDetails'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  onChange={(e) => {
                    handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                    setVenueError('')
                  }}
                />
                {venueError && <div className='text-danger'>{venueError}</div>}
              </Form.Group>
            </Row>
            <Row className=''>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Start Date & Time<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <div className='d-flex align-items-center'>
                  <Form.Control
                    required
                    type='datetime-local'
                    defaultValue={action === 'edit' ? event.startDate.slice(0, -1) : ''}
                    max='9999-12-31T23:59'
                    min={currentDateTime}
                    name='startDate'
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                    onChange={(e) => {
                      handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                      setStartDateTimeError('')
                    }}
                  />
                </div>
                {startDateTimeError && <div className='text-danger'>{startDateTimeError}</div>}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>
                  End Date & Time<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <div className='d-flex align-items-center'>
                  <Form.Control
                    required
                    type='datetime-local'
                    defaultValue={action === 'edit' ? event.endDate.slice(0, -1) : ''}
                    name='endDate'
                    max='9999-12-31T23:59'
                    min={
                      action === 'edit'
                        ? event.startDate.slice(0, -1)
                        : new Date().toISOString().slice(0, 16)
                    }
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                    onChange={(e) => {
                      handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                      setEndDateTimeError('')
                    }}
                  />
                </div>
                {endDateTimeError && <div className='text-danger'>{endDateTimeError}</div>}
              </Form.Group>
            </Row>
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
            <Row>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>Estimated Budget</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    defaultValue={action == 'edit' ? event.estimatedBudget : ''}
                    name='estimatedBudget'
                    onChange={handleFormChange}
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  />
                  {estimatedBudgetError && <div className='text-danger'>{estimatedBudgetError}</div>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Number of Invite Sent<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type='text'
                    defaultValue={action == 'edit' ? event.numberOfInviteSent : ''}
                    name='numberOfInviteSent'
                    onChange={(e) => {
                      handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                      setNumberOfInviteSentError('')
                    }}
                    style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  />
                  {numberOfInviteSentError && (
                    <div className='text-danger'>{numberOfInviteSentError}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col xs={4}>
            <Form.Group className='mb-3'>
              <Form.Label>
                Target Compliance<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <div className='d-flex align-items-center' style={{ position: 'relative' }}>
                <Form.Control
                  required
                  type='text'
                  defaultValue={action === 'edit' ? event.targetCompliance : ''}
                  name='targetCompliance'
                  style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                  onChange={(e) => {
                    handleFormChange(e as React.ChangeEvent<HTMLInputElement>)
                    setTargetComplianceError('')
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  %
                </span>
              </div>
              {targetComplianceError && <div className='text-danger'>{targetComplianceError}</div>}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Importance<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Select
                aria-label='Default select example'
                style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                defaultValue={action == 'edit' ? event.importance : ''}
                name='importance'
                onChange={(e) => {
                  handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>)
                  setImportanceError('')
                }}
              >
                <option value=''>Select importance</option>
                <option value='required'>Required</option>
                <option value='optional'>Optional</option>
              </Form.Select>
              {importanceError && <div className='text-danger'>{importanceError}</div>}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Category<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Select
                aria-label='Default select example'
                style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                defaultValue={action == 'edit' ? event.category : ''}
                name='category'
                onChange={(e) => {
                  const selectedCategory = e.target.value
                  handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>)
                  setCategoryError('')

                  // Clear event type error if the selected category is "TIDS Wide Event" or "Happy Here Event"
                  if (selectedCategory === 'TIDS' || selectedCategory === 'happyhere') {
                    setEventTypeError('')
                  }
                }}
              >
                {Object.keys(categorySelectOptions).map((o, index) => (
                  <option key={index} value={o}>
                    {categorySelectOptions[o].label}
                  </option>
                ))}
              </Form.Select>
              {categoryError && <div className='text-danger'>{categoryError}</div>}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>
                Event Type
                <span style={{ color: 'red' }}>
                  {categorySelectOptions[formData.category]?.eventTypeSelectOptions?.length === 0
                    ? ''
                    : '*'}
                </span>
              </Form.Label>
              <Form.Select
                aria-label='Default select example'
                style={{ backgroundColor: '#DEDEDE', borderRadius: '25px' }}
                defaultValue={action == 'edit' ? event.eventType : ''}
                name='eventType'
                onChange={(e) => {
                  handleSelectChange(e as React.ChangeEvent<HTMLSelectElement>)
                  setEventTypeError('')
                }}
                disabled={categorySelectOptions[formData.category]?.eventTypeSelectOptions?.length === 0}
              >
                {categorySelectOptions[formData.category]?.eventTypeSelectOptions.map((o, index) => (
                  <option key={index} selected={o === formData.eventType} value={index === 0 ? '' : o}>
                    {o}
                  </option>
                ))}
              </Form.Select>
              {eventTypeError && <div className='text-danger'>{eventTypeError}</div>}
            </Form.Group>
          </Col>
        </Row>

        <Row className='justify-content-md-end mt-4'>
          <Col
            xs
            md='auto'
            className='text-center'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2B8000',
            }}
          >
            {action === 'edit' && (
              <Form>
                <Form.Check
                  type='switch'
                  id='custom-switch'
                  label='Registration'
                  checked={toggleStatus}
                  onChange={() => setToggleStatus(!toggleStatus)}
                  defaultValue={event?.status || ''}
                />
              </Form>
            )}
          </Col>

          <Col xs md='auto'>
            {action == 'add' ? (
              <Button
                variant='success'
                className='px-4'
                onClick={handleAddEvent}
                disabled={creatingEvent}
              >
                {creatingEvent ? (
                  <>
                    <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                    Creating...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            ) : (
              <Button variant='success' className='px-4' onClick={handleEventUpdate}>
                Update Event
              </Button>
            )}
          </Col>

          {event?.status === 'Active' ? (
            <Col xs md='auto'>
              <Button
                variant='success'
                className='px-4'
                onClick={handleEventComplete}
                style={{
                  backgroundColor: '#2B8000',
                }}
              >
                Complete Event
              </Button>
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  )

  return (
    <>
      <TidsModal
        show={show}
        onHide={onHide}
        size='xl'
        ariaLabelBy='contained-modal-title-vcenter'
        centered
        customHeaderStyle={modalStyle}
        hasHeader={true}
        headerContent={headerContent}
        bodyContent={bodyContent}
        hasCloseBtn={true}
      />
    </>
  )
}

export default EventModal
