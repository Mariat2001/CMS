import React, { useState,useEffect } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue(''); // Clear the input field by setting its value to an empty string
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="TodoForm">
        <input
          type="text"
          value={value} // Bind the input value to the state value
          onChange={(e) => setValue(e.target.value)}
          placeholder="What is the task today?"
        />
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
