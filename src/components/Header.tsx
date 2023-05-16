import React, { useEffect, useState  }  from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import OverviewPage from '../pages/Overview'





export const Header = () => {

	const userSession = useAppSelector((state) => state.userSession)

	return (
		<div className='header'>
			<div>test</div>
			<div>test 2</div>
			<div className='headerContent'> 
	
				<p>{userSession.familyName}, {userSession.givenName}</p>

			</div>
		
		</div>
	)
}
