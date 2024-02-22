import Nav from 'react-bootstrap/Nav'
import ListGroup from 'react-bootstrap/ListGroup'
import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import { Pie } from 'react-chartjs-2'
import { ReportsTable } from './ReportsTable'

import { Chart, Plugin } from 'chart.js'
import AttendanceReportChart from './AttendanceReportChart'

export const ReportPanel = (props: any) => {
  const dispatch = useAppDispatch()

  const [reportType, setReportType] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  
  const toggleVisibility = (value: boolean) => {
    setIsVisible(value)
  }


  const handleReportTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(event.target.value)
  }



  const renderReportPage = () => {
    if (reportType === 'Attendance Report') {
     

      return (
        <div>
        </div>
      )
    } else if (reportType === 'Comparative Report') {
      return null
    } else if (reportType === 'Expense Report') {
      return null
      
    }
  }


//   const dummyData = {
//         labels:['Attendees', 'Didn\'t Attend', 'No Response'],
//         datasets:[
//             {
//                 data: [80, 20, 10],
//                 backgroundColor: ['#4B286D', '#F4F0FD', '#E5DAFB']
//             }
//         ]
//   }

//   const dummyData2 = {
//     labels:['TIDS', 'Team Mau', 'Team Lodi', 'Team Oj'],
//     datasets:[
//         {
//             data: [70, 10, 10, 10],
//             backgroundColor: ['#5E3FBE', '#F27300', '#9F55B1', '#5484B2']
//         }
//     ]
// }

// const renderDataLabels: Plugin<'pie'> = {
//   id: 'renderDataLabels',
//   afterDraw: (chart : any) => {
//     const { ctx, chartArea } = chart
//     const datasets = chart.data.datasets

//     ctx.save()

//     datasets.forEach((dataset: any) => {
//       const meta = chart.getDatasetMeta(0)
//       const total = meta.total

//       meta.data.forEach((element: any, index: number) => {
//         const data = dataset.data[index] + '%'

//         ctx.fillStyle = '#000000'
//         ctx.font = '14px Arial'
//         ctx.textAlign = 'center'
//         ctx.textBaseline = 'middle'

//         const position = element.tooltipPosition()
//         const x = position.x + (chartArea.left - position.x) * 0.0001
//         const y = position.y + (chartArea.top - position.y) * 0.0001

//         ctx.fillText(data, x, y)
//       })
//     })

//     ctx.restore()
//   },
// }

