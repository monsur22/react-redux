// TodoPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addTodo,updateTodo, removeTodo} from "../redux/action/todoActions";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

const TodoPage = () => {
    const [newTodo, setNewTodo] = useState(""); // State to manage the new TODO input
    const [selectedTodo, setSelectedTodo] = useState(null); // Track the selected TODO
    const [isAdding, setIsAdding] = useState(true); // Track whether you are adding a new TODO

    const [editedTitle, setEditedTitle] = useState(''); // Track the edited title
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todos);
    const length = useSelector((state) => state.todo.todos.length);
    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };
    const todo = {
        id: length+1, // Generate a unique ID
        title: newTodo,
    };
    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            dispatch(addTodo(todo));
            setNewTodo(""); // Clear the input field
        }
    };

    const handleEditTodo = (todo) => {
        setIsAdding(false)
        setSelectedTodo(todo); // Set the selected TODO
        setEditedTitle(todo.title); // Initialize the edited title with the current title
    };

    const handleSaveEdit = () => {
        if (selectedTodo && editedTitle.trim() !== '') {
            dispatch(updateTodo({ ...selectedTodo, title: editedTitle }));
            setSelectedTodo(null); // Clear the selected TODO
            setEditedTitle(''); // Clear the edited title
            setIsAdding(true)
        }
    };
    const handleRemoveTodo = (id) => {
        dispatch(removeTodo(id));
    };

    return (
        <div>
            <h1>TODO List</h1>
            <div>
                {isAdding ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter a new TODO"
                            value={newTodo}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleAddTodo}>Add</button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                    </>
                )}

            </div>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}
                        <button onClick={() => handleEditTodo(todo)}>Edit</button>
                        <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>

                    </li>
                ))}
            </ul>

        </div>
    );
};

export default TodoPage;