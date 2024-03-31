import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { TodoProvider } from './Contexts';
import { TodoForm } from './Components';
import { TodoItem } from './Components';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), todo, completed: false }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prevTodos) => prevTodos.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, todo } : prevTodo)));
  };
  
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };
  
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
// Empty dependency array to run only once on mount

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Dependency array containing 'todos' to run whenever 'todos' changes

  return (
    <TodoProvider value={{ todos, setTodos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4"><TodoForm /></div>
          <div className="flex flex-wrap gap-y-3">{/*Loop and Add TodoItem here */}
          {todos.map((todo) => (
            <div key={todo.id} className='w-full' >
              <TodoItem todo={todo} />
            </div>
          ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
