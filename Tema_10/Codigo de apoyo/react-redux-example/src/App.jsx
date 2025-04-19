import React from 'react';
import Counter from './features/counter/Counter';
import TodoList from './features/todos/TodoList';

function App() {
    return (
        <div>
            <h1>Mi App con React + Redux</h1>
            <Counter />
            <TodoList />
        </div>
    );
}

export default App;
