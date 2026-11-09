const express = require("express");
const router = express.Router();

const connection = require("../config/database");

// Buscar todas as categorias
router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM categorias ORDER BY id ASC",
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          erro: "Erro ao buscar as categorias!",
        });
      }

      res.json(results);
    },
  );
});

module.exports = router;
