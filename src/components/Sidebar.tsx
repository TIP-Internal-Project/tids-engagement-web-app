import React from 'react'
import { Link } from 'react-router-dom'


export const Sidebar = () => {
	return (
		
		
		<div className='sidebar'> 
			<div className='sidebarContent'>
				<img src= {require('../assets/images/TI Logo.png')} />
				
				<p>Dashboard</p>
					
				<ul>
					<li><img src ={require('../assets/images/home logo.png')} /><a href="url">Overview</a></li>
<<<<<<< HEAD
					<li><img src ={require('../assets/images/events.png')} /> <a href="url"><Link to='/events'>Events</Link></a></li>
=======
					<li><img src ={require('../assets/images/events.png')} /> <a href="url">Events</a></li>
>>>>>>> be48d94bac1747a24952cce765a3392391964b44
					<li><img src ={require('../assets/images/tasks.png')} /> <a href="url">Tasks</a></li>
				</ul> 

				<p>External Links</p>

				<ul>
					<li><img src ={require('../assets/images/tids shoppee.png')} /> <a href="https://sites.google.com/telusinternational.com/ti-ds-shoppe/home">Tids Shoppee</a></li>
					<li><img src ={require('../assets/images/intranet.png')} />  <a href="url">Intranet</a> </li>
					<li><img src ={require('../assets/images/skills matrix.png')} /> <a href="url">Skills Matrix</a> </li>
				</ul> 

			</div>
		</div>
	)
}