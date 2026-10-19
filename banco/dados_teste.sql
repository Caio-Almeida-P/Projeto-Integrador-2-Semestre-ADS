use ecommerce;

insert INTO categorias (nome) VALUES 
('Notebook'),
('Celular'),
('Aparelho de Som'),
('Televisão'),
('Monitor');

INSERT INTO usuarios (nome, sobrenome, data_nascimento, email, CPF, senha_hash, nivel_acesso) VALUES
('Fulano', 'da Silva', '2000-01-01', 'fulano.dasilva@example.com', '111.111.111-11', 'senha_ficticia_1', 1),
('Beltrano', 'de Souza', '2000-02-02', 'beltrano.desouza@example.com', '222.222.222-22', 'senha_ficticia_2', 2),
('Ciclano', 'Pereira', '2000-03-03', 'ciclano.pereira@example.com', '333.333.333-33', 'senha_ficticia_3', 3);

-- Categorias: 1. Notebook, 2. Celular, 3. Som, 4. TV e 5. Monitor
-- Não alterar a ordem do inserts
INSERT INTO produtos (nome, descricao, preco, estoque, marca, id_categoria) VALUES
('Vaio F16', 'Notebook Vaio F16 com 512gb de Armazenamento SSD e 16gb de Memória Ram DDR4', 4199.99, 47, 'Vaio', 1),
('Iphone 18', 'Smartphone Iphone 18 de 1TB de Armazenamento com 16GB de Memória Ram', 8999.99, 14, 'Apple', 2),
('Som JBL', 'Som automotivo JBL que estronda tudo', 7999.99, 5, 'JBL', 3),
('SmartTV 92° Pol', 'Televisão inteligente Samsung de 92° Polegadas', 9999.99, 5, 'Samsung', 4),
('Hero 27G3', 'Monitor AOC Hero 27° Polegadas G3', 1099.99, 35, 'AOC', 5);

INSERT INTO pedidos (id_usuario, status, valor_total) VALUES
(1, 'Confirmado', 21599.96);

INSERT INTO item_pedido (id_pedido, id_produto, quantidade_pedido, preco_unitario) VALUES 
(1, 1, 3, 4199.99),
(1, 2, 1, 8999.99);

INSERT INTO pagamentos (id_pedido, forma_pagamento, status_pagamento)VALUES
(1, 'Pix', 'Aprovado');

-- SELECTs para averiguar se tudo correu bem

    -- SELECT 1 - Conferindo se cada produto está na categoria correta:
SELECT 
    produtos.nome as Produto,
    preco as Preço,
    estoque as Quantidade,
    categorias.nome as Categoria

    FROM produtos

    JOIN categorias
    ON produtos.id_categoria = categorias.id;

    -- SELECT 2 - Auditoria do Pedido 1:
SELECT 
    SUM(preco_unitario * quantidade_pedido) AS "Valor Final"
    FROM item_pedido
    
    WHERE id_pedido = 1;

SELECT 
    id,
    valor_total
    
     FROM pedidos;

    -- SELECT 3 - Conferindo o pagamento do pedido 1: 
SELECT 
    id,
    status

from pedidos
WHERE id = 1;

    -- SELECT 4 - Pagamentos:

SELECT 
    id, 
    forma_pagamento as 'Forma de Pagamento', 
    status_pagamento as 'Status' 
    
    from pagamentos;