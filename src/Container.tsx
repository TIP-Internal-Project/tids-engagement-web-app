import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'

const Base = styled.div`
  width: 100%;
`

export default function Container() {
  return (
    <Base>
      <div className='App'>
        <header></header>
      </div>
      <Outlet />
    </Base>
  )
}
