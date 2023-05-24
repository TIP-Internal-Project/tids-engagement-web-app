

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
			{/* <div>
				<img src={require('../../assets/images/white circle.png')} className='circle-for-back-option'/>
				<img src={require('../../assets/images/less-than-symbol.png')} className='arrow-for-back-option'/>
			</div> */}
			<div className='back-to-top-button'>
				<p>Back to Top</p>
				<img src={require('../../assets/images/oval.png')} className='back-to-top-circle'/>
				<img src={require('../../assets/images/up-arrow.png')} className='back-to-top-arrow'/>
			</div>
			<div className='div1'>
				<Row>
					<Col style={header}>
						<EventsHeaderLeft />
					</Col>
					<Col style={header}> 
						<HeaderRight />
						
						

					</Col>
				</Row>
				<div className='events-panel'>
					<EventsDetails>
						<ul className='nav-options'>
							<NavOptions className='refresh'><img src ={require('../../assets/images/refresh.png')} className='refresh-icon'/>Refresh</NavOptions>
							<NavOptions className='sort'><img src ={require('../../assets/images/sort-up.png')} className='sort-icon'/>Sort</NavOptions>
							<NavOptions className='filter'><img src ={require('../../assets/images/filter.png')} className='filter-icon'/>Filter</NavOptions>
						</ul>
						<h3 id='current-events-registered'>Currently Registered</h3>
						<hr />
						<h3 id='no-events'>No Events</h3>
						<table id='unregistered-events-table'>
							<tr id=''>
								<th id='event-head-title'>Title</th>
								<th id='event-head-date'>Date</th>
								<th id='event-head-category'>Category</th>
								<th id='event-head-action'>Action</th>
							</tr>
							<tr>
								<td>
									<EventsTitles>
										<img src={require('../../assets/images/caution.png')} alt='' className='caution-icon' />
										<a href="#" className='EventModalLink' onClick={handleOpenModal}>
              Save the date: Be part of the TELUS Days of Giving
										</a>
									</EventsTitles><ViewDetails><a href="" className='view-details'>View details</a></ViewDetails>
								</td>
								<td>
									<EventsDates>August 25, 2022</EventsDates>
									<EventTime>6:30 PM</EventTime>
								</td>
								<td><HappyHereCategory>#HAPPYHERE</HappyHereCategory></td>
								<td><RegisterActionButton>REGISTER</RegisterActionButton></td>
							</tr>
							<tr>
								<td>
									<EventsTitles><img src={require('../../assets/images/caution.png')} alt='' className='caution-icon'/>Open Web-Session | BigQuery GCP | 31st</EventsTitles>
									<ViewDetails><a href="" className='view-details'>View details</a></ViewDetails>
								</td>
								<td>
									<EventsDates>August 25, 2022</EventsDates>
									<EventTime>6:30 PM</EventTime>
								</td>
								<td><TIDSCategory>TIDS</TIDSCategory></td>
								<td><RegisterActionButton>REGISTER</RegisterActionButton></td>
							</tr>
							<tr>
								<td>
									<EventsTitles>HappyHere FlipTIP Intersite Competition</EventsTitles>
									<ViewDetails><a href="" className='view-details'>View details</a></ViewDetails>
								</td>
								<td>
									<EventsDates>August 25, 2022</EventsDates>
									<EventTime>6:30 PM</EventTime>
								</td>
								<td><HappyHereCategory>#HAPPYHERE</HappyHereCategory></td>
								<td><RegisterActionButton>REGISTER</RegisterActionButton></td>
							</tr>
							<tr>
								<td>
									<EventsTitles><img src={require('../../assets/images/caution.png')} alt='' className='caution-icon'/>DevOps CoP: Call for Video Content</EventsTitles>
									<ViewDetails><a href="" className='view-details'>View details</a></ViewDetails>
								</td>
								<td>
									<EventsDates>August 25, 2022</EventsDates>
									<EventTime>6:30 PM</EventTime>
								</td>
								<td><TeamEventCategory>TEAM EVENT</TeamEventCategory></td>
								<td><RegisterActionButton>REGISTER</RegisterActionButton></td>
							</tr>
							<tr>
								<td>
									<EventsTitles>Learning from the Experts: Evolution of Communication</EventsTitles>
									<ViewDetails><a href="" className='view-details'>View details</a></ViewDetails>
								</td>
								<td>
									<EventsDates>August 25, 2022</EventsDates>
									<EventTime>6:30 PM</EventTime>
								</td>
								<td><TIDSCategory>TIDS</TIDSCategory></td>
								<td><RegisterActionButton>REGISTER</RegisterActionButton></td>
							</tr>
							<tr>
								<td>
									<EventsTitles>Simple Wellness: Find the Beat</EventsTitles>
									<ViewDetails><a href="" className='view-details'>View details</a></ViewDetails>
								</td>
								<td>
									<EventsDates>August 25, 2022</EventsDates>
									<EventTime>6:30 PM</EventTime>
								</td>
								<td><COPCategory>COP</COPCategory></td>
								<td><RegisterActionButton>REGISTER</RegisterActionButton></td>
							</tr>
						</table>
					</EventsDetails>
				</div>
			</div>
			<EventModal show={modalShow} onHide={handleCloseModal} />
		</div>
	)
}

export default Events