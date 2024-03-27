import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../../App.css'
import HeaderLeft from '../../components/HeaderLeft'
import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import { TaskPanel } from '../../components/TaskPanel'
import { fetchEvents } from '../../redux/eventSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

interface TaskPageProps {
  email: string
}

export default function TaskPage(props: TaskPageProps) {
  const dispatch = useAppDispatch()
  const { events } = useAppSelector((state) => state.events)
  const userSession = useAppSelector((state) => state.userSession)

  // CSS samples
  const header = {
    height: '81px',
    // border:'1px solid red'
  }
  const footerComponent = {
    height: '210px',
    // border:'1px solid red'
  }

  const { email } = props

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div>
      <Sidebar />
      <div className='div1'>
        <Row>
          <Col style={header}>
            <HeaderLeft pageTitle='Tasks' />
          </Col>
          <Col style={header}>
            <HeaderRight />
          </Col>
        </Row>
        <TaskPanel email={email} />
      </div>
    </div>
  )
}
