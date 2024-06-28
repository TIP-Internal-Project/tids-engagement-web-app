import React, { FC } from 'react'
import TidsModal from '../Modal/index'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

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
      bodyContent={
        <Container fluid>
          <Card className='border-danger text-danger m-3'>
            <Row className='align-items-center'>
              <Col md='2'>
                <Card.Body className='text-center bg-danger text-white'>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    style={{ width: '50px', height: 'auto' }}
                  />
                </Card.Body>
              </Col>
              <Col>
                <Card.Body>
                  <h4>Sorry, this feature is currently not available.</h4>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      }
      footerContent={<Button onClick={onHide}> CLOSE </Button>}
    />
  )
}

export default FeatureUnavailable
