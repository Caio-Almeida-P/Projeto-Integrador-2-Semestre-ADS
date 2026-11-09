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

// Buscar um produto com o termo digitado
router.get("/busca", (req, res) => {
  const termo = req.query.termo;

  if (!termo) {
    return res.status(400).json({
      erro: "Preencha o campo de pesquisa!",
    });
  }

  const padrao = '%' + termo + '%';

  connection.query(
    'SELECT * FROM produtos WHERE nome LIKE ? OR descricao LIKE ?',
    [padrao, padrao],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          erro: "Erro ao fazer a pesquisa!",
        });
      }

      res.json(results);
    }
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

module.exports = router;
