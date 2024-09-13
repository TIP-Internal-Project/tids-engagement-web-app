import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { register } from '../redux/eventRegistrationSlice'
import { fetchUnregisteredEvents } from '../redux/unregisteredEventsSlice'
import { fetchRegisteredEvents } from '../redux/registeredEventsSlice'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchGeolocation } from '../redux/geolocationSlice'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { addPoints } from '../redux/teamMemberPoints/addPointsSlice'
import axios from 'axios'

interface EventModalProps {
  show: boolean
  onHide: () => void
  modalData: any[]
  disableRegistration: boolean
  email: any
  showButtons: boolean
  onSortedEvents: (events: Event[]) => void
  onSortedRegisteredEvents: (events: Event[]) => void
}

const EventModal: React.FC<EventModalProps> = ({
  show,
  onHide,
  modalData,
  disableRegistration,
  email,
  showButtons,
  onSortedEvents,
  onSortedRegisteredEvents: onSortedEvents1,
}) => {
  const API_ROOT = process.env.REACT_APP_API_URL

  const [data, setData] = useState<any>({})
  const [disable, setDisable] = useState<any>()
  const dispatch = useAppDispatch()
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [isQrCodeExpanded, setIsQrCodeExpanded] = useState(false)
  const [signedImageUrl, setSignedImageUrl] = useState('')

  const [tooltipMessage, setTooltipMessage] = useState('Click to copy link')
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  useEffect(() => {
    setData(modalData)
  }, [modalData])

  useEffect(() => {
    setDisable(disableRegistration)

    const qrCodeUrlFromDatabase = 'https://quickchart.io/qr?text=test%20event%204'

    setQrCodeUrl(qrCodeUrlFromDatabase)
  }, [modalData, disableRegistration])

  const handleRegister = async (eventId: any, email: any, pointsToAdd: any, category: any) => {
    const location = await dispatch(fetchGeolocation())
    const address = location.payload
    await dispatch(register({ eventId, email, address }))

    await dispatch(
      addPoints({
        email: email,
        pointsToAdd: pointsToAdd,
        category: category,
      })
    )

    const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
    const registeredEventsArray = Object.values(registeredEventsData.payload)
    const sortedRegisteredEvents = registeredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    onSortedEvents1(sortedRegisteredEvents as Event[])
    const unregisteredEventsData = await dispatch(fetchUnregisteredEvents(email))
    const unregisteredEventsArray = Object.values(unregisteredEventsData.payload)
    const sortedUnregisteredEvents = unregisteredEventsArray.sort(
      (a: any, b: any) => new (window.Date as any)(a.startDate) - new (window.Date as any)(b.startDate)
    )
    onSortedEvents(sortedUnregisteredEvents as Event[])
  }

  const handleCloseModal = () => {
    setIsQrCodeExpanded(false) // Reset the state to false when the modal is closed
    onHide() // Call the onHide prop to close the modal
  }

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
    height: '29px',
  }

  const ModalTitleDiv = {
    display: 'inline-flex',
  }

  const handleDownloadClick = () => {
    fetch(data.qrCodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)

        const fileName = `${data.title}.png`
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.style.display = 'none'

        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .catch((error) => console.error('Error downloading image:', error))
  }

  const [showMessage, setShowMessage] = useState(false)

  const handleMouseOver = () => {
    setShowMessage(true)
  }

  const handleMouseOut = () => {
    setShowMessage(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement('textarea')
        textArea.value = text

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = 'absolute'
        textArea.style.left = '-999999px'

        document.body.prepend(textArea)
        textArea.select()

        try {
          document.execCommand('copy')
        } catch (error) {
          console.error(error)
        } finally {
          textArea.remove()
        }
      }
      setTooltipMessage('Link copied')
      setTimeout(() => setTooltipMessage('Click to copy link'), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleMouseLeave = () => {
    setTooltipMessage('Click to copy link')
    setIsButtonPressed(false)
  }

  const smallButtonStyle = {
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    lineHeight: 1,
    borderRadius: '0.1rem',
    backgroundColor: isButtonPressed ? '#333' : 'black',
    color: 'white',
    border: 'none',
  }

  const getSignedUrl = async (imageFilename: string) => {
    try {
      const response = await axios.get(`${API_ROOT}/image/getSignedUrl`, {
        params: { fileName: imageFilename },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching signed URL:', error)
      return null // Handle error case appropriately
    }
  }

  useEffect(() => {
    const fetchSignedUrl = async () => {
      const url = await getSignedUrl(data.imageUrl)
      setSignedImageUrl(url)
    }

    fetchSignedUrl()
  }, [data.imageUrl]) // Re-run if imageUrl changes

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id='contained-modal-title-vcenter' style={ModalTitleDiv}>
          {data.title}
        </Modal.Title>
      </Modal.Header>

      <hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

      <Modal.Body className='ModalBody'>
        <div className='ModalBodyLeft' style={{ width: 'auto' }}>
          <img src={`${signedImageUrl}`} />
        </div>

        <div className='ModalBodyRight' style={{ width: '45%' }}>
          <div className='ModalBodyRightSubDiv1'>
            <p style={{ fontSize: '14px' }}>{data.eventDetails}</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              {data.eventType === 'na' ? '' : data.eventType}{' '}
              <FontAwesomeIcon icon={faStar} size='1x' style={{ color: '#f4ef6c' }} />
              {data.starsNum + ' '}
              Points
            </p>
          </div>

          {showButtons && (
            <div className='ModalBodyRightSubDiv'>
              <Button
                style={ModalButton}
                disabled={disable || data.status === 'Inactive' || data.status === 'Completed'}
                onClick={() => handleRegister(data.eventId, email, data.starsNum, data.category)}
              >
                REGISTER
              </Button>{' '}
              {data.postEventSurveyURL &&
                // Ucommnent below if the feature is needed
                /** <Button style={ModalButton} href={data.postEventSurveyURL}>
                  EVENT SURVEY
                </Button> */

                ''}
              {data.gmeetLink && (
                <a href={data.gmeetLink}>
                  <img
                    style={{ marginLeft: '-1%', marginRight: '-1%', width: '43px', height: '33px' }}
                    src={require('../assets/images/GmeetLogo.png')}
                  />
                </a>
              )}
              <a href='https://calendar.google.com/'>
                <img
                  style={{ width: '37px', height: '37px' }}
                  src={require('../assets/images/GoogleCalendarLogo.png')}
                />
              </a>
              {data.status !== 'Inactive' && (
                <a>
                  <div
                    onClick={() => setIsQrCodeExpanded(!isQrCodeExpanded)}
                    style={{ cursor: 'pointer' }}
                  >
                    {isQrCodeExpanded ? (
                      <div>
                        <img
                          onClick={handleDownloadClick}
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                          src={data.qrCodeUrl}
                          alt='QR Code'
                          style={{
                            width: '160px',
                            height: '160px',
                            border: 'groove',
                            borderWidth: '2px',
                            position: 'relative',
                          }}
                        />
                        {showMessage && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '2px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                              color: 'white',
                              padding: '2px',
                              borderRadius: '5px',
                            }}
                          >
                            Click QR Code to download
                          </div>
                        )}
                      </div>
                    ) : (
                      <img
                        src={data.qrCodeUrl}
                        alt='QR Code'
                        style={{ width: '30px', height: '30px' }}
                      />
                    )}
                  </div>
                </a>
              )}
              {data.status == 'Active' && (
                <div>
                  <OverlayTrigger
                    overlay={<Tooltip id='button-tooltip'>{tooltipMessage}</Tooltip>}
                    placement='top'
                  >
                    <Button
                      style={smallButtonStyle}
                      onClick={() => copyToClipboard(data.modalUrl)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <FontAwesomeIcon icon={faLink} />
                    </Button>
                  </OverlayTrigger>
                </div>
              )}
            </div>
          )}
          {!showButtons && (
            <div>
              {data.startDate && (
                <div>
                  <hr></hr>
                  <p style={{ fontSize: '14px' }}>
                    {new (window.Date as any)(data.startDate).toLocaleDateString(
                      {},
                      { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric' }
                    )}
                  </p>
                  <hr></hr>
                  <div className='tags'>
                    <a className='color5' style={{ fontSize: '14px' }}>
                      {data.importance[0].toUpperCase() +
                        data.importance.slice(1).toLowerCase() +
                        ' Event'}
                    </a>{' '}
                    <a className='color2' style={{ fontSize: '14px' }}>
                      {data.category == 'TIDS'
                        ? 'TIDS'
                        : data.category === 'teamEvent'
                        ? 'TEAM EVENT'
                        : data.category === 'COP'
                        ? 'COP'
                        : '#HAPPYHERE'}
                    </a>{' '}
                    {data.eventType != 'na' && (
                      <a className='color4' style={{ fontSize: '14px' }}>
                        {data.eventType}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default EventModal
