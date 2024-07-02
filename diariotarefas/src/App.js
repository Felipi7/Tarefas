import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() && clientName.trim()) {
      try {
        const response = await axios.post('http://localhost:8080/api/tasks', { name: newTask, clientName });
        setTasks([...tasks, response.data]);
        setNewTask('');
        setClientName('');
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        placeholder="Nome do Cliente"
        className="input-task"
      />
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Adicionar nova tarefa"
        className="input-task"
      />
      <button onClick={addTask} className="add-button">Adicionar Tarefa</button>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
            <span className="task-name">{task.name}</span>
            <div className="buttons">
              <button className="complete-button" onClick={() => toggleTaskCompletion(task.id, task.completed)}>
                {task.completed ? 'Desfazer' : 'Feito'}
              </button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
