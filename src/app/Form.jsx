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
      <div className="max-w-[1300px] mx-auto w-full bg-amber-50 p-6 rounded shadow text-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            To-Do List
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
            className="flex-grow p-4 border border-gray-300 rounded"
            id="todo"
            placeholder="Write your next task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="p-4 bg-green-300 text-black rounded cursor-pointer hover:bg-green-400 transition"
          >
            💽 Add Task
          </button>
        </form>
        <div className="border-rounded rounded-3xl border border-gray-300 p-4 mt-4">
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
                  className="ml-2 px-2 py-1 bg-red-300 text-black rounded cursor-pointer hover:bg-red-400 transition"
                  onClick={() => handleDelete(index)}
                >
                  🗑️ Delete
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
