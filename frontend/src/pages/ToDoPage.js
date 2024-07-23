import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import Card from '../components/Card';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    background-color: #f4f7f6;
    min-height: 100vh;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ebecf0;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    margin: 0 10px;
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 20px;
`;

const TaskForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 100%;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const TaskListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const ToDoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            console.log('Fetched tasks:', response.data); // Ajout de console.log
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const createTask = async () => {
        try {
            const newTask = { title, description, due_date: dueDate, status };
            console.log('Creating task:', newTask); // Ajout de console.log
            const response = await api.post('/tasks', newTask);
            console.log('Task created:', response.data); // Ajout de console.log
            fetchTasks(); // Rafraîchir la liste des tâches après la création
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('');
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    const updateTask = async () => {
        try {
            const updatedTask = { title, description, due_date: dueDate, status };
            console.log('Updating task:', updatedTask); // Ajout de console.log
            await api.put(`/task/${editingTask.id}`, updatedTask);
            console.log('Task updated');
            fetchTasks(); // Rafraîchir la liste des tâches après la mise à jour
            setTitle('');
            setDescription('');
            setDueDate('');
            setStatus('');
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/task/${id}`);
            fetchTasks(); // Rafraîchir la liste des tâches après la suppression
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const startEditing = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date);
        setStatus(task.status);
        setEditingTask(task);
    };

    return (
        <Container>
            <Column>
                <Title>To-Do List</Title>
                <TaskForm>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Due Date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    {editingTask ? (
                        <Button onClick={updateTask}>Update Task</Button>
                    ) : (
                        <Button onClick={createTask}>Add Task</Button>
                    )}
                </TaskForm>
            </Column>
            <Column>
                <Title>À FAIRE</Title>
                <TaskListContainer>
                    <TaskList>
                        {tasks.map((task) => (
                            <Card key={task.id} task={task} onDelete={deleteTask} onEdit={startEditing} />
                        ))}
                    </TaskList>
                </TaskListContainer>
            </Column>
        </Container>
    );
};

export default ToDoPage;