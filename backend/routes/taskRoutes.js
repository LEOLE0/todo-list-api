const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route pour créer une nouvelle tâche
router.post('/tasks', taskController.createTask);

// Route pour récupérer une tâche par son identifiant
router.get('/task/:id', taskController.getTaskById);

// Route pour mettre à jour une tâche
router.put('/task/:id', taskController.updateTask);

// Route pour supprimer une tâche par son identifiant
router.delete('/task/:id', taskController.deleteTask);

// Route pour récupérer toutes les tâches
router.get('/tasks', taskController.getAllTasks);

module.exports = router;