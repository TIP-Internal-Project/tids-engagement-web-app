import React, { FC } from 'react'
import TidsModal from '../Modal/index'
import { Button, Card, Col, Row } from 'react-bootstrap'

interface FeatureUnavailableProps {
  show: boolean
  onHide: () => void
}

const FeatureUnavailable: FC<FeatureUnavailableProps> = ({ show, onHide }) => {
  return (
    <TidsModal
      show={show}
      isDialog={true}
      onHide={onHide}
      size='lg'
      ariaLabelBy='featureUnavailableModal'
      centered
      hasCloseBtn
      headerContent={<h3>Error</h3>}
      bodyContent={
        <Row className='py-2 text-center '>
          <Card body>Sorry, this feature is currently not available.</Card>
        </Row>
      }
      footerContent={<Button onClick={onHide}>Okay</Button>}
    />
  )
}

export default FeatureUnavailable
