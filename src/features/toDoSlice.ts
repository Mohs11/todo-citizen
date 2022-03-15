import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ToDo from '../ToDo'

interface ToDoState {
  value: Array<ToDo>
}

const initialState: ToDoState = {
  value: [
    {
      name: 'get milk',
      id: 'id-1',
      dueDate: 'Mon Mar 14 2022 00:00:00 GMT+0000 (Greenwich Mean Time)',
      dateDone: '',
      isDone: false,
    },
    {
      name: 'repair roof',
      id: 'id-2',
      dueDate: 'Mon Aug 01 2022 01:00:00 GMT+0100 (British Summer Time)',
      dateDone: '',
      isDone: false,
    },
    {
      name: 'fix fence',
      id: 'id-3',
      dueDate: 'Thu Dec 31 2022 01:00:00 GMT+0100 (British Summer Time)',
      dateDone: '',
      isDone: false,
    },
    {
      name: 'buy keyboard',
      id: 'id-4',
      dueDate: 'Tue May 17 2022 01:00:00 GMT+0100 (British Summer Time)',
      dateDone: '',
      isDone: false,
    },
  ],
}

export const toDoSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<ToDo>) => {
      state.value.push(action.payload)
    },
    deleteToDo: (state, action: PayloadAction<ToDo>) => {
      state.value = state.value.filter((toDo) => {
        if (toDo.id !== action.payload.id) {
          return toDo
        }
      })
    },
    toggleIsDone: (state, action: PayloadAction<ToDo>) => {
      state.value.filter((toDo) => {
        if (toDo.id === action.payload.id) {
          toDo.isDone = !toDo.isDone
          if (toDo.isDone) {
            toDo.dateDone = new Date().toString()
          } else {
            toDo.dateDone = ''
          }
        }
      })
    },
    updateToDo: (state, action: PayloadAction<ToDo>) => {
      state.value.filter((toDo) => {
        if (toDo.id === action.payload.id) {
          toDo.name = action.payload.name
          toDo.dueDate = action.payload.dueDate
        }
      })
    },
  },
})

export const { addToDo, deleteToDo, toggleIsDone, updateToDo } =
  toDoSlice.actions

export default toDoSlice.reducer