// const options = {
//   responsive: true,
//   aspectRatio: 1,
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
// }

  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [filterOption, setFilterOption] = useState<string[]>(['ALL'])
  const dropdownSortRef = useRef<HTMLDivElement>(null)
  const dropdownFilterRef = useRef<HTMLDivElement>(null)
  const [sortedEvents1, setSortedEvents1] = useState<Event[]>([])

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownSortRef.current && !dropdownSortRef.current.contains(event.target as Node)) {
      setShowSortDropdown(false)
    }
    if (dropdownFilterRef.current && !dropdownFilterRef.current.contains(event.target as Node)) {
      setShowFilterDropdown(false)
    }
  }

  const handleSortButtonClick = () => {
    setShowSortDropdown((prevShowSortDropdown) => !prevShowSortDropdown)
  }

  const handleFilterButtonClick = () => {
    setShowFilterDropdown((prevShowFilterDropdown) => !prevShowFilterDropdown)
  }

  const handleFilterOption = (option: string[]) => {
    setFilterOption(option)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <Container
      fluid
      style={{ backgroundColor: '#f5f5f5', height: '100vh', width: '100%', padding: '32px' }}
      className='mx-auto'
    >
      <Container
        fluid
        style={{ backgroundColor: 'white', height: '100%', width: '100%', borderRadius: '20px' }}
        className='px-0 py-4'
      >
        <div className="d-flex justify-content-between" style={{ color: '#7175B', padding: '0 2%' }}>
          <div style={{ width: '500px' }}>
              
              <div className="mt-3 px-5">
								<label htmlFor="eventDropdown" style={{ marginRight: '10px' }}>
								Select a Report:
								</label>
								<select
  id="eventDropdown"
  value={reportType}
  onChange={(event) => {
    handleReportTypeChange(event)
    toggleVisibility(event.target.value === 'Attendance Report' || event.target.value === '')
  }}
>
								<option value={''}>Select a Report</option>
                <option value="Attendance Report">Attendance Report</option>
                <option value="Comparative Report">Comparative Report</option>
                <option value="Expense Report">Expense Report</option>

								{/* Map through eventsday to populate dropdown options */}
								
								
								</select>
                {renderReportPage()}
							</div>
          </div>
          <div className='d-flex flex-row-reverse px-5'>
          <Nav.Link className='mx-3 ' style={{ fontSize: '14px' }} onClick={handleFilterButtonClick}>
              <img
                style={{ height: '15px', width: '14px', marginRight: '10px' }}
                src={require('../assets/images/filter.png')}
              />
              Filter
            </Nav.Link>
            
            {showFilterDropdown && (
              <div ref={dropdownFilterRef} className='floating-div2'>
                <Form style={{ fontSize: '14px' }}>
                  {['ALL', 'happyhere', 'COP', 'teamEvent', 'TIDS'].map((value) => {
                    let label = value
                    if (value === 'happyhere') {
                      label = '#HAPPYHERE'
                    } else if (value === 'teamEvent') {
                      label = 'TEAM EVENT'
                    }
                    return <div key={`default-${value}`}>
                      <Form.Check
                        id={`default-${value}`}
                        label={label}
                        onChange={() => {
                          const newFilterOption = [...filterOption]
                          if (newFilterOption.includes(value)) {
                            newFilterOption.splice(newFilterOption.indexOf(value), 1)
                          } else {
                            if (value === 'ALL') {
                              newFilterOption.length = 0
                            } else if (filterOption.includes('ALL')) {
                              newFilterOption.splice(newFilterOption.indexOf('ALL'), 1)
                            }
                            newFilterOption.push(value)
                          }
                          setFilterOption(newFilterOption)
                          handleFilterOption(newFilterOption)
                        }}
                        checked={filterOption.includes(value)}
                      />
                    </div>
                  })}
                </Form>
              </div>
            )}

            <Nav.Link className='mx-3 ' style={{ fontSize: '14px' }} onClick={handleSortButtonClick}>
              <img
                style={{ height: '15px', width: '15px', marginRight: '10px' }}
                src={require('../assets/images/sort-up.png')}
              />
              Sort
            </Nav.Link>
            {showSortDropdown && (
              <div ref={dropdownSortRef} className='floating-div'>
                <p className='textStyle'>
                  <a>Sort by Date Ascending</a>
                </p>
                <p
                  className='textStyle'
                  style={{ marginBottom: '0' }}
                >
                  <a>Sort by Date Descending</a>
                </p>
              </div>
            )}
          </div>
        </div>
        {/* <Row>
            <Col xs={4} >
                <div className='AttendeesCol'>
                    <div className="invites-container">
                        <p style={{fontFamily:'Mulish', fontSize:'50px'}}>200</p>
                    </div>
                    <div className="invitessent-container">
                        <p style={{fontFamily:'Mulish', fontSize:'18px'}}>Invites Sent</p>
                    </div>
                    <div className="attendees-container">
                        <p style={{fontFamily:'Mulish', fontSize:'50px'}}>140</p>
                    </div>
                    <div className="overallattendees-container">
                        <p style={{fontFamily:'Mulish', fontSize:'18px'}}>Overall Attendees</p>
                    </div>
                </div>
            </Col>

            <Col xs={4} >
                <div className='EventsAttendanceCol'>
                    <Container fluid style={{maxWidth:'656px', maxHeight: '412px', borderRadius: '20px'}} className='px-5 py-5'>
                            <Col xs={6} >
                                
                            <div style={{ height: '200px', width: '200px' }}>
                              <Pie data={dummyData} options={options} plugins={[renderDataLabels]} />
                            </div>
                                <p style={{fontFamily:'Mulish', fontSize:'18px', paddingTop :'18px', paddingLeft : '20px', width : '180px' }}>Target Compliance</p>
                            </Col>
                    </Container>
                </div>
            </Col>

            <Col xs={4} >
                <div className='EventsAttendanceCol'>
                    <Container fluid style={{maxWidth:'656px', maxHeight: '412px', borderRadius: '100px'}} className='px-5 py-5'>
                            <Col xs={6} >
                                
                                <div style={{height: '200px', width:'200px'}}>
                                    <Pie data={dummyData2} options={options}></Pie>
                                </div>
                                <p style={{fontFamily:'Mulish', fontSize:'18px', paddingTop :'18px', paddingLeft : '52px', width : '180px' }}>Team Roster</p>
                            </Col>
                    </Container>
                </div>
            </Col>
        </Row> */}
         {/* <Row><AttendanceReportChart/></Row> */}
         <Row><div><center> <h2>{reportType === '' ? 'Attendance Report' : reportType}</h2></center></div>
</Row>
         <Row>{isVisible && <AttendanceReportChart />}
         </Row>
        <Row>
          <ReportsTable/>
        </Row>
        
      </Container>
    </Container>
  )
}
