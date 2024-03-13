import Modal from 'react-bootstrap/Modal'
import React, { FC } from 'react'

interface ModalBodyProps {
  customBodyStyle?: object
  bodyContent?: React.ReactNode
}

const ModalBody: FC<ModalBodyProps> = ({ customBodyStyle, bodyContent }) => {
  return <Modal.Body style={customBodyStyle}>{bodyContent}</Modal.Body>
}

export default ModalBody
