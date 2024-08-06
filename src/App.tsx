import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Container from './Container'
import Events from './pages/Events/index'
import Overview from './pages/Overview'
import ProfileSettingsPage from './pages/ProfileSettings'
import Tasks from './pages/Tasks'
import { EventAttendance } from './components/EventAttendance'
import GoogleLogin, { Redirect } from './GoogleLogin'

import PageLayout from './pages/Pages'
import FeatureUnavailablePanel from './components/FeatureUnavailable/FeatureUnavailablePanel'
import EventRegistrationView from './components/EventPanel/EventRegistrationView'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './redux/store'
import { fetchTeamMemberInfo } from './redux/teamRoster/teamRosterMemberInfo'

function App() {
  const dispatch = useAppDispatch()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  useEffect(() => {
    const email = window.localStorage.getItem('email')
    if (email) {
      dispatch(fetchTeamMemberInfo(email))
    }

    const today = new Date().toLocaleDateString()
    const sessDate = window.localStorage.getItem('sessDate') || today
    const formatedSessDate = new Date(sessDate).toLocaleDateString()

    if (email && today === formatedSessDate) {
      setIsUserAuthenticated(true)
    } else {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isUserAuthenticated ? <Container /> : <Navigate to={'/login'} />}>
          <Route path='/' element={<Overview />} />
          <Route path='overview' element={<Overview />} />
          <Route path='events' element={<Events variable={localStorage.getItem('email')} />} />
          <Route
            path='/events/:modalUrl'
            element={<EventRegistrationView email={localStorage.getItem('email')} />}
          />
          <Route
            path='reports'
            element={<PageLayout pageTitle='' ContentComponent={<FeatureUnavailablePanel />} />}
          />
          <Route
            path='expense'
            element={<PageLayout pageTitle='' ContentComponent={<FeatureUnavailablePanel />} />}
          />
          <Route
            path='profile'
            element={<ProfileSettingsPage variable={localStorage.getItem('email')} />}
          />
          <Route
            path='Reports'
            element={<PageLayout pageTitle='' ContentComponent={<FeatureUnavailablePanel />} />}
          />
          <Route path='tasks' element={<Tasks email={localStorage.getItem('email') || ''} />} />
          <Route path='atten' element={<EventAttendance />} />
          <Route
            path='OrderProcessing'
            element={<PageLayout pageTitle='' ContentComponent={<FeatureUnavailablePanel />} />}
          />
        </Route>
        <Route path='/login' element={<GoogleLogin />} />
        <Route path='/redirect' element={<Redirect />} />
        <Route
          path='*'
          element={<PageLayout pageTitle='' ContentComponent={<FeatureUnavailablePanel />} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
