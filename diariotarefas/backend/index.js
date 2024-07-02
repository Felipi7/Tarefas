const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config'); // Importa o pool de conexão do config.js

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors()); // Habilita CORS para todas as origens
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express e PostgreSQL');
});

// Exemplo de rota usando o pool de conexão
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { name, clientName } = req.body;
  try {
    const result = await pool.query('INSERT INTO tasks (name, client_name, completed) VALUES ($1, $2, false) RETURNING *', [name, clientName]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;
  try {
    const result = await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *', [completed, taskId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
