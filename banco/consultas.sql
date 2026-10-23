use ecommerce;

-- Select de produtos utilizando LIKE
SELECT
    nome AS "Nome",
    preco AS "Preço Unitário"
FROM produtos
WHERE nome LIKE '%pol%' OR descricao LIKE '%pol%'; -- o "pol" foi digitado apenas como exemplo, posteriormente será substituido pelo que o usuário digitar

-- Select mostrando os 3 produtos mais baratos
SELECT
    nome AS "Nome",
    preco AS "Preço"
FROM produtos
ORDER BY preco ASC
LIMIT 3;

-- Select mostrando os 2 produtos mais caros
SELECT
    nome AS "Nome",
    preco AS "Preço"
FROM produtos
ORDER BY preco DESC
LIMIT 2;

-- Select mostrando os produtos e suas respectivas categorias
SELECT
    produtos.nome AS Produto,
    preco AS Preço,
    estoque AS Quantidade,
    categorias.nome AS Categoria
FROM produtos
JOIN categorias
ON produtos.id_categoria = categorias.id;

-- Select mostrando os itens de um pedido e o subtotal de cada item
SELECT
    item_pedido.id AS "ID do Item Pedido",
    id_pedido AS "ID do Pedido",
    id_produto AS "ID do Produto",
    produtos.nome AS "Nome do Produto",
    quantidade_pedido AS "QTDE",
    preco_unitario AS "Preço Unitário",
    preco_unitario * quantidade_pedido AS Subtotal
FROM item_pedido
JOIN produtos
ON id_produto = produtos.id
WHERE id_pedido = 1;

-- Select de Auditoria: comparando o valor final nas tabelas item_pedido e pedidos
SELECT SUM(preco_unitario * quantidade_pedido) AS "Valor Final"
FROM item_pedido
WHERE id_pedido = 1;

SELECT id, valor_total
FROM pedidos
WHERE id = 1;

-- Alteração de pedido com TRANSACTION para executar todos os comandos um por um e ROLLBACK para desfazer todas as alterações
START TRANSACTION;

UPDATE item_pedido
SET quantidade_pedido = quantidade_pedido + 1
WHERE id = 1;

UPDATE pedidos
SET valor_total = valor_total + 4199.99
WHERE id = 1;

UPDATE produtos
SET estoque = estoque - 1
WHERE id = 1;

COMMIT; -- No sistema real iremos utilizar o COMMIT e não rollback, para concretizar as alterações feitas.

ROLLBACK; -- Utilizamos o Rollback para não alterar os dados que já foram inseridos e deixar os dados diferentes



