import Nav from 'react-bootstrap/Nav'
import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch } from '../redux/store'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import { ReportsTable } from './ReportsTable'

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
      return <div></div>
    } else if (reportType === 'Comparative Report') {
      return null
    } else if (reportType === 'Expense Report') {
      return null
    }
  }

  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [filterOption, setFilterOption] = useState<string[]>(['ALL'])
  const dropdownSortRef = useRef<HTMLDivElement>(null)
  const dropdownFilterRef = useRef<HTMLDivElement>(null)

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
        <div className='d-flex justify-content-between' style={{ color: '#7175B', padding: '0 2%' }}>
          <div style={{ width: '500px' }}>
            <div className='mt-3 px-5'>
              <label htmlFor='eventDropdown' style={{ marginRight: '10px' }}>
                Select a Report:
              </label>
              <select
                id='eventDropdown'
                value={reportType}
                onChange={(event) => {
                  handleReportTypeChange(event)
                  toggleVisibility(
                    event.target.value === 'Attendance Report' || event.target.value === ''
                  )
                }}
              >
                <option value='Attendance Report'>Attendance Report</option>
                <option value='Comparative Report'>Comparative Report</option>
                <option value='Expense Report'>Expense Report</option>
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
                    return (
                      <div key={`default-${value}`}>
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
                    )
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
                <p className='textStyle' style={{ marginBottom: '0' }}>
                  <a>Sort by Date Descending</a>
                </p>
              </div>
            )}
          </div>
        </div>

        <Row>
          <div>
            <center>
              {' '}
              <h2>{reportType === '' ? 'Attendance Report' : reportType}</h2>
            </center>
          </div>
        </Row>
        <Row>{isVisible && <AttendanceReportChart />}</Row>
        <Row>
          <ReportsTable />
        </Row>
      </Container>
    </Container>
  )
}
