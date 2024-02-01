import { HeaderRight } from '../../components/HeaderRight'
import { Sidebar } from '../../components/Sidebar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'
import './styles.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderLeft from '../../components/HeaderLeft'
import { ReportPanel } from '../../components/ReportPanel'
import { ReportsTable } from '../../components/ReportsTable'

const header = {
	height: '81px',
	// border:'1px solid red'
}


const Events = (props: any) => {

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
			{/* <div>
				<img src={require('../../assets/images/white circle.png')} className='circle-for-back-option'/>
				<img src={require('../../assets/images/less-than-symbol.png')} className='arrow-for-back-option'/>
			</div> */}
			
			<div className='div1'>
				<Row>
					<Col style={header}>
						<HeaderLeft pageTitle="Reports" />
					</Col>
					<Col style={header}> 
						<HeaderRight />
					</Col>
				</Row>

				<ReportPanel variable={variable}/>
				
			</div>
		</div>
	)
}

export default Events