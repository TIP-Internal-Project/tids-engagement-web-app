import React, { useEffect, useState  }  from 'react'
import { StyledStarDiv,StyledEventDiv,StyledTaskDiv,StyledCOPDiv, TitleDiv, IconDiv, ValueDiv } from '../components/Div/Div.styles'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { TeamMemberInfoState, fetchTeamMemberInfo } from '../redux/teamMemberInfoSlice'

export const Subheader = () => {

	const name = localStorage.getItem('givenName') + ' ' + localStorage.getItem('familyName')

	type TeamMember = {
		workdayId: number
		employeeName: string
		practice: string
		functionalArea: string
		totalStars: number
		starPoints: number
		starPesoConversion: string
		stars2022: number
		stars2023: number
		starPointsDeducted: number
		copPoints: number
		copPesoConversion: number
		cop2022Points: number
		cop2023Points: number
		copPointsDeducted: number
	  }

	const teamMember = useAppSelector((state: any) => state.teamMemberInfoSlice)
  	const dispatch = useAppDispatch()
	const [teamMemberInfo, setTeamMemberInfo] = useState<TeamMember[]>([])

	useEffect(() => {
		dispatch(fetchTeamMemberInfo(name)).then((data: any) => {
		  const teamMemberInfoArray = Object.values(data.payload)
		  setTeamMemberInfo(teamMemberInfoArray as TeamMember[])
		})
	  }, [])
	
	return (
		
		<div>
		    <StyledStarDiv>
				<TitleDiv>Star Points</TitleDiv>
				<IconDiv><img src={require('../assets/images/Star.png')} /></IconDiv>
				<ValueDiv>{teamMemberInfo.at(0)?.starPoints || 0}</ValueDiv>
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
				<ValueDiv>{teamMemberInfo.at(0)?.copPoints || 0}</ValueDiv>
			</StyledCOPDiv>
		</div>
		
	)
}
