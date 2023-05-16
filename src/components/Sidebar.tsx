import React from 'react'



export const Sidebar = () => {
	return (
		
		
		<div className='sidebar'> 
			<div className='sidebarContent'>
				<img src= {require('../assets/images/TI Logo.png')} />
				
				<p>Dashboard</p>
					
				<ul>
					<li><img src ={require('../assets/images/home logo.png')} />Overview</li>
					<li><img src ={require('../assets/images/events.png')} />Events</li>
					<li><img src ={require('../assets/images/tasks.png')} />Tasks</li>
				</ul> 

				<p>External Links</p>

				<ul>
					<li><img src ={require('../assets/images/tids shoppee.png')} />Tids Shoppee</li>
					<li><img src ={require('../assets/images/intranet.png')} /> Intranet</li>
					<li><img src ={require('../assets/images/skills matrix.png')} />Skills Matrix</li>
				</ul> 

			</div>
		</div>
	)
}
