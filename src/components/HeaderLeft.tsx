import React, { useEffect, useState  }  from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import OverviewPage from '../pages/Overview'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

const header = {
	height: '81px',
	// border:'1px solid red'
}

interface HeaderLeftProps {
	pageTitle: string;
  }
  


const HeaderLeft: React.FC<HeaderLeftProps> = ({ pageTitle }) =>  {

	const userSession = useAppSelector((state) => state.userSession)

	return (
		<div className='headerLeft' style={{ fontFamily: 'Mulish' }}>
			<p>{pageTitle}</p>
	  </div>
	)
}


HeaderLeft.propTypes = {
	pageTitle: PropTypes.string.isRequired,
}

export default HeaderLeft