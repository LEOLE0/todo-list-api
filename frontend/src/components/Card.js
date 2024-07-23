import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns'; // Importation de la fonction format de date-fns

const CardContainer = styled.div`
    background-color: #fff;
    margin: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 100%;
    position: relative;
`;

const CardTitle = styled.h2`
    margin: 0 0 10px;
    color: #007bff;
`;

const CardDescription = styled.p`
    margin: 5px 0;
    color: #555;
`;

const CardDetails = styled.p`
    margin: 5px 0;
    color: #777;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
        background-color: #e60000;
    }
`;

const EditButton = styled.button`
    position: absolute;
    top: 10px;
    right: 50px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
        background-color: #45a049;
    }
`;

const Card = ({ task, onDelete, onEdit }) => {
    const formattedDate = format(new Date(task.due_date), 'dd/MM/yyyy'); // Formatage de la date

    return (
        <CardContainer>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
            <CardDetails>Date: {formattedDate}</CardDetails>
            <CardDetails>Status: {task.status}</CardDetails>
            <EditButton onClick={() => onEdit(task)}>✎</EditButton>
            <DeleteButton onClick={() => onDelete(task.id)}>X</DeleteButton>
        </CardContainer>
    );
};

export default Card;