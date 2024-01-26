import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Container from './Container'
import Events from './pages/Events/index'
import OrderProcessing from './pages/OrderProcessing/index'
import Overview from './pages/Overview'
import ProfileSettingsPage from './pages/ProfileSettings'
import Tasks from './pages/Tasks'
import { EventAttendance } from './components/EventAttendance'
import { setUserRole } from './components/Roles/Roles'
import GoogleLogin, { Redirect } from './GoogleLogin'
import Reports from './pages/Reports/index'


function App() {
  setUserRole()
  const today = new Date().toLocaleDateString()
  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false
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
          <Route path='reports' element={<Reports variable={localStorage.getItem('email')} />} />
          <Route
            path='profile'
            element={<ProfileSettingsPage variable={localStorage.getItem('email')} />}
          />
          <Route path='tasks' element={<Tasks email={localStorage.getItem('email') || ''} />} />
          <Route path='atten' element={<EventAttendance />} />
          <Route path='OrderProcessing' element={<OrderProcessing />} />
        </Route>
        <Route path='/login' element={<GoogleLogin />} />
        <Route path='/redirect' element={<Redirect />} />
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
