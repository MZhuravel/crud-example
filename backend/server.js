// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

// Sample data for todos
let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build a React app', completed: true }
];

// GET all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false
    };
    todos.push(newTodo);
    res.json(newTodo);
});

// PUT/Update a todo by ID
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    todos = todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
    res.json({ message: 'Todo updated successfully' });
});

// DELETE a todo by ID
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: 'Todo deleted successfully' });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
