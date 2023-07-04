import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OrderModal from './OrderDetailsModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { OrderState, fetchOrders } from '../redux/orderSlice'
import { updateOrder, updateOrderStatus  } from '../redux/updateOrderSlice'

export const OrderPanel = () => {
  const tidsBadge = {
    background: '#2A66FF',
    border: '#2A66FF',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const happyBadge = {
    backgroundColor: '#4B286D',
    border: '#4B286D',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const copBadge = {
    backgroundColor: '#FF0AE6',
    border: '#FF0AE6',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  }
  const teamBadge = {
    backgroundColor: '#66CC00',
    border: '#66CC00',
    width: '115px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  }

  const TitleBar = {
    paddingTop: '24px',
    color: '#9FA2B4',
  }

  const IndItemTitleDisplay = {
    fontFamily: 'Mulish',
    color: '#2A2C2E',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '24px',
    FontStyle: 'normal',
    marginBottom: '0',
  }

  const IndItem = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    color: '#252733',
  }

  const IndItemDueTimeDisplay = {
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '28px',
    FontStyle: 'normal',
    marginBottom: '0',
    color: '#C5C7CD',
  }

  const actionBadge = {
    width: '50%',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  }

  const viewDetailsButton = {
    padding: '1px 2px',
    fontSize: '11px',
    background: 'none',
    border: 'none',
    color: 'green',
  }

  const [eventStates, setEventStates] = useState<{ [key: number]: boolean }>({})

  const [detailsModalShow, setDetailsModalShow] = useState(false)

  const handleOpenDetailsModal = () => {
    setDetailsModalShow(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalShow(false)
  }

  const orders = useAppSelector((state: { order: { orders: { [key: number]: { status: string } }; loading: boolean; error: string | null } }) => state.order)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  const handleAddedOrders = () => {
    setDetailsModalShow(false)
    dispatch(fetchOrders())
  }

  const handleClaimOrder = (orderId: number) => {
  dispatch(updateOrderStatus({ orderId: String(orderId), status: 'Claimed' }))
    .then((action) => {
      // Handle successful response
      console.log('Order status updated successfully')
      dispatch(fetchOrders()) // Fetch the updated list of orders
    })
    .catch((error) => {
      // Handle error
      console.error('Failed to update order status:', error)
    })
}
  
  const handleCancelOrder = (orderId: number) => {
	// Dispatch the updateOrderStatus action to update the order status to "Cancelled"
	dispatch(updateOrderStatus({ orderId: String(orderId), status: 'Cancelled' }))
  }

  const renderedOrders = Object.values(orders.orders).map((order: any, index) => {
    return (
      <ListGroup.Item
        key={order.orderId}
        style={{ borderLeft: 'none', borderRight: 'none', borderRadius: '0px' }}
        className="px-3"
      >
        <Row className="py-2">
          <Col xs={3} style={IndItemTitleDisplay}>
            <p className="mb-0">{order.name}</p>
            <Button style={viewDetailsButton} className="">
              {order.workdayId}
            </Button>
          </Col>

          <Col xs={2} className="">
            <p style={IndItem} className="mb-0">
              {order.orderName}
            </p>
          </Col>

          <Col xs={1} className="text-center">
            <p style={IndItem} className="mb-0">
              {order.orderSize}
            </p>
          </Col>

          <Col xs={2} className="text-center ps-0">
            <p style={IndItem} className="mb-0">
              {order.orderCost}
            </p>
          </Col>

          <Col xs={1} className="ps-0">
            <p style={IndItem} className="mb-0">
              {order.status}
            </p>
          </Col>

		  <Col xs={3} style={{ display: 'flex', justifyContent: 'center', fontSize: '12px' }}>
		  <Button
  className={order.status === 'Claimed' ? 'bg-secondary border-secondary mx-1 disabled' : 'bg-danger border-danger mx-1'}
  style={actionBadge}
  onClick={() => handleCancelOrder(order.orderId)}
>
  CANCEL
</Button>
<Button
  className={order.status === 'Claimed' ? 'bg-secondary border-secondary mx-1 disabled' : 'bg-success border-success mx-1'}
  style={actionBadge}
  onClick={() => handleClaimOrder(order.orderId)}
>
  CLAIM
</Button>
      </Col>

        </Row>
      </ListGroup.Item>
    )
  })

  return (
    <Container fluid style={{ backgroundColor: '#f5f5f5', height: '100vh', width: '100%', padding: '32px' }} className="mx-auto">
      <Container fluid style={{ backgroundColor: 'white', height: '100%', width: '100%', borderRadius: '20px' }} className="px-0 py-4">
        <Row className="ps-4 pe-2">
          <Col xs={8} className="px-3" style={{ color: '#9FA2B4' }}>
            <Nav.Link className="" onClick={handleOpenDetailsModal}>
              <span className="me-2" style={{ fontSize: '20px', fontWeight: 'heavy', color: 'black' }}>
                +
              </span>{' '}
              New Entry
            </Nav.Link>
          </Col>

          <Col className="text-center"></Col>

          <Col className="text-center">
            <Nav.Link href="" className="">
              <img style={{ height: '15px', width: '15px', marginRight: '10px' }} src={require('../assets/images/sort-up.png')} />Sort
            </Nav.Link>
          </Col>

          <Col>
            <Nav.Link href="/home" className="">
              <img style={{ height: '15px', width: '14px', marginRight: '10px' }} src={require('../assets/images/filter.png')} />Filter
            </Nav.Link>
          </Col>
        </Row>

        <Row style={TitleBar} className="px-3">
          <Col xs={3}>Team Member</Col>
          <Col xs={2} className="">
            Order
          </Col>
          <Col xs={1} className="text-center">
            Size
          </Col>
          <Col xs={2} className="text-center ps-0">
            Cost (Star Points)
          </Col>
          <Col xs={1} className="ps-0">
            Status
          </Col>
          <Col xs={3} className="text-center">
            Action
          </Col>
        </Row>
        <ListGroup>
          {orders.loading && <div style={TitleBar}>{'Loading...'}</div>}
          {!orders.loading && orders.error ? <div style={TitleBar}>{'Error: ' + orders.error}</div> : null}
          {renderedOrders}
        </ListGroup>
      </Container>
      <OrderModal show={detailsModalShow} onHide={handleCloseDetailsModal} addedOrders={handleAddedOrders} />
    </Container>
  )
}

export default OrderPanel
