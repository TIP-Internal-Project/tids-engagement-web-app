import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'

const Base = styled.div`
	width: 100%
`

export default function Container() {
	return (
		<Base>
			<div className='App'>
				<header className='App-header'>
					<p>
					Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
					</a>
					<Link className='App-link' to="/dashboard/events">Events</Link>
					<Link className='App-link' to="/dashboard/overview">Overview</Link>
				</header>
			</div>
			<Outlet />
		</Base>
	)
}