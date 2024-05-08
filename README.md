# Configuração do Cassandra com Docker

Este documento fornece instruções passo a passo para configurar um ambiente Cassandra usando Docker e o Cassandra Query Language (CQL).

## 1. Criando os containers Cassandra com Docker:

O comando a seguir cria um container Docker executando o Cassandra. Ele também mapeia a porta 9042 do container para a porta 9042 do host.

```bash
docker-compose up -d

```

Por quê: Isso inicia um container Cassandra em segundo plano, permitindo que você interaja com ele posteriormente.

## 2. Acessando o container Cassandra:
Este comando permite acessar o shell dentro do container Cassandra recém-criado.

```bash
rm -Rf ~/.cassandra
docker exec -it cassandra1 cqlsh

```
Por quê: Isso permite que você crie keyspaces, tabelas e execute consultas no Cassandra usando a linguagem CQL.

## 5. Criando um keyspace:
Este comando cria um keyspace chamado user_data com uma estratégia de replicação SimpleStrategy e um fator de replicação de 1.

```bash
CREATE KEYSPACE IF NOT EXISTS example_keyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
```

Por quê: Um keyspace é necessário para organizar e isolar tabelas no Cassandra. A estratégia de replicação define como os dados são replicados entre os nós do cluster.

## 6. Usando o keyspace criado:
Este comando seleciona o keyspace user_data para que todas as operações subsequentes sejam realizadas dentro desse keyspace.
c

```clq
USE example_keyspace;
```
Por quê: Isso define o keyspace padrão para o contexto atual, para que as operações de criação de tabela e consulta sejam aplicadas a este keyspace.

## 7. Criando uma tabela:
Este comando cria uma tabela chamada users com três colunas: id (UUID), name (Texto) e email (Texto). A coluna id é definida como a chave primária.

```clq
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT,
    email TEXT
);
```

## 8. Instalando Node.js (caso não o possua)
### 8.1. Instalando o Node.js:
Baixe o instalador do Node.js:

Acesse o site oficial do Node.js em nodejs.org
.
Baixe o instalador adequado para o seu sistema operacional (Windows, macOS, Linux).

### 8.2. Execute o instalador:
No Windows, execute o instalador baixado e siga as instruções do assistente de instalação.

No macOS, abra o arquivo .dmg baixado e arraste o ícone do Node.js para a pasta Applications.

No Linux, você pode instalar o Node.js usando o gerenciador de pacotes do seu sistema.

### 8.3. Verifique a instalação:
Após a instalação, abra um terminal (cmd no Windows, Terminal no macOS e Linux).

Execute os seguintes comandos para verificar se o Node.js e o npm (gerenciador de pacotes do Node.js) foram instalados corretamente:

```bash
node -v
npm -v
```
Você deve ver as versões do Node.js e do npm sendo exibidas no terminal.

## 9 Execulte o app.

### 9.1 Clone este projeto para a sua maquina
```bash
git clone https://github.com/usuario/cassandra.git
```
### 9.2 Navegue até a Pasta 'back' pelo Terminal

### 9.3 Intale as Dependências
```bash
npm i
```
### 9.4. Execute o Aplicativo
Inicie o aplicativo usando o comando npm run start:
```bash
npm run start
```

## 10 Abra o front.

### 10.1 Navegue até a Pasta 'front' pelo Terminal

### 10.2 Abrar o arquivo html no seu navegador
```bash
start index.html

docker exec -it cassandra-node1 bash
sed -i 's/^listen_address.*$/listen_address: cassandra-node1/' ./etc/cassandra/cassandra.yaml
sed -i 's/^rpc_address.*$/rpc_address: 0.0.0.0/' ./etc/cassandra/cassandra.yaml
sed -i 's/- seeds: "127.0.0.1"/- seeds: "cassandra-node1"/' ./etc/cassandra/cassandra.yaml

docker exec -it cassandra-node2 bash
sed -i 's/^listen_address.*$/listen_address: cassandra-node2/' ./etc/cassandra/cassandra.yaml
sed -i 's/^rpc_address.*$/rpc_address: 0.0.0.0/' ./etc/cassandra/cassandra.yaml
sed -i 's/- seeds: "127.0.0.1"/- seeds: "cassandra-node1"/' ./etc/cassandra/cassandra.yaml

docker exec -it cassandra-node3  bash
sed -i 's/^listen_address.*$/listen_address: cassandra-node3/' ./etc/cassandra/cassandra.yaml
sed -i 's/^rpc_address.*$/rpc_address: 0.0.0.0/' /etc/cassandra/cassandra.yaml
sed -i 's/- seeds: "127.0.0.1"/- seeds: "cassandra-node1"/' ./etc/cassandra/cassandra.yaml
``