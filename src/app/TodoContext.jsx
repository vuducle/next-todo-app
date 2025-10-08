'use client';
import React from 'react';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([
    { text: 'Flying to Hanoi, Vietnam', checked: true },
    { text: 'Do some tasks in Old Quarter', checked: true },
    { text: 'Build a ToDo App', checked: false },
  ]);

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
  }, [todos]);

  const doneCount = useMemo(
    () => todos.filter((t) => t.checked).length,
    [todos]
  );

  const contextValue = useMemo(
    () => ({ todos, setTodos, doneCount }),
    [todos, doneCount]
  );

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
