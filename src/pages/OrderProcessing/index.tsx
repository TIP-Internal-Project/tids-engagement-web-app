import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderLeft from '../../components/HeaderLeft'
import { OrderPanel } from '../../components/OrderPanel'

const header = {
  height: '81px',
}

const Orders = () => {
  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false
  const navigate = useNavigate()

  useEffect(() => {
    // If the user is not an admin, redirect to the '/overview' route
    if (!isAdmin) {
      navigate('/overview')
    }
  }, [isAdmin, navigate])

  return (
    <div>
      <Sidebar />
      <div className='div1'>
        <Row>
          <Col style={header}>
            <HeaderLeft pageTitle='Order Processing' />
          </Col>
          <Col style={header}>
            <HeaderRight />
          </Col>
        </Row>

        <OrderPanel />
      </div>
    </div>
  )
}

export default Orders
