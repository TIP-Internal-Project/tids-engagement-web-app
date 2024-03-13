import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import { useAppDispatch } from '../redux/store'
import { deleteEvent } from '../redux/deleteEventSlice'

interface EventModalProps {
  show: boolean
  onHide: () => void
  onChange: () => void
  modalData: any[]
}

const DeleteEventModal: React.FC<EventModalProps> = ({ show, onHide, onChange, modalData }) => {
  const modalStyle = {
    border: 'none', // Add a new border style
    margin: '4%',
    marginBottom: '0',
  }

  const ModalTitleDiv = {
    display: 'inline-flex',
  }

  const dispatch = useAppDispatch()

  const [buttonClicked, setButtonClicked] = useState(false)

  const [data, setData] = useState<any>({})

  useEffect(() => {
    setData(modalData)
  }, [modalData])

  const [eventValues, setEventValues] = useState<any>({})

  useEffect(() => {
    setEventValues(data)
  }, [data])

  const handleDeleteEvent = async () => {
    const status = 'Archived'
    const updatedBy = localStorage.getItem('givenName') + ' ' + localStorage.getItem('familyName')
    const updatedAt = new Date()

    await setEventValues((prevValues: any) => ({
      ...prevValues,
      status,
      updatedBy,
      updatedAt,
    }))

    setButtonClicked(true)
  }

  useEffect(() => {
    if (buttonClicked) {
      console.log(eventValues)
      dispatch(deleteEvent(eventValues))
      setButtonClicked(false)
      onChange()
    }
  }, [buttonClicked])

  return (
    <Modal show={show} onHide={onHide} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton style={modalStyle}>
        <Modal.Title id='contained-modal-title-vcenter' style={ModalTitleDiv}>
          Confirm Archive
        </Modal.Title>
      </Modal.Header>

      <hr style={{ width: '87%', margin: '1rem auto', borderWidth: '2px', marginTop: '-5px' }} />

      <Modal.Body className='ModalBody'>
        <Container fluid className='px-5'>
          Are you sure you want to archive this event?
          <Row className='justify-content-end' style={{ marginTop: '30px' }}>
            <Col
              xs={3}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                color: '#2B8000',
                marginRight: '2%',
              }}
            >
              <Button
                variant='primary'
                className='px-4'
                onClick={onHide}
                style={{ backgroundColor: 'rgb(43, 128, 0)', borderColor: 'rgb(43, 128, 0)' }}
              >
                Cancel
              </Button>
            </Col>
            <Col
              xs={3}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: '2%' }}
            >
              <Button
                variant='danger'
                className='px-4'
                onClick={handleDeleteEvent}
                style={{ backgroundColor: '#c12335', borderColor: '#c12335' }}
              >
                Archive
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteEventModal
