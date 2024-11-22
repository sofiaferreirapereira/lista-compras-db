const express = require('express');
const app = express();
const PORT = 3000;
const pg = require('pg');
const path = require('path');

/* Mostrando o caminho dos arquivos publicos */
app.use(express.static(path.join(__dirname, "../Frontend/public")));
app.use(express.json());

const {Pool} = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "listacompras",
    password: "postgres",
    port: 5432,
    max: 5, //número máximo de conexões simultâneas
    idleTimeoutMillis: 30000 // tempo máximo sem se conectar até dar erro
})

/* Enviar página para o frontend */
app.get("/", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../Frontend/public/views/index.html"));
    } 
    catch(erro) {
        res.status(418).send(`Erro de conexão: ${erro.message}`);
    }
})

/* Inicializar o servidor */
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta localhost: ${PORT}`);
})

/* POST para preencher o banco de dados */
async function dbInsertList(produto, valor) {
    try {
        const respondeDB = await pool.query("INSERT INTO compras(produto, valor) VALUES ($1, $2)", [produto, valor])
    }
    catch(erro) {
        res.status(418).send(`Erro de conexão: ${erro.message}`);
        throw erro;
    }
}
app.post("/api/compras", async (req, res) => {
    try {
        await dbInsertList(
            req.body.produto, 
            req.body.valor
        ) 
        res.status(201).send(`Produto adicionado com sucesso!`)
    } 
    catch(erro) {
        res.status(500).send(`Erro ao adicionar o produto: ${er.message}`)
    }
})