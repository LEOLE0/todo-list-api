const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const pool = require('./config/db'); // Importation du pool depuis db.js
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Ajoutez cette ligne pour activer CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(taskRoutes);

// Vérification de la connexion à la base de données
pool.connect((err) => {
    if (err) {
        console.error('Database connection error', err.stack);
    } else {
        console.log('Database connected');
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});