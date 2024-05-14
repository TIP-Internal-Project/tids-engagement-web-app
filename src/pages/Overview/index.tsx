import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchEvents } from '../../redux/eventSlice'
import { Event } from '../../interfaces/adminFeatureApi/Event'
import '../../App.css'
import { Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Sidebar } from '../../components/Sidebar'
import EventsPanel from '../../components/overviewComponents/events'
import { HeaderRight } from '../../components/HeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import { Subheader } from '../../components/Subheader'
import Calendar from '../../components/Calendar/Calendar'
import FeatureUnavailable from '../../components/FeatureUnavailable/FeatureUnavailable'

export default function OverviewPage() {
  const dispatch = useAppDispatch()
  const { events } = useAppSelector((state) => state.events)
  const userSession = useAppSelector((state) => state.userSession)
  const [showFeatureUnavailable, setShowFeatureUnavailable] = useState(false)

  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

  // CSS samples

  const header = {
    height: '81px',
    // border:'1px solid red'
  }

  const header2 = {
    height: 'auto',
    // border:'1px solid red'
  }

  const footerComponent = {
    height: '210px',
    // border:'1px solid red'
  }

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  // Function to handle click on unavailable feature link
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
      <div className='overviewDiv1'>
        <Row>
          <Col className='admin' style={header}>
            <HeaderLeft pageTitle='Overview' />
          </Col>
        </Row>

        <Row>
          <Col style={header2}>
            <Subheader />
          </Col>
        </Row>

        <Col>{isAdmin && <Calendar />}</Col>

        <EventsPanel></EventsPanel>

        <Row>
          <Col style={footerComponent}></Col>
        </Row>
      </div>
      <FeatureUnavailable show={showFeatureUnavailable} onHide={handleCloseFeatureUnavailable} />{' '}
    </div>
  )
}
