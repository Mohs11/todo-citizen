import { useSelector, useDispatch } from 'react-redux'
import { setToggleAddOrEditToDo, setEditToDo, setIsAdd, setCelebrated, setCelebratedIds } from './features/popUpSlice'
import { FaPlus } from 'react-icons/fa'
import { AnimatePresence } from 'framer-motion'
import './App.scss'
import AddOrEditToDo from './app/components/AddOrEditToDo/AddOrEditToDo'
import Celebrate from './app/components/Celebrate/Celebrate'
import ToDoCard from './app/components/ToDoCard/ToDoCard'
import { RootState } from './app/store'
import ToDo from './ToDo'

function App() {
  const toDos = useSelector((state: RootState) => state.toDos.value)
  const popUps = useSelector((state: RootState) => state.popUps.value)
  
  const dispatch = useDispatch()

  let sorted = [...toDos]
  sorted.sort((a: ToDo, b: ToDo) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const handleAddToDo = () => {
    dispatch(setIsAdd(true))
    dispatch(setEditToDo({}))
    dispatch(setToggleAddOrEditToDo(!popUps.toggleAddOrEditToDo))
  }

  const handleEditToDo = (toDo: ToDo) => {
    dispatch(setEditToDo(toDo))
    dispatch(setIsAdd(false))
    dispatch(setToggleAddOrEditToDo(!popUps.toggleAddOrEditToDo))
  }

  const handleTaskComplete = (id: string, isDone: boolean) => {
    if (!popUps.celebrated && !popUps.celebratedIds.includes(id)) {
      dispatch(setCelebratedIds([...popUps.celebratedIds, id]))
    } else if (!popUps.celebrated && isDone) {
      dispatch(setCelebratedIds(popUps.celebratedIds.filter((toDoId: string) => toDoId !== id)))
    }
  }
  const handleCelebrated = () => {
    dispatch(setCelebrated(true))
  }

  return !toDos.length ? (
    <>
      <div className='nav'>
        <h4>ToDos </h4>
        <button className='add btn' onClick={handleAddToDo}>
          <FaPlus />
        </button>
      </div>
      <div className='container'>
        {popUps.toggleAddOrEditToDo && (
          <div className='full-screen-model'>
            <AddOrEditToDo toDo={popUps.editToDo}/>
          </div>
        )}
        <p>There are no Todos!! :( Why not add one!</p>
      </div>
    </>
  ) : (
    <>
      {popUps.celebratedIds.length === 3 && !popUps.celebrated && (
        <Celebrate handleCelebrated={handleCelebrated} />
      )}
      {popUps.toggleAddOrEditToDo && (
        <div className='full-screen-model'>
          <AddOrEditToDo toDo={popUps.editToDo}/>
        </div>
      )}
      <div className='nav'>
        <h4>ToDos </h4>
        <button className='add btn' onClick={handleAddToDo}>
          <FaPlus />
        </button>
      </div>
      <div className='container'>
        <div className='toDo-list'>
          <AnimatePresence>
            {sorted.map((toDo) => {
              if (!toDo.isDone) {
                return (
                  <ToDoCard                    
                    taskComplete={handleTaskComplete}                                        
                    toDo={toDo}
                    editToDo={handleEditToDo}
                    key={toDo.id}
                  />
                )
              }
            })}
          </AnimatePresence>
        </div>
      </div>
      <div className='container'>
        <div className='toDo-list done-Todos'>
          {sorted.map((toDo, i) => {
            if (toDo.isDone) {
              return (
                <ToDoCard
                  taskComplete={handleTaskComplete}
                  key={toDo.id}                  
                  toDo={toDo}
                  editToDo={handleEditToDo}
                />
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default App
