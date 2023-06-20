
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const EventAttendance = () => {
	const viewDetailsButton = {
		padding: '1px 2px',
		fontSize: '16px',
		background: 'none',
		border: 'none',
		color: 'green',
		float:'right',
		marginBottom:'10px'
	} as React.CSSProperties

	const legendCircle1 = {
		height : '32px',
		width : '32px',
		borderRadius: '50%',
		backgroundColor:'#4B286D',
	} as React.CSSProperties

	const legendCircle2 = {
		height : '32px',
		width : '32px',
		borderRadius: '50%',
		backgroundColor:'#F4F0FD',
	} as React.CSSProperties

	const legendCircle3 = {
		height : '32px',
		width : '32px',
		borderRadius: '50%',
		backgroundColor:'#E5DAFB',
	} as React.CSSProperties

	const dummyData = {
		labels:['Attendees', 'Didn\'t Attend', 'No Response'],
		datasets:[
			{
				data: [70, 20, 10],
				backgroundColor: ['#4B286D', '#F4F0FD', '#E5DAFB']
			}
		]
	}

    

	const options = {
		responsive: true,
		aspectRatio: 1,
		plugins: {
			legend: {
				display: false, // Set this to false to remove the legend
			},
		}
	}

	const total = dummyData.datasets[0].data[0] + dummyData.datasets[0].data[1] + dummyData.datasets[0].data[2]
	const attendees = dummyData.datasets[0].data[0] / total * 100
	const nonAttend = dummyData.datasets[0].data[1] / total * 100
	const nonResponse = dummyData.datasets[0].data[2] / total * 100

    
	return(
		<Container fluid style={{maxWidth:'656px', maxHeight: '402px', outline: '1px black solid', borderRadius: '20px'}} className='px-5 py-5'>
			<Row className=''>
				<Col xs={6} >
					<p style={{fontFamily:'Mulish', fontSize:'20px'}}>Overall Events Attendance</p>
					<div style={{height: '200px', width:'200px'}}>
						<Pie data={dummyData} options={options}></Pie>
					</div>
                    
				</Col>

				<Col>
					<Button style={viewDetailsButton}> 
                        View details <img  style={{height: '12px', width: '13px', marginLeft:'5px', marginBottom:'3px'}} src={require('../assets/images/Arrow.png')} alt="" />
					</Button>

					<Container fluid className='mt-5 px-1 py-2' >
						<Row className='pt-4' style={{alignItems:'center'}}>
							<div style={legendCircle1}></div>
							<p className='mb-0' style={{width:'max-content', fontSize:'16px', display:'inline-block'}}>Attendees <span style={{color:'lightgrey'}}>_____________</span>  {attendees}%</p>
						</Row>
						<Row className='mt-3' style={{alignItems:'center'}}>
							<div style={legendCircle2}></div>
							<p className='mb-0' style={{width:'max-content', fontSize:'16px', display:'inline-block'}}>Did not Attend <span style={{color:'lightgrey'}}>___________</span>{nonAttend}% </p>
						</Row>
						<Row className='mt-3' style={{alignItems:'center'}}>
							<div style={legendCircle3}></div>
							<p className='mb-0' style={{width:'max-content', fontSize:'16px', display:'inline-block'}}>No Response <span style={{color:'lightgrey'}}>___________</span>{nonResponse}% </p>
						</Row>

						<Row className='mt-5' style={{alignItems:'center', paddingLeft:'10%'}}>
							<img  style={{height: '25px', width: '50px'}} src={require('../assets/images/Date.png')}/>
							<p className='text-center mb-0 p-0' style={{fontSize:'14px',width:'max-content', display:'inline-block'}}>Date Period June - July 2023</p>
						</Row>
					</Container>
                    
                    
				</Col>
			</Row>
          
		</Container>
	)
}