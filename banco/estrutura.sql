CREATE DATABASE ecommerce;

USE ecommerce;

CREATE Table usuarios (
 id INT PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(100) NOT NULL,
 sobrenome VARCHAR(100) NOT NULL,
 data_nascimento DATE NOT NULL,
 email VARCHAR(100) NOT NULL UNIQUE,
 CPF CHAR(14) NOT NULL UNIQUE,
 senha_hash VARCHAR(255) NOT NULL,
 nivel_acesso TINYINT NOT NULL DEFAULT 1,
 CONSTRAINT chk_nivel_de_acesso CHECK(nivel_acesso IN(1, 2, 3))
);

CREATE Table categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) UNIQUE NOT NULL
);

CREATE Table produtos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(7,2) NOT NULL,
    estoque INT NOT NULL,
    marca VARCHAR(100) NOT NULL,
    id_categoria INT NOT NULL,

    CONSTRAINT fk_produtos_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id),

    CONSTRAINT chk_estoque_maior_ou_igual_a_0 CHECK (estoque >= 0),

    CONSTRAINT chk_preco_maior_que_0 CHECK (preco > 0)
);

CREATE TABLE pedidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,

  CONSTRAINT fk_pedidos_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id),

  CONSTRAINT chk_status_pedido CHECK (status in ('Pendente', 'Confirmado', 'Cancelado'))
);

CREATE TABLE item_pedido (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  id_produto INT NOT NULL,
  quantidade_pedido INT NOT NULL,
  preco_unitario DECIMAL(7,2) NOT NULL,
  
  CONSTRAINT unq_id_pedido_E_id_produto UNIQUE (id_pedido, id_produto),
  
  CONSTRAINT fk_item_pedido_pedidos FOREIGN KEY (id_pedido) REFERENCES pedidos (id),

  CONSTRAINT fk_item_pedido_produtos FOREIGN KEY (id_produto) REFERENCES produtos (id),

  CONSTRAINT chk_qtde_pedido_maior_que_0 CHECK (quantidade_pedido > 0)
);

CREATE TABLE pagamentos (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  forma_pagamento VARCHAR(40) NOT NULL,
  status_pagamento VARCHAR(40) NOT NULL,
  data_pagamento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unq_id_pedido UNIQUE (id_pedido),

  CONSTRAINT fk_pagamentos_id_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos (id),

  CONSTRAINT chk_de_status_pag CHECK (status_pagamento in ('Pendente', 'Aprovado', 'Recusado')),

  CONSTRAINT chk_formas_aceitas_de_pagamento CHECK (forma_pagamento in ('Pix', 'Cartão', 'Boleto'))
);