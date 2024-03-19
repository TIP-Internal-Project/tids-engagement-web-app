import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../../App.css'
import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import { MyProfilePanel } from '../../components/profileSettingsComponents/profile'
import { fetchEvents } from '../../redux/eventSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

const HeaderLeft = () => {
  return (
    <div className='event-header-left'>
      <p>Settings</p>
    </div>
  )
}

export default function ProfileSettingsPage(props: any) {
  const dispatch = useAppDispatch()
  const { events } = useAppSelector((state) => state.events)
  const userSession = useAppSelector((state) => state.userSession)
  const { variable } = props

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

  return (
    <div>
      <Sidebar />
      <div className='overviewDiv1'>
        <Row>
          <Col style={header}>
            <HeaderLeft />
          </Col>
          <Col style={header}>
            <HeaderRight />
          </Col>
        </Row>
        <MyProfilePanel variable={variable}></MyProfilePanel>
        <Row>
          <Col style={footerComponent}></Col>
        </Row>
      </div>
    </div>
  )
}
