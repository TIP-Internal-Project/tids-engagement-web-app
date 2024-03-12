import Modal from 'react-bootstrap/Modal'
import React, { FC } from 'react'

interface ModalFooterProps {
    customFooterStyle?: object
    footerContent?: React.ReactNode
}

const ModalFooter: FC<ModalFooterProps> = ({customFooterStyle, footerContent}) => {
  return (
    <Modal.Footer style={customFooterStyle}>
        {footerContent}
    </Modal.Footer>
  )
}

export default ModalFooter