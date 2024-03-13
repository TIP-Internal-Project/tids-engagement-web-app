import Modal from 'react-bootstrap/Modal'
import React, { FC } from 'react'

interface ModalHeaderProps {
  hasCloseBtn?: boolean
  customHeaderStyle?: object
  headerContent?: React.ReactNode
}

const ModalHeader: FC<ModalHeaderProps> = ({ hasCloseBtn, customHeaderStyle, headerContent }) => {
  return (
    <Modal.Header closeButton={hasCloseBtn} style={customHeaderStyle}>
      {headerContent}
    </Modal.Header>
  )
}

export default ModalHeader
