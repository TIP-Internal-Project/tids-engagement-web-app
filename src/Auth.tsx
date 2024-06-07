import { parse } from 'query-string'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { loaderOn } from './redux/pageStatusSlice'
import { extractSessionDetails } from './helpers/session'
import OIDCResponse from './interfaces/OIDCResponse'

export default function Auth() {
  const dispatch = useAppDispatch()
  dispatch(loaderOn())

  const location = useLocation()
  const hash = location.hash

  let redirectPath = '/login'
  if (hash && hash.indexOf('#id_token=') === 0) {
    const response = parse(hash) as object
    extractSessionDetails(response as OIDCResponse)
    redirectPath = '/overview'
  }

  return <Navigate to={redirectPath} />
}
