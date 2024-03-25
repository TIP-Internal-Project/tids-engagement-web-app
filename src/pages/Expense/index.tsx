import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import './styles.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderLeft from '../../components/HeaderLeft'
import { ExpensePanel } from '../../components/Expense/ExpensePanel'


const header = {
	height: '81px',
	// border:'1px solid red'
}

const Expense = (props: any) => {

	const { variable } = props

	const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

	const [visible, setVisible] = useState(false) 

	const navigate = useNavigate()
  
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
						<HeaderLeft pageTitle="Expense" />
					</Col>
					<Col style={header}> 
						<HeaderRight />
					</Col>
				</Row>

				<ExpensePanel variable={variable}/>
				
			</div>
			<button className='back-to-top-button'>
				<img onClick={scrollToTop} style={{display: visible ? 'inline' : 'none', width: '42.5px', height: '42.5px', marginLeft: '82%', borderRadius: '50%'  }} src={require('../../assets/images/BackToTop.png')} className='back-to-top-circle' title='Back to top'/>
			</button>
			{/* <EventModal show={modalShow} onHide={handleCloseModal}/> */}
		</div>
	)
}

export default Expense