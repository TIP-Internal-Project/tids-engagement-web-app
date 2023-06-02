import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
	
	return (
		
		
		<div className='sidebar'> 
			<div className='sidebarContent'>
				<img src= {require('../assets/images/TI Logo.png')} />
				
				<p style={{fontSize:'14px'}}>Dashboard</p>
					
				<ul>
					
					<li><img src ={require('../assets/images/home logo.png')} style={{height:'17px',width:'20px'}}/><a href="url"><Link to='/overview'>Overview</Link></a></li>						
					<li><img src ={require('../assets/images/events.png')} style={{height:'20px',width:'18px'}}/> <a href="url"><Link to='/events'>Events</Link></a></li>
					<li><img src ={require('../assets/images/tasks.png')} style={{height:'20px',width:'18px'}}/> <a href="url"><Link to='/tasks'>Tasks</Link></a></li>
				</ul> 

				<p style={{fontSize:'14px'}}>External Links</p>

				<ul>
					<li><img src ={require('../assets/images/tids shoppee.png')} style={{height:'21px',width:'18px'}}/> <a href="https://sites.google.com/telusinternational.com/ti-ds-shoppe/home">TIDS Shoppe</a></li>
					<li><img src ={require('../assets/images/intranet.png')} style={{height:'22px',width:'22px'}}/>  <a href="https://sites.google.com/telusinternational.com/tids-ph/home">Intranet</a> </li>
					<li><img src ={require('../assets/images/skills matrix.png')} style={{height:'20px',width:'20px'}}/> <a href="url">Skills Matrix</a> </li>
					
				</ul> 

				<ul className='HNS'>
					<li><img src ={require('../assets/images/bulbIcon.png')} style={{height:'19px', width:'12px'}}/> <a href="url">Help and Support</a> </li>
				</ul>

			</div>
		</div>
	)
}
