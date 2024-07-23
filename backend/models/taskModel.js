

const pool = require('../config/db');

const createTaskTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            due_date DATE,
            status VARCHAR(50)
        );
    `;
    try {
        await pool.query(queryText);
        console.log('Task table created successfully');
    } catch (err) {
        console.error('Error creating task table', err);
    }
};

module.exports = { createTaskTable };