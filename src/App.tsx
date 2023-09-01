import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Container from './Container'
import Auth from './Auth'
import Login from './Login'
import Events from './pages/Events/index'
import OrderProcessing from './pages/OrderProcessing/index'
import Overview from './pages/Overview'
import ProfileSettingsPage from './pages/ProfileSettings'
import Tasks from './pages/Tasks'
import { EventAttendance } from './components/EventAttendance'

function App() {
  const isAdmin = sessionStorage.getItem('userRole') == 'Admin' ? true : false

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
          <Route path='tasks' element={<Tasks variable={sessionStorage.getItem('email')} />} />
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
