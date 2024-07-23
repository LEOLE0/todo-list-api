const pool = require('../config/db');

// Fonction pour créer une nouvelle tâche
const createTask = async (req, res) => {
    const { title, description, due_date, status } = req.body;
    console.log('Received task data:', req.body);
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, due_date, status]
        );
        console.log('Task created:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating task', error);
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour récupérer une tâche par son identifiant
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour mettre à jour une tâche
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;
    try {
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *",
            [title, description, due_date, status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour supprimer une tâche par son identifiant
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour récupérer toutes les tâches
const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        console.log('Tasks fetched:', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getAllTasks,
};