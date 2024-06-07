import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import './styles.css'
import React, { useState } from 'react'
import HeaderLeft from '../../components/HeaderLeft'
import { EventPanel } from '../../components/EventPanel/EventPanel'
import FeatureUnavailable from '../../components/FeatureUnavailable/FeatureUnavailable'

const header = {
  height: '81px',
}

const Events = (props: any) => {
  const { variable } = props
  const [visible, setVisible] = useState(false)
  const [showFeatureUnavailable, setShowFeatureUnavailable] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 100) {
      setVisible(true)
    } else if (scrolled <= 100) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const handleUnavailableLinkClick = () => {
    setShowFeatureUnavailable(true)
  }

  // Function to handle closing the FeatureUnavailable modal
  const handleCloseFeatureUnavailable = () => {
    setShowFeatureUnavailable(false)
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <div>
      <Sidebar onUnavailableLinkClick={handleUnavailableLinkClick} />
      <div className='div1'>
        <Row>
          <Col style={header}>
            <HeaderLeft pageTitle='Events' />
          </Col>
          <Col style={header}>
            <HeaderRight />
          </Col>
        </Row>

        <EventPanel variable={variable} />
      </div>
      <button className='back-to-top-button'>
        <img
          onClick={scrollToTop}
          style={{
            display: visible ? 'inline' : 'none',
            width: '42.5px',
            height: '42.5px',
            marginLeft: '82%',
            borderRadius: '50%',
          }}
          src={require('../../assets/images/BackToTop.png')}
          className='back-to-top-circle'
          title='Back to top'
        />
      </button>
      <FeatureUnavailable show={showFeatureUnavailable} onHide={handleCloseFeatureUnavailable} />{' '}
    </div>
  )
}

export default Events
