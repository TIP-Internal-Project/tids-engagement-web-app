import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Container from './Container'
import Events from './pages/Events/index'
import OrderProcessing from './pages/OrderProcessing/index'
import Overview from './pages/Overview'
import Reports from './pages/Reports'
import ProfileSettingsPage from './pages/ProfileSettings'
import Tasks from './pages/Tasks'
import { EventAttendance } from './components/EventAttendance'
import { setUserRole } from './components/Roles/Roles'
import GoogleLogin, { Redirect } from './GoogleLogin'
import { EventPanel } from './components/EventPanel/EventPanel'
import Expense from './pages/Expense'
import PageLayout from './pages/Pages'
import FeatureUnavailablePanel from './components/FeatureUnavailable/FeatureUnavailablePanel'
import EventRegistrationView from './components/EventPanel/EventRegistrationView'

function App() {
  setUserRole()
  const today = new Date().toLocaleDateString()
  const isUserAuthenticated = window.localStorage.getItem('email') ? true : false
  const isNotExp = window.localStorage.getItem('sessDate') == today ? true : false
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={isUserAuthenticated && isNotExp ? <Container /> : <Navigate to={'/login'} />}
        >
          <Route path='/' element={<Overview />} />
          <Route path='overview' element={<Overview />} />
          <Route path='events' element={<Events variable={localStorage.getItem('email')} />} />
          <Route path='/events/:modalUrl' element={<EventRegistrationView />} />
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
