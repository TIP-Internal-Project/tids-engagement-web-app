import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchEvents } from '../../redux/eventSlice'
import { Event } from '../../interfaces/adminFeatureApi/Event'
import '../../App.css'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Sidebar } from '../../components/Sidebar'
import {
  StyledStarDiv,
  StyledEventDiv,
  StyledTaskDiv,
  StyledCOPDiv,
  TitleDiv,
  IconDiv,
  ValueDiv,
} from '../../components/Div/Div.styles'
import { MyProfilePanel } from '../../components/profileSettingsComponents/profile'
import { HeaderRight } from '../../components/HeaderRight'
import { Subheader } from '../../components/Subheader'

const HeaderLeft = () => {
  return (
    <div className='event-header-left'>
      <p>Settings</p>
    </div>
  )
}

export default function ProfileSettingsPage(props: any) {
  const dispatch = useAppDispatch()
  const { events } = useAppSelector((state) => state.events)
  const userSession = useAppSelector((state) => state.userSession)
  const { variable } = props

  const header = {
    height: '81px',
    // border:'1px solid red'
  }

  const header2 = {
    height: 'auto',
    // border:'1px solid red'
  }

  const footerComponent = {
    height: '210px',
    // border:'1px solid red'
  }

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div>
      <Sidebar />
      <div className='overviewDiv1'>
        <Row>
          <Col style={header}>
            <HeaderLeft />
          </Col>
          <Col style={header}>
            <HeaderRight />
          </Col>
        </Row>
        <MyProfilePanel variable={variable}></MyProfilePanel>
        <Row>
          <Col style={footerComponent}></Col>
        </Row>
      </div>
    </div>
  )
}
