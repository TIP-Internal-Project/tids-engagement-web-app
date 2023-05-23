import { Dashboard, Content, Sidebar } from './style.js'
import OverviewHeader from '../../components/overviewComponents/header'
import EventsPanel from '../../components/overviewComponents/events'

const DashboardPage = () => {
	return <Dashboard>
		<Sidebar></Sidebar>
		<Content>
			<OverviewHeader />
			<EventsPanel />
		</Content>
	</Dashboard>
}

export default DashboardPage