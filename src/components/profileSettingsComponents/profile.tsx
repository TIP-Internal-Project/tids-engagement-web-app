import Papa from 'papaparse'
import React, { useEffect, useState } from 'react'
import { Sheet, DividerLineHorizonta, Frame6, CarbonNotificationFi, EmailNotifications, Frame5, CarbonNotificationFi1, MediaVisibility, 
	Frame8, CarbonNotificationFi2, MuteAllNotifications, Frame10, CarbonNotificationFi3, ShowPromotions, Frame11, CarbonNotificationFi4, 
	ShowPastEvents, NotificationSettings, DividerLineHorizonta1, PrivacySettings, DividerLineHorizonta2, AppSettings, Frame13, 
	CarbonNotificationFi5, AutoHideNavigationMe, Toggle6, Title, FullName, Photo, Rectangle2, Email, Rectangle8, WorkdayId, Rectangle9, 
	FunctionalArea, Rectangle10, Supervisor, Rectangle11, Manager, Rectangle12, NewSpan, NewInput } from './style'
import TIDSRoster from '../../assets/files/TIDS_Roster.csv'

export const MyProfilePanel = (props: any) => {
	
	interface Row {
		[key: string]: string
	}

	const renderedDetails = () => {

		const [foundRows, setFoundRows] = useState<Row[]>([])

		let foundRow:any = []
		let name:any
		let email:any
		let supervisor:any
		let workdayId:any
		let functionalArea:any
		let manager:any

		useEffect(() => {
			const fetchData = async () => {
				const response = await fetch(TIDSRoster) // Replace with your CSV file URL or data source
				const csvData = await response.text()

				const parsedData = Papa.parse(csvData, { header: true }).data
				const searchString = props.variable

				const filteredRows = parsedData.filter((row: Row) => {
					const values = Object.values(row)
					return values.some(value => value === searchString)
				})

				setFoundRows(filteredRows)
				console.log(filteredRows)

			}

			fetchData()
			console.log(fetchData())
		}, [])

		useEffect(() => {
			// Check if foundRows has data
			if (foundRows.length > 0) {
				foundRow = foundRows[0]
				console.log(foundRows[0])
				console.log((Object.values(foundRow))[1])
				name = ((Object.values(foundRow))[1])
			}
		}, [foundRows])
		
		if (foundRows.length === 0) {
			return <p>Still loading...</p>
		} else {
			console.log(foundRows)
			foundRow = foundRows[0]
			console.log((Object.values(foundRow))[1])
			name = ((Object.values(foundRow))[1])
			email = ((Object.values(foundRow))[8])
			supervisor = ((Object.values(foundRow))[3])
			workdayId = ((Object.values(foundRow))[0])
			functionalArea = ((Object.values(foundRow))[4])
			manager = ((Object.values(foundRow))[3])
		}

		return <div>
			<div style={{float: 'left', width: '31%', marginRight: '4%', marginLeft: '4%'}}>
				<FullName>{'Full Name'}</FullName>
				<Rectangle2 style={{paddingLeft: '11px', paddingTop: '5px', fontSize: '14px'}}>{name.replace(/ \([\s\S]*?\)/g, '').replace(/ *\[[^\]]*]/, '')}</Rectangle2>
				<Email>{'Email'}</Email>
				<Rectangle8 style={{paddingLeft: '11px', paddingTop: '5px', fontSize: '14px'}}>{email}</Rectangle8>
				<Supervisor>{'Supervisor'}</Supervisor>
				<Rectangle11 style={{paddingLeft: '11px', paddingTop: '5px', fontSize: '14px'}}>{supervisor.replace(/ \([\s\S]*?\)/g, '')}</Rectangle11>
			</div>
			<div style={{float: 'left', width: '31%', marginRight: '4%', marginLeft: '1%'}}>
				<WorkdayId>{'Workday ID'}</WorkdayId>
				<Rectangle9 style={{paddingLeft: '11px', paddingTop: '5px', fontSize: '14px'}}>{workdayId}</Rectangle9>
				<FunctionalArea>{'Functional Area'}</FunctionalArea>
				<Rectangle10 style={{paddingLeft: '11px', paddingTop: '5px', fontSize: '14px'}}>{functionalArea}</Rectangle10>
				<Manager>{'Manager'}</Manager>
				<Rectangle12 style={{paddingLeft: '11px', paddingTop: '5px', fontSize: '14px'}}>{manager.replace(/ \([\s\S]*?\)/g, '')}</Rectangle12>
			</div>
		</div>
	}

	return <Sheet>
		<Title>{'My Profile'}</Title>
		<div style={{marginLeft: '6%', marginTop: '4%'}}>
			<Photo style={{float: 'left', width: '20%'}}>
				<img src={require('../../assets/images/ProfilePic.png')} alt=""/>
			</Photo>
			{renderedDetails()}
		</div>
		<div>
			<div>
				<NotificationSettings>{'Notification Settings'}</NotificationSettings>
				<DividerLineHorizonta1>
					<img src={require('../../assets/images/divider.png')} style={{width: '-webkit-fill-available'}} alt=""/>
				</DividerLineHorizonta1>
				<Frame6 style={{marginLeft: '5%', marginTop: '3%'}}>
					<CarbonNotificationFi>
						<ToggleButton />
					</CarbonNotificationFi>
					<img src={require('../../assets/images/notification-filled.png')} style={{marginLeft: '3%', marginRight: '0.5%'}} alt=""/>
					<EmailNotifications>{'Email notifications'}</EmailNotifications>
				</Frame6>
				<Frame8 style={{marginLeft: '5%', marginTop: '3%'}}>
					<CarbonNotificationFi2>
						<ToggleButton />	
					</CarbonNotificationFi2>
					<img src={require('../../assets/images/notification-filled.png')} style={{marginLeft: '3%', marginRight: '0.5%'}} alt=""/>
					<MuteAllNotifications>{'Mute all notifications'}</MuteAllNotifications>
				</Frame8>
			</div>
			<div>
				<PrivacySettings>{'Privacy Settings'}</PrivacySettings>
				<DividerLineHorizonta2>
					<img src={require('../../assets/images/divider.png')} style={{width: '-webkit-fill-available'}} alt=""/>
				</DividerLineHorizonta2>
				<Frame5 style={{marginLeft: '5%', marginTop: '3%'}}>
					<CarbonNotificationFi1>
						<ToggleButton />
					</CarbonNotificationFi1>
					<img src={require('../../assets/images/notification-filled.png')} style={{marginLeft: '3%', marginRight: '0.5%'}} alt=""/>
					<MediaVisibility>{'Media visibility'}</MediaVisibility>
				</Frame5>
			</div>
			<div>
				<AppSettings>{'App Settings'}</AppSettings>
				<DividerLineHorizonta>
					<img src={require('../../assets/images/divider.png')} style={{width: '-webkit-fill-available'}} alt=""/>
				</DividerLineHorizonta>
				<Frame10 style={{marginLeft: '5%', marginTop: '3%'}}>
					<CarbonNotificationFi3>
						<ToggleButton />
					</CarbonNotificationFi3>
					<img src={require('../../assets/images/notification-filled.png')} style={{marginLeft: '3%', marginRight: '0.5%'}} alt=""/>
					<ShowPromotions>{'Show Promotions'}</ShowPromotions>
				</Frame10>
				<Frame11 style={{marginLeft: '5%', marginTop: '3%'}}>
					<CarbonNotificationFi4>
						<ToggleButton />	
					</CarbonNotificationFi4>
					<img src={require('../../assets/images/notification-filled.png')} style={{marginLeft: '3%', marginRight: '0.5%'}} alt=""/>
					<ShowPastEvents>{'Show Past Events'}</ShowPastEvents>
				</Frame11>
				<Frame13 style={{marginLeft: '5%', marginTop: '3%'}}>
					<CarbonNotificationFi5>
						<ToggleButton />
					</CarbonNotificationFi5>
					<img src={require('../../assets/images/notification-filled.png')} style={{marginLeft: '3%', marginRight: '0.5%'}} alt=""/>
					<AutoHideNavigationMe>{'Auto-Hide Navigation Menu'}</AutoHideNavigationMe>
				</Frame13>
				<Toggle6 />
			</div>
		</div>
	</Sheet>
}

const ToggleButton = () => {
	const [isToggled, setIsToggled] = useState(false)
  
	const handleToggle = () => {
	  setIsToggled(!isToggled)
	}
  
	return (
		<label>
			<NewInput type="checkbox" defaultChecked={isToggled} onClick={handleToggle} />
			<NewSpan />
		</label>
	)
}
