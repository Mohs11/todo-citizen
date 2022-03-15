import ToDo from '../../../ToDo'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteToDo, toggleIsDone } from '../../../features/toDoSlice'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import './ToDoCard.scss'
import { motion } from 'framer-motion'

export default function ToDoCard({
  toDo,  
  editToDo,
  taskComplete,
}: {
  toDo: ToDo  
  editToDo: any
  taskComplete: any
}) {
  const dispatch = useDispatch()

  const updateIsDoneStatus = (toDo: ToDo) => {
    taskComplete(toDo.id, toDo.isDone)
    dispatch(toggleIsDone(toDo))
  }

  const removeToDo = (toDo: ToDo) => {
    if (window.confirm(`Are you sure you want delete "${toDo.name}"?`)) {
      dispatch(deleteToDo(toDo))
    }
  }

  const isToday = (date: any) => {
    const today = new Date()
    return new Date(date).setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
  }

  const isPast = (date: any) => {
    const today = new Date()
    return new Date(date).setHours(0,0,0,0) < today.setHours(0,0,0,0)
  }

  const handleEditToDo = (toDo: ToDo) => {    
    editToDo(toDo)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className={'card ' + (toDo.isDone ? 'done' : '')}>
        <div className={'header ' + (isToday(toDo.dueDate) ? 'today' : '') + (isPast(toDo.dueDate) ? 'past' : '')}>
          <h4>{toDo.name}</h4>
          <div className='controls'>
            <button
              className='btn edit icon'
              onClick={() => handleEditToDo(toDo)}>
              <FaPencilAlt />
            </button>
            <button
              className='btn delete icon'
              onClick={() => removeToDo(toDo)}>
              <FaTrashAlt />
            </button>
            <div className='round'>
              <input
                onChange={() => updateIsDoneStatus(toDo)}
                checked={toDo.isDone}
                id={toDo.id}
                type='checkbox'
              />
              <label htmlFor={toDo.id}></label>
            </div>
          </div>
        </div>
        {!toDo.isDone && (
          <div className='body'>
            <p>
              <Moment format='dddd DD/MM/yyyy'>{toDo.dueDate}</Moment>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
