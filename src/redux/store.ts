import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import pageStatusReducer from './pageStatusSlice'
import userSessionReducer from './userSessionSlice'
import eventsReducer from './eventSlice'
import overviewEventsReducer from './overviewEventsSlice'
import unregisteredEventsReducer from './unregisteredEventsSlice'
import registeredEventsReducer from './registeredEventsSlice'
import eventRegistrationReducer from './eventRegistrationSlice'
import orderReducer from './orderSlice'
import addOrderReducer from './addOrderSlice'
import updateOrderReducer from './updateOrderSlice'
import addEventReducer from './addEventSlice'
import getTasks from './taskSlice'
import addTaskReducer from './addTaskSlice'
import updateTaskReducer from './updateTaskSlice'
import deleteEventReducer from './deleteEventSlice'
import taskCompletionReducer from './taskCompletionSlice'
import completedTasksReducer from './completedTasksSlice'
import incompleteTasksReducer from './incompleteTasksSlice'
import teamMemberInfoReducer from './teamMemberInfoSlice'
import addStartPointsReducer from './addStarPointsSlice'
import eventsCountReducer from './upcomingEventsCountSlice'
import deleteTaskReducer from './deleteTaskSlice'
import overviewTasksReducer from './overviewTasksSlice'
import tasksCountReducer from './pendingTasksCountSlice'
import geolocationReducer from './geolocationSlice'
import checkDuplicatesReducer from './checkDuplicatesSlice'


export const store = configureStore({
  reducer: {
    pageStatus: pageStatusReducer,
    userSession: userSessionReducer,
    events: eventsReducer,
    overviewEvents: overviewEventsReducer,
 
    unregisteredEvents: unregisteredEventsReducer,
    registeredEvents: registeredEventsReducer,
    eventRegistration: eventRegistrationReducer,
    order: orderReducer,
    addOrder: addOrderReducer,
    updateOrder: updateOrderReducer,
    addEvent: addEventReducer,
    tasks: getTasks,
    addTask: addTaskReducer,
    updateTask: updateTaskReducer,
    deleteEvent: deleteEventReducer,
    taskCompletion: taskCompletionReducer,
    completedTasks: completedTasksReducer,
    incompleteTasks: incompleteTasksReducer,
    teamMemberInfo: teamMemberInfoReducer,
    addStarPoints: addStartPointsReducer,
    eventsCount: eventsCountReducer,
    deleteTask: deleteTaskReducer,
    overviewTasks: overviewTasksReducer,
    checkDuplicates: checkDuplicatesReducer,
    tasksCount: tasksCountReducer,
    geolocation: geolocationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
