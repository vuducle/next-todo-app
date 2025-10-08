'use client';
import React from 'react';

import { useState, useEffect } from 'react';

function Form() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [marked, setMarked] = useState(false);

  // load todos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        setTodos([]);
      }
    }
  }, []);

  // keep localStorage in sync with todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (value) {
      // add new todo to the list
      setTodos((prev) => {
        const updated = [...prev, value];
        return updated;
      });
      setInput('');
    }
  };

  const handleDelete = (index) => {
    setTodos((prev) => {
      // if index is not equal to i, keep the item
      const updated = prev.filter((_, i) => i !== index);
      return updated;
    });
  };

  return (
    <div className="p-4 flex flex-col">
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo"></label>
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="p-4 bg-amber-200 text-black">
          +
        </button>
      </form>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between mb-2"
          >
            <span>{todo}</span>
            <input
              type="checkbox"
              checked={marked}
              onChange={() => setMarked((prev) => !prev)}
            />
            <button
              className="ml-2 px-2 py-1 bg-red-300 text-black rounded"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
