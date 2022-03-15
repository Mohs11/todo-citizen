import { useEffect } from 'react'
import { RootState } from '../../store'
import {
  setName,
  setDueDate,
  setDueDateWarning,
  setToggleAddOrEditToDo,
} from '../../../features/popUpSlice'
import { addToDo, updateToDo } from '../../../features/toDoSlice'
import ToDo from '../../../ToDo'
import { useDispatch, useSelector } from 'react-redux'
import nextId from 'react-id-generator'
import moment from 'moment'

export default function AddorEditToDo({toDo}: { toDo: any }) {

  const popUps = useSelector((state: RootState) => state.popUps.value)
  const dispatch = useDispatch()

  const togglePopup = () => {
    dispatch(setToggleAddOrEditToDo(!popUps.toggleAddOrEditToDo))
  }

  function formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  useEffect(() => {
    if (toDo.name) {      
      dispatch(setName(toDo.name))
      const formattedDate = formatDate(toDo.dueDate)          
      dispatch(setDueDate(formattedDate))      
    } else {
      dispatch(setName(''))
      dispatch(setDueDate('yyyy-MM-dd'))
    }
  }, [toDo])

  const handleDueDate = (date: any) => {    
    const today = moment()
    const toDoDate = moment(date)
    if (toDoDate.isAfter(today) || toDoDate.isSame(new Date(), 'day')) {            
      return new Date(date).toString()
    } else {
      dispatch(setDueDateWarning(true))
      setTimeout(function () {
        dispatch(setDueDateWarning(false))
      }, 3000)
    }
  }

  const handleSubmit = () => {
    if (!popUps.name || !popUps.dueDate) return
    const newDate = handleDueDate(popUps.dueDate)
    if (newDate) {
      if (popUps.isAdd) {
        const id = nextId()
        const newTodo: ToDo = {
          name: popUps.name,
          dueDate: newDate,
          id: id,
          isDone: false,
          dateDone: '',
        }
        dispatch(addToDo(newTodo))
        togglePopup()
      } else {
        const newTodo: ToDo = {
          name: popUps.name,
          dueDate: newDate,
          id: toDo.id,
          isDone: toDo.isDone,
          dateDone: toDo.dateDone,
        }
        dispatch(updateToDo(newTodo))
        togglePopup()
      }
    }
  }
  return (
    <div className='full-screen flex-container-center'>
      <div className='card submit'>
        <div className='header'>
          <h3>{popUps.isAdd ? 'Add a new ToDo' : 'Update this ToDo'}</h3>
          <button className='btn' onClick={togglePopup}>
            X
          </button>
        </div>
        <div className='body'>
          <div className='form'>
            <div className='form-group'>
              <label htmlFor='name'>Give your ToDo a name</label>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={popUps.name}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='dateDue'>When is this ToDo due?</label>
              <input
                type='date'
                name='dueDate'
                placeholder='Due Date'
                value={popUps.dueDate}
                onChange={(e) => dispatch(setDueDate(e.target.value))}
              />
              {popUps.dueDateWarning && (
                <small className='warning'>
                  This date has to be today, or in the future!!
                </small>
              )}
            </div>
            <div className='submit-button'>
              <button className='btn' onClick={handleSubmit}>
                {popUps.isAdd ? 'Add ToDo' : 'Update ToDo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
