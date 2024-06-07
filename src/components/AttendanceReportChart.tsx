import React from 'react'
import { Col, Container } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'

const AttendanceReportChart = () => {


    const dummyData = {
        labels:['Attendees', 'Didn\'t Attend', 'No Response'],
        datasets:[
            {
                data: [80, 20, 10],
                backgroundColor: ['#4B286D', '#F4F0FD', '#E5DAFB']
            }
        ]
  }

  const dummyData2 = {
    labels:['TIDS', 'Team Mau', 'Team Lodi', 'Team Oj'],
    datasets:[
        {
            data: [70, 10, 10, 10],
            backgroundColor: ['#5E3FBE', '#F27300', '#9F55B1', '#5484B2']
        }
    ]
}

const renderDataLabels: any  = {
  id: 'renderDataLabels',
  afterDraw: (chart : any) => {
    const { ctx, chartArea } = chart
    const datasets = chart.data.datasets

    ctx.save()

    datasets.forEach((dataset: any) => {
      const meta = chart.getDatasetMeta(0)
      const total = meta.total

      meta.data.forEach((element: any, index: number) => {
        const data = dataset.data[index] + '%'

        ctx.fillStyle = '#000000'
        ctx.font = '14px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const position = element.tooltipPosition()
        const x = position.x + (chartArea.left - position.x) * 0.0001
        const y = position.y + (chartArea.top - position.y) * 0.0001

        ctx.fillText(data, x, y)
      })
    })

    ctx.restore()
  },
}

const options = {
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
  },
}

  return (
    <><Col xs={4}>
          <div className='AttendeesCol'>
              <div className="invites-container">
                  <p style={{ fontFamily: 'Mulish', fontSize: '50px' }}>200</p>
              </div>
              <div className="invitessent-container">
                  <p style={{ fontFamily: 'Mulish', fontSize: '18px' }}>Invites Sent</p>
              </div>
              <div className="attendees-container">
                  <p style={{ fontFamily: 'Mulish', fontSize: '50px' }}>140</p>
              </div>
              <div className="overallattendees-container">
                  <p style={{ fontFamily: 'Mulish', fontSize: '18px' }}>Overall Attendees</p>
              </div>
          </div>
      </Col><Col xs={4}>
              <div className='EventsAttendanceCol'>
                  <Container fluid style={{ maxWidth: '656px', maxHeight: '412px', borderRadius: '20px' }} className='px-5 py-5'>
                      <Col xs={6}>

                          <div style={{ height: '200px', width: '200px' }}>
                              <Pie data={dummyData} options={options} plugins={[renderDataLabels]} />
                          </div>
                          <p style={{ fontFamily: 'Mulish', fontSize: '18px', paddingTop: '18px', paddingLeft: '20px', width: '180px' }}>Target Compliance</p>
                      </Col>
                  </Container>
              </div>
          </Col><Col xs={4}>
              <div className='EventsAttendanceCol'>
                  <Container fluid style={{ maxWidth: '656px', maxHeight: '412px', borderRadius: '100px' }} className='px-5 py-5'>
                      <Col xs={6}>

                          <div style={{ height: '200px', width: '200px' }}>
                              <Pie data={dummyData2} options={options}></Pie>
                          </div>
                          <p style={{ fontFamily: 'Mulish', fontSize: '18px', paddingTop: '18px', paddingLeft: '52px', width: '180px' }}>Team Roster</p>
                      </Col>
                  </Container>
              </div>
          </Col></>
  )
}

export default AttendanceReportChart
