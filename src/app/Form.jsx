'use client';
import React from 'react';
import { useState, useEffect } from 'react';

function Form() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState([]); // array of booleans for each todo

  // load todos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTodos(parsed);
        setChecked(Array(parsed.length).fill(false));
      } catch {
        setTodos([]);
        setChecked([]);
      }
    }
  }, []);

  // keep localStorage in sync with todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    // keep checked array in sync with todos length
    setChecked((prev) => {
      if (todos.length > prev.length) {
        // add false for new todos
        return [
          ...prev,
          ...Array(todos.length - prev.length).fill(false),
        ];
      } else if (todos.length < prev.length) {
        // remove checked for deleted todos
        return prev.slice(0, todos.length);
      }
      return prev;
    });
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (value) {
      setTodos((prev) => [...prev, value]);
      setInput('');
    }
  };

  const handleDelete = (index) => {
    // remove todo at index
    setTodos((prev) => prev.filter((_, i) => i !== index));
    setChecked((prev) => prev.filter((_, i) => i !== index));
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
              checked={checked[index] || false}
              onChange={() =>
                setChecked((prev) => {
                  const arr = [...prev];
                  arr[index] = !arr[index];
                  return arr;
                })
              }
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
