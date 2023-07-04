import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Container from './Container'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { getUserSession } from './redux/userSessionSlice'
import Auth from './Auth'
import Login from './Login'
import Events from './pages/Events/index'
import OrderProcessing from './pages/OrderProcessing/index'
import Overview from './pages/Overview'
import ProfileSettingsPage from './pages/ProfileSettings'
import Tasks from './pages/Tasks'
import { fetchEvents } from './redux/eventSlice'
import { useCallback, useEffect } from 'react'
import { EventAttendance } from './components/EventAttendance'

function App() {
  const dispatch = useAppDispatch()

  const initApp = useCallback(async () => {
    await dispatch(fetchEvents())
  }, [dispatch])

  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

  // useEffect(() => {
  // 	dispatch(getUserSession())
  // }, [])

  const isUserAuthenticated = sessionStorage.getItem('email') ? true : false

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isUserAuthenticated ? <Container /> : <Navigate to={'/login'} />}>
          <Route path='/' element={<Overview />} />
          <Route path='overview' element={<Overview />} />
          <Route path='events' element={<Events variable={sessionStorage.getItem('email')} />} />
          <Route
            path='profile'
            element={<ProfileSettingsPage variable={sessionStorage.getItem('email')} />}
          />
          <Route path='tasks' element={<Tasks />} />
          <Route path='atten' element={<EventAttendance />} />
          <Route
            path='OrderProcessing'
            element={isAdmin ? <OrderProcessing /> : <Navigate to={'/overview'} />}
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/auth' element={<Auth />} />
        <Route
          path='*'
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
