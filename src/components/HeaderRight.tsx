import React, { useEffect, useState  }  from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import OverviewPage from '../pages/Overview'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const headerRightP = {
	marginTop: '4px',
	marginBottom: '1rem',
	// border: '1px solid red'
}

export const HeaderRight = () => {

	const userSession = useAppSelector((state) => state.userSession)
	const firstLetter = userSession.givenName.charAt(0)
	const familyNameFirstLetter = userSession.familyName.charAt(0)


	return (
		
				
		<div className='headerRight'>

								
			<div  > <img className="notification" src ={require('../assets/images/notification.png')} /> </div> 
			<div>  |  </div>
			<div > <p>{userSession.givenName} {userSession.familyName} </p></div>
			<div  > 
				<div className='circle'><p style={headerRightP}>{firstLetter}{familyNameFirstLetter}</p></div>
                
			</div>
							
		</div>
						
		
	)
}
