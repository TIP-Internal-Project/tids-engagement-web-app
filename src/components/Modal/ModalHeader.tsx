import Modal from 'react-bootstrap/Modal'
import React, { FC } from 'react'

interface ModalHeaderProps {
  hasCloseBtn?: boolean
  customHeaderStyle?: object
  headerContent?: React.ReactNode
  onHide: () => void
}

const ModalHeader: FC<ModalHeaderProps> = ({
  hasCloseBtn,
  customHeaderStyle,
  headerContent,
  onHide,
}) => {
  return (
    <Modal.Header closeButton={hasCloseBtn} style={customHeaderStyle} onHide={onHide}>
      {headerContent}
    </Modal.Header>
  )
}

export default ModalHeader
