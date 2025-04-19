import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo } from './todosSlice';

export default function TodoList() {
    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.todos);
    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div>
            <h2>Lista de Tareas</h2>
            {status === 'loading' && <p>Cargando...</p>}
            <ul>
                {items.map(todo => <li key={todo.id}>{todo.text}</li>)}
            </ul>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Nueva tarea"
            />
            <button onClick={() => { dispatch(addTodo(text)); setText(''); }}>
                Añadir
            </button>
        </div>
    );
}
