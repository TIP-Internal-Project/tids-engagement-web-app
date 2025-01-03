import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchTasks } from '../../redux/overviewTasksSlice'
import { Link } from 'react-router-dom'
import {
  Task,
  Divider,
  Border,
  Priority,
  Rectangle20,
  Rectangle202,
  EventsHeading,
  EventsHeading1,
  Task1,
  DateIcon,
  ViewAll,
  ViewAll1,
  Arrow,
  Headings,
  Title,
  TaskContainer,
  TitleRow,
  RowDiv,
  Line,
  DateRow,
  DateAndTime,
  Date,
  DateTime,
} from './style.js'

const TaskPanel = () => {
  const overviewTasks = useAppSelector((state) => state.overviewTasks)
  const dispatch = useAppDispatch()
  const email = localStorage.getItem('email')
  useEffect(() => {
    dispatch(fetchTasks(email))
  }, [])

  const renderedTasks = Object.values(overviewTasks.tasks).map((task: any, index) => {
    const formattedDate = new (window.Date as any)(task.dueDate).toLocaleDateString(
      {},
      { timeZone: 'UTC', month: 'short', day: '2-digit', year: 'numeric' }
    )

    return (
      <RowDiv key={task.taskId}>
        <TaskContainer>
          <TitleRow>
            <Title>{task.title}</Title>
            {/* <Priority>{task.importance === 'Required' ? 'Required' : 'Optional'}</Priority> */}
            <Priority>
              <Rectangle202
                style={{
                  display: task.importance === 'Required' ? 'block' : 'none',
                }}
              >
                Required
              </Rectangle202>
              <Rectangle20
                style={{
                  display: task.importance === 'Optional' ? 'block' : 'none',
                }}
              >
                Optional
              </Rectangle20>
            </Priority>
          </TitleRow>
          <DateRow>
            <DateIcon>
              <img src={require('../../assets/images/Date.png')} alt='' />
            </DateIcon>
            <DateTime>{formattedDate}</DateTime>
          </DateRow>
        </TaskContainer>
        <Divider>
          <Border style={{ display: index === overviewTasks.tasks.length - 1 ? 'none' : 'block' }}>
            <Line></Line>
          </Border>
        </Divider>
      </RowDiv>
      // <Row2>
      // 	<Heading2>
      // 		<Priority1>
      // 			<Rectangle201></Rectangle201>
      // 			<Medium>{'Optional'}</Medium>
      // 		</Priority1>
      // 		<MyCareRefreshLaunchA>
      // 			{'MyCare refresh launch at 9AM PST'}
      // 		</MyCareRefreshLaunchA>
      // 	</Heading2>
      // 	<Date2>
      // 		<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
      // 		<DateText2>{'Aug 22, 2022'}</DateText2>
      // 	</Date2>
      // 	<Divider1>
      // 		<Border1>
      // 			<Rectangle171></Rectangle171>
      // 		</Border1>
      // 	</Divider1>
      // </Row2>
      // <Row3>
      // 	<Heading3>
      // 		<Priority2>
      // 			<Rectangle202></Rectangle202>
      // 			<High>{'Required'}</High>
      // 		</Priority2>
      // 		<HealthQuebecClinicsP>
      // 			{'[Health] Quebec Clinics Pages'}
      // 		</HealthQuebecClinicsP>
      // 	</Heading3>
      // 	<Date3>
      // 		<DateIcon><img src={require('../../assets/images/Date.png')} alt="" /></DateIcon>
      // 		<DateText3>{'Sept 21, 2022'}</DateText3>
      // 	</Date3>
      // 	<Divider2>
      // 		<Border2>
      // 			<Rectangle172></Rectangle172>
      // 		</Border2>
      // 	</Divider2>
      // </Row3>
    )
  })

  return (
    <Task>
      <EventsHeading1 style={{ width: '-webkit-fill-available' }}>
        <Task1>{'Tasks'}</Task1>
        <a href='url'>
          <Link to='/tasks'>
            <ViewAll>
              <ViewAll1>{'View all'}</ViewAll1>
              <Arrow>
                <img src={require('../../assets/images/Arrow.png')} alt='' />
              </Arrow>
            </ViewAll>
          </Link>
        </a>
      </EventsHeading1>
      {overviewTasks.loading && (
        <Headings>
          <Title>{'Loading...'}</Title>
        </Headings>
      )}
      {!overviewTasks.loading && overviewTasks.error ? (
        <Headings>
          <Title>{'Error: ' + overviewTasks.error}</Title>
        </Headings>
      ) : null}
      {renderedTasks.length > 0 ? (
        renderedTasks
      ) : (
        <Headings>
          <div
            style={{
              textAlign: 'center',
              color: 'rgb(159, 162, 180)',
              paddingTop: '3%',
              paddingBottom: '4%',
              fontSize: '14px',
            }}
          >
            No Tasks
          </div>
        </Headings>
      )}
    </Task>
  )
}

export default TaskPanel
