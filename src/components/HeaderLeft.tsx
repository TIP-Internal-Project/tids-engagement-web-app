import React from 'react'
import PropTypes from 'prop-types'

interface HeaderLeftProps {
  pageTitle: string
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({ pageTitle }) => {
  return (
    <div className='headerLeft' style={{ fontFamily: 'Mulish' }}>
      <p style={{width:'max-content'}}>{pageTitle}</p>
    </div>
  )
}

HeaderLeft.propTypes = {
  pageTitle: PropTypes.string.isRequired,
}

export default HeaderLeft
