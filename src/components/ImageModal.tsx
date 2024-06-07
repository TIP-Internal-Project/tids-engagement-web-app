import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'



interface ImageModalProps {
  show: boolean
  onHide: () => void
  title: string
  imageUrl: File | null
  action: string
}

interface Expense {
    id: string
    description: string
    amount: number
    receipt: File | null
}


const ImageModal: React.FC<ImageModalProps> = ({ show, onHide, title, imageUrl, action }) => {


  return (
    <Modal
      show={show}
      onHide={onHide}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='bg-grey'
    > 
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      { imageUrl ? 
        <img 
        src={URL.createObjectURL(imageUrl)}
        alt="Uploaded Image" 
        style={{ width: '100%' }} /> :
        <img 
        src=''
        alt="Uploaded Image" 
        style={{ width: '100%' }} />
      }
      
    </Modal.Body>
  </Modal>
  )
}

export default ImageModal
