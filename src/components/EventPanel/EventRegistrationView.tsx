import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faStar } from '@fortawesome/free-solid-svg-icons'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { fetchGeolocation } from '../../redux/geolocationSlice'
import { useAppDispatch } from '../../redux/store'
import { register } from '../../redux/eventRegistrationSlice'
import { fetchRegisteredEvents } from '../../redux/registeredEventsSlice'
import { addPoints } from '../../redux/teamMemberPoints/addPointsSlice'

interface EventRegistrationViewProps {
  email: any
}

const EventRegistrationView: FC<EventRegistrationViewProps> = ({ email }) => {
  const API_ROOT = process.env.REACT_APP_API_URL
  const { modalUrl } = useParams()
  const [event, setEvent] = useState<any[]>([])
  const [data, setData] = useState<any>({})
  const [modalUrlParam, setModalUrlParam] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [isQrCodeExpanded, setIsQrCodeExpanded] = useState(false)
  const [signedImageUrl, setSignedImageUrl] = useState('')

  const [tooltipMessage, setTooltipMessage] = useState('Click to copy link')
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const dispatch = useAppDispatch()

  const [registeredEvents, setRegisteredEvents] = useState<any[]>([])

  const fetchRegisteredEventsForUser = async () => {
    const registeredEventsData = await dispatch(fetchRegisteredEvents(email))
    const registeredEventsArray = Object.values(registeredEventsData.payload)
    setRegisteredEvents(registeredEventsArray)
  }

  useEffect(() => {
    fetchRegisteredEventsForUser()
  }, [email, dispatch])

  const isEventRegistered = (eventId: string) => {
    const eventIdNumber = Number(eventId)
    return registeredEvents.some((event) => event.eventId === eventIdNumber)
  }

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
      const currentUrl = window.location.href

      const fullUrl = `${currentUrl}`
      console.log(fullUrl)

      const eventToShow = event.find((e) => e.modalUrl === fullUrl)
      if (eventToShow) {
        setData(eventToShow)
        setOpen(true)
      } else {
        console.log('No matching event found for URL:', fullUrl)
      }
    }
  }, [modalUrl, event])

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
  }, [data.imageUrl])

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
    color: 'white',
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
    console.log(registeredEventsArray)

    fetchRegisteredEventsForUser()
  }

  const EventContent = () => (
    <Card key={data.eventId} sx={{ width: '100%', height: '100%' }} raised>
      <CardMedia component='img' height='140' src={signedImageUrl} alt={data.eventId} />
      <CardContent>
        <Typography gutterBottom variant='body1' component='div' noWrap fontWeight={'bold'}>
          {data.title}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary' noWrap>
          {data.eventDetails}
        </Typography>
        <Typography variant='subtitle2' color='text.secondary' mt={2}>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            {data.eventType === 'na' ? '' : data.eventType}{' '}
            <FontAwesomeIcon icon={faStar} size='1x' style={{ color: '#f4ef6c' }} />
            {data.starsNum + ' '}
            Points
          </p>
        </Typography>
        <Button
          style={ModalButton}
          disabled={
            data.status === 'Inactive' || data.status === 'Completed' || isEventRegistered(data.eventId)
          }
          onClick={() => handleRegister(data.eventId, email, data.starsNum, data.category)}
        >
          REGISTER
        </Button>{' '}
        {/* {data.postEventSurveyURL && (
          <Button style={ModalButton} href={data.postEventSurveyURL}>
            EVENT SURVEY
          </Button>
        )} */}
        {data.gmeetLink && (
          <a href={data.gmeetLink}>
            <img
              style={{ marginLeft: '-1%', marginRight: '-1%', width: '43px', height: '33px' }}
              src={require('../../assets/images/GmeetLogo.png')}
            />
          </a>
        )}
        <a href='https://calendar.google.com/'>
          <img
            style={{ width: '37px', height: '37px' }}
            src={require('../../assets/images/GoogleCalendarLogo.png')}
          />
        </a>
        {data.status !== 'Inactive' && (
          <a>
            <div onClick={() => setIsQrCodeExpanded(!isQrCodeExpanded)} style={{ cursor: 'pointer' }}>
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
                <img src={data.qrCodeUrl} alt='QR Code' style={{ width: '30px', height: '30px' }} />
              )}
            </div>
          </a>
        )}
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
      </CardContent>
    </Card>
  )

  return (
    <>
      {isDesktop ? (
        <Modal
          show={true}
          size='xl'
          aria-labelledby='contained-modal-title-vcenter'
          centered
          backdrop={false}
        >
          <Modal.Header style={modalStyle}>
            <Modal.Title id='contained-modal-title-vcenter' style={ModalTitleDiv}>
              {data.title}
            </Modal.Title>
          </Modal.Header>

          <hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

          <Modal.Body className='ModalBody'>
            <div className='ModalBodyLeft' style={{ width: 'auto' }}>
              <img src={signedImageUrl} />
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

              {data.status != 'Archieved' && (
                <div className='ModalBodyRightSubDiv'>
                  <Button
                    style={ModalButton}
                    disabled={
                      data.status === 'Inactive' ||
                      data.status === 'Completed' ||
                      isEventRegistered(data.eventId)
                    }
                    onClick={() => handleRegister(data.eventId, email, data.starsNum, data.category)}
                  >
                    REGISTER
                  </Button>{' '}
                  {/* {data.postEventSurveyURL && (
                    <Button style={ModalButton} href={data.postEventSurveyURL}>
                      EVENT SURVEY
                    </Button>
                  )} */}
                  {data.gmeetLink && (
                    <a href={data.gmeetLink}>
                      <img
                        style={{ marginLeft: '-1%', marginRight: '-1%', width: '43px', height: '33px' }}
                        src={require('../../assets/images/GmeetLogo.png')}
                      />
                    </a>
                  )}
                  <a href='https://calendar.google.com/'>
                    <img
                      style={{ width: '37px', height: '37px' }}
                      src={require('../../assets/images/GoogleCalendarLogo.png')}
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
                </div>
              )}
              {!true && (
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
      ) : (
        <Grid container justifyContent='center' alignItems='center' sx={{ padding: 2 }}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <EventContent />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default EventRegistrationView
