'use client';
import React from 'react';
import { useState, useEffect } from 'react';

function Form() {
  const [todos, setTodos] = useState([
    { text: 'Flying to Hanoi, Vietnam', checked: true },
    { text: 'Do some tasks in Old Quarter', checked: true },
    { text: 'Build a ToDo App', checked: false },
  ]);
  const [input, setInput] = useState('');
  const [counter, setCounter] = useState(0);

  // load todos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // simple migration for old data structure
        if (parsed.length > 0 && typeof parsed[0] === 'string') {
          setTodos(
            parsed.map((todoText) => ({
              text: todoText,
              checked: false,
            }))
          );
        } else if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch {
        setTodos([]);
      }
    }
  }, []);

  // keep localStorage in sync with todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    // update counter
    const doneCount = todos.filter((todo) => todo.checked).length;
    setCounter(doneCount);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (value) {
      setTodos((prev) => [...prev, { text: value, checked: false }]);
      setInput('');
    }
  };

  const handleDelete = (index) => {
    // remove todo at index
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheck = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="max-w-[1300px] mx-auto w-full bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow text-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            ToDo List
          </h1>
          <span className="text-sm text-gray-600">
            A ToDo App, created with React.js and Next.JS
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <label htmlFor="todo"></label>
          <input
            type="text"
            name="todo"
            className="flex-grow p-4 border border-gray-300 rounded-2xl"
            id="todo"
            placeholder="Write your next task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="p-4 bg-black text-white rounded cursor-pointer hover:bg-gray-700 transition"
          >
            +
          </button>
        </form>
        <div className="p-4 mt-4">
          ️{' '}
          <span className="text-sm text-gray-600 text-center flex flex-col">
            You have {counter} / {todos.length} tasks done
          </span>
          <ul className="mt-4">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2 rounded-xl border border-gray-300 p-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => handleCheck(index)}
                    className="h-5 w-5 mr-3"
                  />
                  <span
                    style={{
                      textDecoration: todo.checked
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  className="ml-2 px-2 py-2 bg-red-300 text-black rounded cursor-pointer hover:bg-red-400 transition"
                  onClick={() => handleDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Form;
