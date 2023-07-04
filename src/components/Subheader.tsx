import React, { useEffect, useState  }  from 'react'
import { StyledStarDiv,StyledEventDiv,StyledTaskDiv,StyledCOPDiv, TitleDiv, IconDiv, ValueDiv } from '../components/Div/Div.styles'



export const Subheader = () => {

	
	
	return (
		
		<div>
		    <StyledStarDiv>
				<TitleDiv>Star Points</TitleDiv>
				<IconDiv><img src={require('../assets/images/Star.png')} /></IconDiv>
				<ValueDiv>9,999</ValueDiv>
			</StyledStarDiv>

			<StyledEventDiv>
				<TitleDiv>Upcoming Events</TitleDiv>
				<IconDiv><img src={require('../assets/images/Calendar.png')} /></IconDiv>
				<ValueDiv>10</ValueDiv>
			</StyledEventDiv>

			<StyledTaskDiv>
				<TitleDiv>Pending Tasks</TitleDiv>
				<IconDiv><img src={require('../assets/images/PendingTasks.png')} /></IconDiv>
				<ValueDiv>10</ValueDiv>
			</StyledTaskDiv>

			<StyledCOPDiv>
				<TitleDiv>COP</TitleDiv>
				<IconDiv><img src={require('../assets/images/COP.png')} /></IconDiv>
				<ValueDiv>10</ValueDiv>
			</StyledCOPDiv>
		</div>
		
	)
}
