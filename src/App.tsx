import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={
					<div className='App'>
						<header className='App-header'>
							<p>
							Edit <code>src/App.tsx</code> and save to reload.
							</p>
							<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
							Learn React
							</a>
						</header>
					</div>
				} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
