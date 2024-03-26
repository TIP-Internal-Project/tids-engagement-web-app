import React from 'react'
import { Col, Container } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, TooltipItem, ArcElement, Plugin } from 'chart.js'

ChartJS.register(ArcElement)



interface ActualAndEstimatedBudgetChartProps {
    actualBudget: number
    estimatedBudget: number
  }

  interface TooltipContext {
    label?: string;
    raw: number;
  }
  
  const percentagePlugin: Plugin<'pie'> = {
    id: 'percentagePlugin',
    afterDatasetsDraw: (chart, _, options) => {
      const ctx = chart.ctx
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i)
        meta.data.forEach((element, index) => {
          const { x, y, startAngle, endAngle, innerRadius, outerRadius } = element.getProps(['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius'], true)
          const percentage = dataset.data[index] as number
  
          
          const middleAngle = (startAngle + endAngle) / 2
  
         
          const textOffset = outerRadius * 0.5
  
          const textX = x + (textOffset * Math.cos(middleAngle))
          const textY = y + (textOffset * Math.sin(middleAngle))
  
          ctx.fillStyle = 'black'
          ctx.font = 'bold 10px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(percentage.toFixed(2) + '%', textX, textY)
        })
      })
    },
  }

  const ActualAndEstimatedBudgetChart: React.FC<ActualAndEstimatedBudgetChartProps> = ({ actualBudget, estimatedBudget }) => {
    
    const actualBudgetPercentage = (actualBudget / estimatedBudget) * 100
    const unspentBudgetPercentage = 100 - actualBudgetPercentage

    const data = {
        labels: ['Actual Expense', 'Unspent Expense'],
        datasets: [
          {
            data: [actualBudgetPercentage, unspentBudgetPercentage],
            backgroundColor: ['#4B286D', '#F4F0FD'],
          },
        ],
    }

  

const renderDataLabels = {
    id: 'renderDataLabels',
    afterDraw: (chart: any) => {
      const ctx = chart.ctx
      ctx.save()
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 4
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2

      data.datasets.forEach((dataset, index) => {
        const meta = chart.getDatasetMeta(index)
        dataset.data.forEach((value, index) => {
         
          const percentage = value.toFixed(2) + '%'
          const model = meta.data[index]
          const angle = model.circumference
          const radius = model.outerRadius
          

          const adjustmentFactor = angle < 1 ? radius * 0.1 : 0
          ctx.fillStyle = 'black'
          ctx.fillText(value.toFixed(2) + '%', model.x, model.y)
        })
      })

      ctx.restore()
    },
  }

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'pie'>) {
            const actualValue = context.raw as number
            const label = context.label || ''
        
            const value = label === 'Actual Expense' ? actualBudget : estimatedBudget - actualBudget
            return `${label}: P${value.toFixed(2)}`
          },
        },
      },
    },
  }

  return (
    <Col>
              <div className='EventsAttendanceCol'>
                  <Container fluid style={{ maxWidth: '656px', maxHeight: '412px', borderRadius: '20px' }} className='px-5 py-5'>
                      <Col xs={6}>

                          <div style={{ height: '200px', width: '200px' }}>
                          <Pie data={data} options={options} plugins={[percentagePlugin]} />
                          </div>
                          
                      </Col>
                  </Container>
              </div>
          </Col>
          
          
  )
}

export default ActualAndEstimatedBudgetChart
