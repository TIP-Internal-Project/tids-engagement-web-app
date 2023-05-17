import React, { useEffect, useState  }  from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import OverviewPage from '../pages/Overview'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const header = {
	height: '81px',
	// border:'1px solid red'
}



export const HeaderRight = () => {

	const userSession = useAppSelector((state) => state.userSession)

	return (
		
				

		<div className='headerRight'>

								
			<div> <img className="notification" src ={require('../assets/images/notification.png')} /> </div> 
			<div>  |  </div>
								 <div> <p>{userSession.givenName} {userSession.familyName} <img className='userPic' src ={require('../assets/images/user pic.png')} /> </p></div>
							
							
		</div>
						
		
	)
}
