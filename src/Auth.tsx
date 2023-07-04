import { parse } from 'query-string'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { loaderOn } from './redux/pageStatusSlice'
import { extractSessionDetails } from './helpers/session'
import OIDCResponse from './interfaces/OIDCResponse'
import { getUserSession } from './redux/userSessionSlice'
import { setUserRole } from './components/Roles/Roles'
import Login from './Login'

export default function Auth() {
  const dispatch = useAppDispatch()
  dispatch(loaderOn())

  const location = useLocation()
  const hash = location.hash

  let redirectPath = '/login'
  if (hash && hash.indexOf('#id_token=') === 0) {
    const response = parse(hash) as object
    extractSessionDetails(response as OIDCResponse)
    storeUser()
    redirectPath = '/overview'
  }

  return <Navigate to={redirectPath} />
}

export function storeUser() {
  setUserRole()
  const userSession = useAppSelector(getUserSession)
  sessionStorage.setItem('email', userSession.email)
  sessionStorage.setItem('familyName', userSession.familyName)
  sessionStorage.setItem('givenName', userSession.givenName)
}

window.addEventListener('storage', () => {
  Login()
})
