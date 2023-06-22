import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import React, { useState } from 'react'
// import EventModal from '../../components/EventModal'
import Button from 'react-bootstrap/Button'
import HeaderLeft from '../../components/HeaderLeft'
import { EventPanel2 } from '../../components/EventPanel2'
import {OrderPanel} from '../../components/OrderPanel'


const EventsHeaderLeft = () => {
	return (
		<div className='event-header-left'>
			<p>Events</p>
		</div>
	)
}

const header = {
	height: '81px',
	// border:'1px solid red'
}

const categoryBadge = {
	fontSize: '69%',
	fontWeight: '700',
	textAlign: 'center',
	color: '#FFFFFF'
    
}

const Events = () => {
	const [modalShow, setModalShow] = useState(false)
  
	const handleOpenModal = () => {
	  setModalShow(true)
	}
  
	const handleCloseModal = () => {
	  setModalShow(false)
	}

	return (
		<div>
			
			<Sidebar />
			<div className='div1'>
				<Row>
					<Col style={header}>
						<HeaderLeft pageTitle="Order Processing" />
					</Col>
					<Col style={header}> 
						<HeaderRight />
					</Col>
				</Row>

				<OrderPanel/>
				
			</div>
			{/* <EventModal show={modalShow} onHide={handleCloseModal} /> */}
		</div>
	)
}

export default Events