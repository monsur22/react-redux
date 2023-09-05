// TodoPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addTodo,updateTodo, removeTodo} from "../redux/action/todoActions";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import './TodoPage.css'
const TodoPage = () => {
    const [todoData, setTodoData] = useState({
        newTodo: "",
        selectedTodo: null,
        isAdding: true,
        editedTitle: "",
    });

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todos);
    const length = useSelector((state) => state.todo.todos.length);

    const handleAddTodo = () => {
        const { newTodo } = todoData;
        if (newTodo.trim() !== "") {
            const todo = {
                id: length + 1,
                title: newTodo,
            };
            dispatch(addTodo(todo));
            setTodoData({ ...todoData, newTodo: "" });
        }
    };

    const handleEditTodo = (todo) => {
        setTodoData({
            ...todoData,
            isAdding: false,
            selectedTodo: todo,
            editedTitle: todo.title,
        });
    };

    const handleSaveEdit = () => {
        const { selectedTodo, editedTitle } = todoData;
        if (selectedTodo && editedTitle.trim() !== "") {
            dispatch(updateTodo({ ...selectedTodo, title: editedTitle }));
            setTodoData({
                ...todoData,
                selectedTodo: null,
                editedTitle: "",
                isAdding: true,
            });
        }
    };

    const handleRemoveTodo = (id) => {
        dispatch(removeTodo(id));
    };
    return (
        <div className="todo-page">
            <h1 className="todo-header">TODO List</h1>
            <div className="input-container">
                <input
                    type="text"
                    className="todo-input"
                    value={todoData.isAdding ? todoData.newTodo : todoData.editedTitle}
                    onChange={(e) =>
                        todoData.isAdding
                            ? setTodoData({ ...todoData, newTodo: e.target.value })
                            : setTodoData({ ...todoData, editedTitle: e.target.value })
                    }
                />
                <button
                    className={`todo-button ${todoData.isAdding ? 'add-button' : 'save-button'}`}
                    onClick={todoData.isAdding ? handleAddTodo : handleSaveEdit}
                >
                    {todoData.isAdding ? "Add" : "Save"}
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        {todo.title}
                        <button className="edit-button" onClick={() => handleEditTodo(todo)}>
                            Edit
                        </button>
                        <button className="remove-button" onClick={() => handleRemoveTodo(todo.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default TodoPage;