import React, { FC } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from './ModalBody'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'

interface ModalProps {
  isDialog?: boolean
  show: boolean
  onHide: () => void
  size: 'sm' | 'lg' | 'xl'
  ariaLabelBy: string
  centered?: boolean
  hasCloseBtn?: boolean
  customHeaderStyle?: object
  customBodyStyle?: object
  customFooterStyle?: object
  headerContent?: React.ReactNode
  bodyContent?: React.ReactNode
  footerContent?: React.ReactNode
  hasHeader?: boolean
  hasBody?: boolean
  hasFooter?: boolean
  hasSeperator?: boolean
}

const TidsModal: FC<ModalProps> = ({
  isDialog = false,
  size,
  onHide,
  show,
  ariaLabelBy,
  centered = false,
  hasCloseBtn,
  customHeaderStyle,
  headerContent,
  customBodyStyle,
  bodyContent,
  customFooterStyle,
  footerContent,
  hasSeperator = true,
}) => {
  return (
    <Modal
      backdrop={isDialog ? 'static' : false}
      show={show}
      onHide={onHide}
      size={size}
      aria-labelledby={ariaLabelBy}
      centered={centered}
    >
      {headerContent && (
        <ModalHeader
          hasCloseBtn={hasCloseBtn}
          customHeaderStyle={customHeaderStyle}
          headerContent={headerContent}
          onHide={onHide}
        />
      )}
      {bodyContent && <ModalBody customBodyStyle={customBodyStyle} bodyContent={bodyContent} />}
      {footerContent && (
        <ModalFooter customFooterStyle={customFooterStyle} footerContent={footerContent} />
      )}
    </Modal>
  )
}

export default TidsModal
