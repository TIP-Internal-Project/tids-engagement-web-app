import { Task, Row3, Heading1, Date3, Divider, Border, Priority, Rectangle20, 
	Low, ShsAppImageryUpdates, Rectangle17, Row1, Heading2, Priority1, Rectangle201, Medium, MyCareRefreshLaunchA, Date1, DateText1, Divider1,
	Border1, Rectangle171, Row2, Heading3, Priority2, Rectangle202, High, HealthQuebecClinicsP, Date2, DateText2, Divider2, Border2,
	Rectangle172, EventsHeading, Task1, DateText3, DateIcon, ViewAll, ViewAll1, Arrow } from './style.js'

const TaskPanel = () => {
	return <Task>
		<Row1>
			<Heading1>
				<Priority>
					<Rectangle20></Rectangle20>
					<Low>{'Optional'}</Low>
				</Priority>
				<ShsAppImageryUpdates>
					{'[SHS] App Imagery Updates '}
				</ShsAppImageryUpdates>
			</Heading1>
			<Date1>
				<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
				<DateText1>{'Aug 18, 2022'}</DateText1>
			</Date1>
			<Divider>
				<Border>
					<Rectangle17></Rectangle17>
				</Border>
			</Divider>
		</Row1>
		<Row2>
			<Heading2>
				<Priority1>
					<Rectangle201></Rectangle201>
					<Medium>{'Optional'}</Medium>
				</Priority1>
				<MyCareRefreshLaunchA>
					{'MyCare refresh launch at 9AM PST'}
				</MyCareRefreshLaunchA>
			</Heading2>
			<Date2>
				<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
				<DateText2>{'Aug 22, 2022'}</DateText2>
			</Date2>
			<Divider1>
				<Border1>
					<Rectangle171></Rectangle171>
				</Border1>
			</Divider1>
		</Row2>
		<Row3>
			<Heading3>
				<Priority2>
					<Rectangle202></Rectangle202>
					<High>{'Required'}</High>
				</Priority2>
				<HealthQuebecClinicsP>
					{'[Health] Quebec Clinics Pages'}
				</HealthQuebecClinicsP>
			</Heading3>
			<Date3>
				<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
				<DateText3>{'Sept 21, 2022'}</DateText3>
			</Date3>
			<Divider2>
				<Border2>
					<Rectangle172></Rectangle172>
				</Border2>
			</Divider2>
		</Row3>
		<EventsHeading>
			<Task1>{'Task'}</Task1>
			<ViewAll style={{ right: '9%' }}><ViewAll1>{'View all'}</ViewAll1><Arrow><img src={require('../../assets/images/Arrow.png')} alt="" /></Arrow></ViewAll>
		</EventsHeading>
	</Task>
}

export default TaskPanel