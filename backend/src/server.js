
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar as rotas
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Registrar as rotas
app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.send('API do Ecommerce funcionando!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
