import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './counterSlice';

export default function Counter() {
    const count = useSelector(state => state.counter);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Contador: {count}</h2>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>–</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
}
