import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoText, setEditTodoText] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/todos');
            const data = await res.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const addTodo = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newTodoText, completed: false }),
            });
            
            if (res.ok) {
                getData();
                setNewTodoText('');
            }
        } catch (error) {
            console.error('Error adding new todo:', error);
        }
    }

    const updateTodo = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: editTodoText, completed: todos.find(todo => todo.id === id).completed }), // Include completion status in the update
            });

            if (res.ok) {
                getData();
                setEditTodoId(null);
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                getData();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    const toggleTodoStatus = async (id) => {
        const updatedStatus = todos.find(todo => todo.id === id).completed ? false : true;

        try {
            const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: updatedStatus }), // Toggle the completion status
            });

            if (res.ok) {
                getData();
            }
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    }

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <h2>Add New Todo</h2>
            <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Enter new todo"
            />
            <button onClick={addTodo}>Add New Todo</button>
            <h2>Edit Todo</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editTodoId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTodoText}
                                    onChange={(e) => setEditTodoText(e.target.value)}
                                />
                                <button className="edit" onClick={() => updateTodo(todo.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span className={todo.completed ? 'completed' : ''}>
                                    {todo.task} - {todo.completed ? 'Completed' : 'Incomplete'}
                                </span>
                                <div>
                                    <button className="edit" onClick={() => setEditTodoId(todo.id)}>Edit</button>
                                    <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                    <button className="status" onClick={() => toggleTodoStatus(todo.id)}>
                                        {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
