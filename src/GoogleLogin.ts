import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_ROOT = process.env.REACT_APP_API_URL
const DEFAULT_REDIRECT_LINK = process.env.REACT_APP_REDIRECT_URL || '/overview'

export default function GoogleLogin() {
  useEffect(() => {
    async function fetchAuthUrl() {
      try {
        const response = await axios.get(`${API_ROOT}/google/auth`)
        window.location.href = response.data
      } catch (error) {
        console.error('Error fetching Google auth URL:', error)
      }
    }

    fetchAuthUrl()
  }, [])

  return null
}

export function Redirect() {
  const navigate = useNavigate()

  useEffect(() => {
    async function handleLogin() {
      try {
        await login()
        const redirectPath = getRedirectUrl() || DEFAULT_REDIRECT_LINK
        navigate(redirectPath, { replace: true })
      } catch (error) {
        console.error('Error during login and redirect:', error)
      }
    }

    handleLogin()
  }, [navigate])

  return null
}

async function login() {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  const scope = params.get('scope')
  const authUser = params.get('authUser')
  const hd = params.get('hd')
  const prompt = params.get('prompt')

  try {
    const tokenResponse = await axios.get(`${API_ROOT}/google/redirect`, {
      params: { code, scope, authUser, hd, prompt },
    })

    const userInfoResponse = await axios.post(`${API_ROOT}/google/getUserInfo`, tokenResponse.data)
    setLoginDetails(userInfoResponse.data)
  } catch (error) {
    console.error('Error during authentication:', error)
    throw error // Rethrow to be caught in useEffect
  }
}

function setLoginDetails(userInfo: any) {
  const loginDate = new Date().toISOString()
  localStorage.setItem('sessDate', loginDate)
  localStorage.setItem('email', userInfo.email)
  localStorage.setItem('familyName', userInfo.family_name)
  localStorage.setItem('givenName', userInfo.given_name)
  localStorage.setItem('picture', userInfo.picture)
}

function getRedirectUrl() {
  const redirectUrl = sessionStorage.getItem('redirectPath')
  return redirectUrl
}
