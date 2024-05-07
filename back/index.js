const express = require('express');
const { Client } = require('cassandra-driver');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3000;

// Configuração do cliente Cassandra
const client = new Client({
  contactPoints: ['127.0.0.1'], // Endereço IP do nó Cassandra
  localDataCenter: 'datacenter1', // Nome do datacenter local
  keyspace: 'user_data' // Nome do keyspace
});


// Conexão com o cluster Cassandra
client.connect()
  .then(() => console.log('Conexão estabelecida com sucesso ao Cassandra'))
  .catch(err => console.error('Erro ao conectar ao Cassandra:', err));

// Rota para obter todos os perfis de usuários
app.get('/users', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM user_profiles');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao obter perfis de usuários:', err);
    res.status(500).send('Erro ao obter perfis de usuários');
  }
});

// Rota para adicionar um novo perfil de usuário
app.post('/users', async (req, res) => {
  const { id, name, email } = req.body;
  try {
    const query = 'INSERT INTO user_profiles (id, name, email) VALUES (?, ?, ?)';
    const id = uuidv4()
    await client.execute(query, [id, name, email]);
    res.status(201).send('Perfil de usuário criado com sucesso');
  } catch (err) {
    console.error('Erro ao criar perfil de usuário:', err);
    res.status(500).send('Erro ao criar perfil de usuário');
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const query = 'DELETE FROM user_profiles WHERE id = ?';
    await client.execute(query, [userId]);
    res.status(200).send('Perfil de usuário excluído com sucesso');
  } catch (err) {
    console.error('Erro ao excluir perfil de usuário:', err);
    res.status(500).send('Erro ao excluir perfil de usuário');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
