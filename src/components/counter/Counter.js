import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    incrementCounter,
    decrementCounter,
    resetCounter,
    incrementCounterByValue
} from '../../redux/action/counterActions'
const Counter = () => {

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const [incrementValue, setIncrementValue] = useState(count); // Default value is 1

    const handleIncrement = () => {
        dispatch(incrementCounter());
    };
    const handleDecrement = () => {
        dispatch(decrementCounter());
    };
    const handleReset = () => {
        dispatch(resetCounter());
    };
    const handleIncrementByValue = () => {
        dispatch(incrementCounterByValue(parseInt(incrementValue, 10)));
    };

  return (
    <div className='card'>
        <div className='card-header bg-secondary'>
            <h4>my counter app</h4>
        </div>
        <div className='card-body'>
            <h1>{count}</h1>
            <input
                type="number"
                value={incrementValue}
                onChange={(e) => setIncrementValue(parseInt(e.target.value))}
            />
            <div className='my-4'>
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleDecrement}>Decrement</button>
                <button onClick={handleIncrementByValue}>Increment by Value</button>

            </div>
        </div>
    </div>
  )
}


export default Counter