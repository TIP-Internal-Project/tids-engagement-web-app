import React, { useEffect, useState } from 'react'
import {
  StyledStarDiv,
  StyledEventDiv,
  StyledTaskDiv,
  StyledCOPDiv,
  TitleDiv,
  IconDiv,
  ValueDiv,
} from '../components/Div/Div.styles'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchUpcomingEventsCount } from '../redux/upcomingEventsCountSlice'
import { fetchPendingTasksCount } from '../redux/pendingTasksCountSlice'
import { fetchTeamMemberPoints } from '../redux/teamMemberPoints/teamMemberPointsSlice'

interface Point {
  starPoints: number
  starPointsDeducted: number
  copPoints: number
  copPointsDeducted: number
}

interface FetchTeamMemberPointsResponse {
  payload: Record<string, Point>
}

export const Subheader = () => {
  const email = localStorage.getItem('email')

  const dispatch = useAppDispatch()
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0)
  const [pendingTasksCount, setPendingTasksCount] = useState(0)
  const [starPointsCount, setStarPointsCount] = useState(0)
  const [copPointsCount, setCopPointsCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        const result = (await dispatch(
          fetchTeamMemberPoints(email)
        )) as unknown as FetchTeamMemberPointsResponse
        const points = Object.values(result.payload || {}) as Point[]

        let totalStarPoints = 0
        let totalCopPoints = 0

        points.forEach((point) => {
          totalStarPoints += point.starPoints - point.starPointsDeducted || 0
          totalCopPoints += point.copPoints - point.copPointsDeducted || 0
        })

        setStarPointsCount(totalStarPoints)
        setCopPointsCount(totalCopPoints)
      }
    }

    fetchData()
  }, [email, dispatch])

  useEffect(() => {
    dispatch(fetchUpcomingEventsCount()).then((data: any) => {
      setUpcomingEventsCount(data.payload)
    })
  }, [])

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
        <IconDiv>
          <img src={require('../assets/images/Star.png')} />
        </IconDiv>
        <ValueDiv>{starPointsCount || 0}</ValueDiv>
      </StyledStarDiv>

      <StyledEventDiv>
        <TitleDiv>Upcoming Events</TitleDiv>
        <IconDiv>
          <img src={require('../assets/images/Calendar.png')} />
        </IconDiv>
        <ValueDiv>{upcomingEventsCount}</ValueDiv>
      </StyledEventDiv>

      <StyledTaskDiv>
        <TitleDiv>Pending Tasks</TitleDiv>
        <IconDiv>
          <img src={require('../assets/images/PendingTasks.png')} />
        </IconDiv>
        <ValueDiv>{pendingTasksCount}</ValueDiv>
      </StyledTaskDiv>

      <StyledCOPDiv>
        <TitleDiv>COP</TitleDiv>
        <IconDiv>
          <img src={require('../assets/images/COP.png')} />
        </IconDiv>
        <ValueDiv>{copPointsCount || 0}</ValueDiv>
      </StyledCOPDiv>
    </div>
  )
}
