import React, { useEffect, useState  }  from 'react'
import { StyledStarDiv,StyledEventDiv,StyledTaskDiv,StyledCOPDiv, TitleDiv, IconDiv, ValueDiv } from '../components/Div/Div.styles'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchTeamMemberInfo } from '../redux/teamMemberInfoSlice'
import { fetchUpcomingEventsCount } from '../redux/upcomingEventsCountSlice'
import { fetchPendingTasksCount } from '../redux/pendingTasksCountSlice'

export const Subheader = () => {

	const name = localStorage.getItem('givenName') + ' ' + localStorage.getItem('familyName')
	const email = localStorage.getItem('email')

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

  	const dispatch = useAppDispatch()
	const [teamMemberInfo, setTeamMemberInfo] = useState<TeamMember[]>([])
	const [upcomingEventsCount, setUpcomingEventsCount] = useState(0)
	const [pendingTasksCount, setPendingTasksCount] = useState(0)

	useEffect(() => {
		dispatch(fetchTeamMemberInfo(name)).then((data: any) => {
		  const teamMemberInfoArray = Object.values(data.payload)
		  setTeamMemberInfo(teamMemberInfoArray as TeamMember[])
		})
	  }, [])

	const events = useAppSelector((state) => state.eventsCount)

	useEffect(() => {
		dispatch(fetchUpcomingEventsCount()).then((data: any) => {
		  setUpcomingEventsCount(data.payload)
		})
	}, [])

	const tasks = useAppSelector((state) => state.tasksCount)

	useEffect(() => {
		dispatch(fetchPendingTasksCount(email)).then((data: any) => {
		  setPendingTasksCount(data.payload)
		})
	}, [])

	console.log(pendingTasksCount)
	
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
				<ValueDiv>{upcomingEventsCount}</ValueDiv>
			</StyledEventDiv>

			<StyledTaskDiv>
				<TitleDiv>Pending Tasks</TitleDiv>
				<IconDiv><img src={require('../assets/images/PendingTasks.png')} /></IconDiv>
				<ValueDiv>{pendingTasksCount}</ValueDiv>
			</StyledTaskDiv>

			<StyledCOPDiv>
				<TitleDiv>COP</TitleDiv>
				<IconDiv><img src={require('../assets/images/COP.png')} /></IconDiv>
				<ValueDiv>{teamMemberInfo.at(0)?.copPoints || 0}</ValueDiv>
			</StyledCOPDiv>
		</div>
		
	)
}
