import React from 'react'
import { useTasks } from '../context/TaskContext'

export const TaskCard = ({task}) => {
    const { deleteTask, updateTask } = useTasks();

    const handleDone = () => {
        updateTask(task.id, {done: !task.done})
    }

    const handleDelete = () => {
        deleteTask(task.id)
    }

  return (
    <div className='card card-body mb-2'>
        <h5 className='card-title'>{task.name}</h5>
        <p>{task.done ? 'Done✔️' : 'Not done❌'}</p>
        <div className='ms-auto'>
          <button className='btn btn-secondary btn-sm me-1' onClick={handleDone}>Done</button>
          <button className='btn btn-danger btn-sm' onClick={handleDelete}>Delete</button>
        </div>
        
    </div>
  )
}
