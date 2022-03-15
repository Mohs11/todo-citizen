import { configureStore } from '@reduxjs/toolkit'
import toDosReducer from '../features/toDoSlice'
import popUpReducer from '../features/popUpSlice'

export const store = configureStore({ reducer: {
    toDos: toDosReducer,
    popUps: popUpReducer    
} })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch