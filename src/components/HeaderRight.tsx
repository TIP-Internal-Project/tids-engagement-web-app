import React, { useEffect, useState  }  from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import OverviewPage from '../pages/Overview'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
const headerRightP = {
	marginTop: '4px',
	marginBottom: '1rem',
	color: 'white',
	fontFamily: 'Mulish'
	// border: '1px solid red'
}

export const HeaderRight = () => {
	const givenNameInitial = sessionStorage.getItem('givenName')?.charAt(0)
	const familyNameInitial = sessionStorage.getItem('familyName')?.charAt(0)
	
	return (
		
				
		<div className='headerRight'>
			<div> <img className="search" src ={require('../assets/images/Search.png')} /> </div>								
			<div> <img className="notification" src ={require('../assets/images/notification.png')} /> </div> 
			<div style={{ color: '#D8D8D8' }}>  |  </div>
			<div> <a href="url" style={{color: 'black', textDecoration: 'none'}}><Link to='/profile' style={{color: 'black', textDecoration: 'none'}}><p style={{ fontFamily: 'Mulish' }}>{sessionStorage.getItem('givenName') + ' ' + sessionStorage.getItem('familyName')}</p></Link></a></div>
			<div> 
				<Link to='/profile' style={{ textDecoration: 'none'}}>
					<div className='circle'><p style={headerRightP}>
							{givenNameInitial}
							{familyNameInitial}
						</p>
					</div>
				</Link>    
			</div>
							
		</div>
						
		
	)
}