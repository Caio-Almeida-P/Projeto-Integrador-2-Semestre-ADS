const express = require('express');
const router = express.Router();

const connection = require('../config/database');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post('/cadastro', async (req, res) => {

    const {
        nome,
        sobrenome,
        data_nascimento,
        email,
        CPF,
        senha
    } = req.body;

if(!nome || !sobrenome || !data_nascimento || !email || !CPF || !senha) {
    return res.status(400).json({
        erro: 'Preencha todos os campos!'
    })
}

 try {

        // Criptografar senha
        const senhaHash = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios
            (nome, sobrenome, data_nascimento, email, CPF, senha_hash)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [nome, sobrenome, data_nascimento, email, CPF, senhaHash],
            (err, result) => {

                if (err) {

                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({
                            erro: 'E-mail ou CPF já cadastrado!'
                        });
                    }

                    console.error(err);

                    return res.status(500).json({
                        erro: 'Erro ao cadastrar usuário.'
                    });
                }

                res.status(201).json({
                    mensagem: 'Usuário cadastrado com sucesso!',
                    id: result.insertId
                });
            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro ao processar cadastro.'
        });
    }
});


// Login do usuário
router.post('/login', (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            erro: 'Informe e-mail e senha!'
        });
    }

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ?
    `;

    connection.query(sql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                erro: 'Erro ao realizar login.'
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });
        }

        const usuario = results[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { 
                id: usuario.id, 
                nivel_acesso: usuario.nivel_acesso 
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Retornar resposta ao cliente
        res.json({
            mensagem: 'Login realizado com sucesso!',

            token: token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
                nivel_acesso: usuario.nivel_acesso
            }
        });
    });
});

module.exports = router;