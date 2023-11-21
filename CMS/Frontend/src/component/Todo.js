import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating-stars-component'

const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  return (
    <div className="Todo">
   
      <p className={`${task.completed ? 'completed' : ''}`} onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>
      <div className="rating-container">
        <Rating // Add the Rating component here
          count={5} // Number of stars
          value={task.rating} // Rating value from task object
          onChange={(newRating) => console.log(newRating)} // Handle rating change
          size={24} // Size of stars
          activeColor="#c0bdc5" // Color of active stars
        />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>

  )
}

export default Todo
