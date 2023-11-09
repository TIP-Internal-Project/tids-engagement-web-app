import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import { EventsDetails, NavOptions, EventsTitles, EventsDates, ViewDetails, RegisterActionButton, EventTime, HappyHereCategory, TIDSCategory, COPCategory, TeamEventCategory } from './styles'
import './styles.css'
import React, { useState } from 'react'
import EventModal from '../../components/EventModal'
import Button from 'react-bootstrap/Button'
import HeaderLeft from '../../components/HeaderLeft'
import { EventPanel2 } from '../../components/EventPanel2'


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

const Events = (props: any) => {

	const [modalShow, setModalShow] = useState(false)
  
	const handleOpenModal = () => {
	  setModalShow(true)
	}
  
	const handleCloseModal = () => {
	  setModalShow(false)
	}

	const { variable } = props

	const [visible, setVisible] = useState(false) 
  
	const toggleVisible = () => { 
		const scrolled = document.documentElement.scrollTop
		if (scrolled > 100){ 
			setVisible(true) 
		}  
		else if (scrolled <= 100){ 
			setVisible(false) 
		} 
	}
	
	const scrollToTop = () =>{ 
		window.scrollTo({ 
		top: 0,  
		behavior: 'smooth'
		})
	}
	
	window.addEventListener('scroll', toggleVisible)

	return (
		<div>
			
			<Sidebar />
			{/* <div>
				<img src={require('../../assets/images/white circle.png')} className='circle-for-back-option'/>
				<img src={require('../../assets/images/less-than-symbol.png')} className='arrow-for-back-option'/>
			</div> */}
			
			<div className='div1'>
				<Row>
					<Col style={header}>
						<HeaderLeft pageTitle="Events" />
					</Col>
					<Col style={header}> 
						<HeaderRight />
					</Col>
				</Row>

				<EventPanel2 variable={variable}/>
				
			</div>
			<button className='back-to-top-button'>
				<img onClick={scrollToTop} style={{display: visible ? 'inline' : 'none', width: '42.5px', height: '42.5px', marginLeft: '82%', borderRadius: '50%'  }} src={require('../../assets/images/BackToTop.png')} className='back-to-top-circle' title='Back to top'/>
			</button>
			{/* <EventModal show={modalShow} onHide={handleCloseModal}/> */}
		</div>
	)
}

export default Events