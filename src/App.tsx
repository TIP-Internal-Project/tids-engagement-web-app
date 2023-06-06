import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Container from './Container'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { getUserSession } from './redux/userSessionSlice'
import Auth from './Auth'
import Login from './Login'
import Events from './pages/Events/index'
import Overview from './pages/Overview'
import ProfileSettingsPage from './pages/ProfileSettings'
import { fetchEvents } from './redux/eventSlice'
import { useCallback, useEffect } from 'react'




function App() {
	const dispatch = useAppDispatch()

	const initApp = useCallback(async () => {
		await dispatch(fetchEvents())
	}, [dispatch])

	// useEffect(() => {
	// 	dispatch(getUserSession())
	// }, [])

	const userSession = useAppSelector(getUserSession)
	const isUserAuthenticated = userSession.email ? true : false
	const email = userSession.email

	console.log(userSession)
	console.log(userSession.email)

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={isUserAuthenticated ? <Container /> : <Navigate to={'/login'} />}>
					<Route path="overview" element={<Overview />} />
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/auth' element={<Auth />}  />
				<Route path="events" element={<Events />} />
				<Route path="profile" element={<ProfileSettingsPage variable={email}/>} />
				<Route
					path="*"
					element={
						<main style={{ padding: '10px' }}>
							<p>Requested page does not exist</p>
						</main>
					}
				/>

			</Routes>
		</BrowserRouter>
	)
}

export default App
