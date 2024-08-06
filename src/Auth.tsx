import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppDispatch } from './redux/hooks'
import { loaderOn } from './redux/pageStatusSlice'
import { extractSessionDetails } from './helpers/session'

interface OIDCResponse {
  id_token: string
  access_token: string
  state: string
}

interface LocationState {
  from?: {
    pathname: string
  }
}

export default function Auth() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const hash = location.hash
  const [redirectPath, setRedirectPath] = useState<string>('/login')

  useEffect(() => {
    dispatch(loaderOn())

    if (hash && hash.startsWith('#id_token=')) {
      const token = hash.substring(1) // Remove the leading #
      const parsedResponse = queryString.parse(token)

      if (
        typeof parsedResponse.id_token === 'string' &&
        typeof parsedResponse.access_token === 'string'
      ) {
        const response: OIDCResponse = {
          id_token: parsedResponse.id_token,
          access_token: parsedResponse.access_token,
          state: (parsedResponse.state as string) || '',
        }

        // Extract session details from the response
        extractSessionDetails(response)

        // Set redirect path from state or default to REDIRECT_URL from environment
        const defaultRedirect = process.env.REACT_APP_REDIRECT_URL || '/overview'
        setRedirectPath((location.state as LocationState)?.from?.pathname || defaultRedirect)
      }
    }
  }, [hash, location.state, dispatch])

  return <Navigate to={redirectPath} replace />
}
