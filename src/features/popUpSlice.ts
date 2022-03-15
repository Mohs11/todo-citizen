import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PopUpState {
  value: {
    toggleAddOrEditToDo: boolean
    editToDo: {}
    isAdd: boolean
    celebrated: boolean
    celebratedIds: Array<string>
    name: string
    dueDate: string
    dueDateWarning: boolean
  }
}

const initialState: PopUpState = {
  value: {
    toggleAddOrEditToDo: false,
    editToDo: {},
    isAdd: true,
    celebrated: false,
    celebratedIds: [],
    name: '',
    dueDate: '',
    dueDateWarning: false
  },
}

export const popUpSlice = createSlice({
  name: 'popUps',
  initialState,
  reducers: {
    setToggleAddOrEditToDo: (state, action: PayloadAction<boolean>) => {
      state.value.toggleAddOrEditToDo = action.payload
    },
    setEditToDo: (state, action: PayloadAction<object>) => {   
      state.value.editToDo = action.payload
    },
    setIsAdd: (state, action: PayloadAction<boolean>) => {
      state.value.isAdd = action.payload
    },
    setCelebrated: (state, action: PayloadAction<boolean>) => {
      state.value.celebrated = action.payload
    },
    setCelebratedIds: (state, action: PayloadAction<Array<string>>) => {
      state.value.celebratedIds = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload
    },
    setDueDate: (state, action: PayloadAction<string>) => {
      state.value.dueDate = action.payload
    },
    setDueDateWarning: (state, action: PayloadAction<boolean>) => {
      state.value.dueDateWarning = action.payload
    }
  },
})

export const {
  setToggleAddOrEditToDo,
  setEditToDo,
  setIsAdd,
  setCelebrated,
  setCelebratedIds,
  setName,
  setDueDate,
  setDueDateWarning
} = popUpSlice.actions

export default popUpSlice.reducer
