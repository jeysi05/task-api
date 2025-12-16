const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock Database
let tasks = [
    { id: 1, title: "Complete Portfolio", completed: false },
    { id: 2, title: "Learn Next.js", completed: true },
    { id: 3, title: "Upload to GitHub", completed: true },
];

// 1. GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// 2. GET a single task
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// 3. POST a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) return res.status(404).send('Task not found');
    
    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});