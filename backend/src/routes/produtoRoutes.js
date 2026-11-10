const express = require("express");
const router = express.Router();

const connection = require("../config/database");

// Buscar todos os produtos
router.get("/", (req, res) => {
  connection.query("SELECT * FROM produtos", (err, results) => {
    if (err) {
      return res.status(500).json({
        erro: "Erro ao buscar produtos",
      });
    }

    res.json(results);
  });
});

// Rota para criar um novo produto
router.post("/", (req, res) => {
  const { nome, descricao, preco, estoque, marca, id_categoria } = req.body;

  if (
    !nome ||
    !descricao ||
    preco === undefined ||
    estoque === undefined ||
    !marca ||
    !id_categoria
  ) {
    return res.status(400).json({
      erro: "Preencha todos os campos do produto!",
    });
  }

  const sql = `INSERT INTO produtos (nome, descricao, preco, estoque, marca, id_categoria)
        VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    sql,
    [nome, descricao, preco, estoque, marca, id_categoria],
    (err, result) => {
      if (err) {
        if (err.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
          return res.status(400).json({
            erro: "O preço do produto não pode ser menor ou igual a 0 e o estoque não pode ser menor que 0!",
          });
        }
        if (err.code === "ER_NO_REFERENCED_ROW_2") {
          return res.status(400).json({
            erro: "Categoria não encontrada!",
          });
        }

        console.error(err);

        return res.status(500).json({
          erro: "Erro ao cadastrar o produto!",
        });
      }
      res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        id: result.insertId,
      });
    },
  );
});

// Buscar um produto com o termo digitado
router.get("/busca", (req, res) => {
  const termo = req.query.termo;

  if (!termo) {
    return res.status(400).json({
      erro: "Preencha o campo de pesquisa!",
    });
  }

  const padrao = "%" + termo + "%";

  connection.query(
    "SELECT * FROM produtos WHERE nome LIKE ? OR descricao LIKE ?",
    [padrao, padrao],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          erro: "Erro ao fazer a pesquisa!",
        });
      }

      res.json(results);
    },
  );
});

// Buscar um produto específico pelo ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          erro: "Erro ao buscar produto",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          erro: "Produto não encontrado",
        });
      }

      res.json(results[0]);
    },
  );
});

// Rota para alterar um produto a partir do seu ID
router.put("/:id", (req, res) => {
  const { nome, descricao, preco, estoque, marca, id_categoria } = req.body;

  if (
    !nome ||
    !descricao ||
    preco === undefined ||
    estoque === undefined ||
    !marca ||
    !id_categoria
  ) {
    return res.status(400).json({
      erro: "Preencha todos os campos do produto!",
    });
  }

  const id = req.params.id;

  const sql = `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, marca = ?, id_categoria = ? WHERE id = ?`;

  connection.query(
    sql,
    [nome, descricao, preco, estoque, marca, id_categoria, id],
    (err, result) => {
      if (err) {
        if (err.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
          return res.status(400).json({
            erro: "O preço do produto não pode ser menor ou igual a 0 e o estoque não pode ser menor que 0!",
          });
        }
        if (err.code === "ER_NO_REFERENCED_ROW_2") {
          return res.status(400).json({
            erro: "Categoria não encontrada!",
          });
        }

        console.error(err);

        return res.status(500).json({
          erro: "Erro ao atualizar o produto!",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          erro: "Produto não encontrado!",
        });
      }

      res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
      });
    },
  );
});

// Rota para deletar um produto a partir do seu ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  connection.query("DELETE FROM produtos WHERE id = ?", [id], (err, result) => {
    if (err) {
      if (err.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
          erro: "Não é possível excluir produtos que tenham vendas cadastradas!",
        });
      }

      console.error(err);

      return res.status(500).json({
        erro: "Erro ao excluir o produto",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        erro: "Produto não encontrado!",
      });
    }
    res.json({ mensagem: "Produto excluído com sucesso!" });
  });
});

module.exports = router;
