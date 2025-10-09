import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 1, text: 'Flying to Hanoi, Vietnam', completed: true },
    { id: 2, text: 'Exploring Old Quarter', completed: true },
    { id: 3, text: 'Visiting Hoan Kiem Lake', completed: false },
  ],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * Adds a new todo item to the state.
     * @param {*} state - The current state.
     * @param {*} action - The action dispatched.
     * @returns The new state with the added todo.
     */
    addTodo: (state, action) => {
      const todos = Array.isArray(state.todos) ? state.todos : [];
      return {
        ...state,
        todos: [
          ...todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    },
    /**
     * Toggles the completion status of a todo item.
     * @param {*} state - The current state.
     * @param {*} action - The action dispatched.
     * @returns The new state with the toggled todo.
     */
    toggleTodo: (state, action) => {
      if (!Array.isArray(state.todos)) {
        return { ...state, todos: [] };
      }
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    },
    /**
     * Deletes a todo item from the state.
     * @param {*} state - The current state.
     * @param {*} action - The action dispatched.
     * @returns The new state without the deleted todo.
     */
    deleteTodo: (state, action) => {
      if (!Array.isArray(state.todos)) {
        return { ...state, todos: [] };
      }
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
      };
    },
    editTodo: (state, action) => {
      if (!Array.isArray(state.todos)) {
        return { ...state, todos: [] };
      }
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
