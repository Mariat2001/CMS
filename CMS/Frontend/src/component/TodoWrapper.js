import React, {useState,useEffect} from 'react'
import TodoForm  from './TodoForm'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';
import Productindex from './Products/Productindex'

const TodoWrapper = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);

  }
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const handleClick = () => {
    navigate('/');
  };
  return (
 
    <div className="TodoWrapper">
      
      <div className="logout-button">
        <button onClick={handleClick} className="btn btn-danger custom-button">
          Logout
        </button>
      </div>
   
    <h1>Get Things Done !</h1>
    <TodoForm addTodo={addTodo} />
    {/* display todos */}
    {todos.map((todo) =>
      todo.isEditing ? (
        <EditTodoForm editTodo={editTask} task={todo} />
      ) : (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
        />
      )
    )}
   

  </div>
  )
}

export default TodoWrapper

