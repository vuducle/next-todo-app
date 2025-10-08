'use client';
import Image from 'next/image';
import Form from './Form';
import { TodoProvider } from './TodoContext';
//import { useState } from 'react';

export default function Home() {
  // const [todo, setTodo] = useState('');
  // const [deleteTodo, setDeleteTodo] = useState('');

  return (
    <div className="">
      <TodoProvider>
        <Form />
      </TodoProvider>
    </div>
  );
}
