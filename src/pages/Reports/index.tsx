import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import './styles.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderLeft from '../../components/HeaderLeft'
import { ReportPanel } from '../../components/ReportPanel'
import { ReportsTable } from '../../components/ReportsTable'
import FeatureUnavailable from '../../components/FeatureUnavailable/FeatureUnavailable'

const header = {
  height: '81px',
  // border:'1px solid red'
}

const Reports = (props: any) => {
  const { variable } = props
  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
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

  window.addEventListener('scroll', toggleVisible)

  useEffect(() => {
    // If the user is not an admin, redirect to the '/overview' route
    if (!isAdmin) {
      navigate('/overview')
    }
  }, [isAdmin, navigate])

  const handleUnavailableLinkClick = () => {
    setShowFeatureUnavailable(true)
  }

  // Function to handle closing the FeatureUnavailable modal
  const handleCloseFeatureUnavailable = () => {
    setShowFeatureUnavailable(false)
  }

  return (
    <div>
      <Sidebar onUnavailableLinkClick={handleUnavailableLinkClick} />
      {/* <div>
				<img src={require('../../assets/images/white circle.png')} className='circle-for-back-option'/>
				<img src={require('../../assets/images/less-than-symbol.png')} className='arrow-for-back-option'/>
			</div> */}
      <div className='div1'>
        <Row>
          <Col style={header}>
            <HeaderLeft pageTitle='Reports' />
          </Col>
          <Col style={header}>
            <HeaderRight />
          </Col>
        </Row>

        <ReportPanel variable={variable} />
      </div>
      <FeatureUnavailable show={showFeatureUnavailable} onHide={handleCloseFeatureUnavailable} />{' '}
    </div>
  )
}

export default Reports
