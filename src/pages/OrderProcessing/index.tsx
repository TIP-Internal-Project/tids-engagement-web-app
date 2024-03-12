import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import HeaderLeft from '../../components/HeaderLeft'
import { EventPanel2 } from '../../components/EventsPanel2/EventPanel2'
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

const Orders = () => {
	const [modalShow, setModalShow] = useState(false)
	const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false
	const navigate = useNavigate()
  
	const handleOpenModal = () => {
	  setModalShow(true)
	}
  
	const handleCloseModal = () => {
	  setModalShow(false)
	}

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
						<HeaderLeft pageTitle="Order Processing" />
					</Col>
					<Col style={header}> 
						<HeaderRight />
					</Col>
				</Row>

				<OrderPanel/>
				
			</div>
		</div>
	)
}

export default Orders