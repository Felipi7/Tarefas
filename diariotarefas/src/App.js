import React, { useState } from 'react';
import './App.css'; // Importar um arquivo CSS para estilização adicional

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const markTaskAsCompleted = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    ));
  };

  const markTaskAsPending = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: false } : task
    ));
  };

  const toggleTaskCompletion = (id, completed) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: completed } : task
    ));
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
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
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : 'pending'}`}
          >
            <span className="task-name">{task.name}</span>
            <div className="buttons">
              <button className="complete-button" onClick={() => toggleTaskCompletion(task.id, !task.completed)}>
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
