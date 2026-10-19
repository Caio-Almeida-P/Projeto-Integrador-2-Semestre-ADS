# Projeto Integrador - 2° Semestre de ADS

## Integrantes:
- Caio de Almeida Paiva;
- Ezequiel Feliciano dos Santos;
- Henryk dos Santos Silva;
- Ítalo Ferreira da Silva Matos;
- Lucas Ribeiro Campos.

## INTRODUÇÃO E TECNOLOGIAS PREVISTAS

Para nosso segundo projeto, temos como objetivo a criação de um E-Commerce de produtos eletrônicos.

Utilizaremos algumas ferramentas para isso, tais como:
- Back-End: Node.js;
- Front-End: HTML, CSS e Angular;
- Banco de Dados: MySQL;
- Versionamento de Código: Git e Github.

## ESTADO ATUAL

Pretendemos atualizar nosso projeto de acordo com a nossa evolução, seja ela diária, semanal ou até mensalmente.

- Versão 0.0.1 
Atualmente estamos estruturando o banco de dados e criamos os primeiros protótipos das telas do nosso projeto.

- Versão 0.0.2
Terminamos a criação do nosso banco de dados chamado ecommerce, nessa fase, criamos dois scripts que irão ajudar a criar o banco e inserir as informações necessárias para começar a utilizá-lo. Todas as informações pessoais contidas dos usuários no arquivo dados_teste.sql são apenas para testes, não foi inserida nenhuma informação real.

- Versão 0.0.3
Adição das pastas docs e frontend ao repositório, a pasta docs contém a ficha de prototipagem do nosso projeto com as telas, o funcionamento esperado e o protótipo inicial das telas. A pasta frontend contém os protótipos das telas do nosso projeto, sendo elas uma versão inicial daquilo que queremos construir.

## BANCO DE DADOS

Para utilizar o banco de dados, primeiro verifique a pasta banco, a seguir verifique se os dois arquivos estão contidos nela, sendo estrutura.sql e dados_teste.sql, confirmando essa tarefa, siga para a criação do banco, execute os seguintes passos:
1. Execute os arquivos na seguinte ordem, primeiro o estrutura.sql e depois dados_teste.sql, porque o primeiro cria o banco e as tabelas e o segundo insere os dados das tabelas;
2. Execute todas as linhas do arquivo estrutura.sql a partir da linha 1, na ordem pré-estabelecida, para criar o banco e obedecer as regras que estabelecemos;
3. Após a criação do banco, confira se todas as tabelas foram criadas com o comando SHOW TABLES;
4. Parta para a inserção dos valores nas tabelas, a partir do arquivo dados_teste.sql;
5. Com o arquivo aberto, execute todas as linhas;
6. Após a criação do banco e da inserção dos valores, confira se tudo está de acordo com as SELECTs no fim do arquivo, as mesmas irão verificar se tudo foi executado de maneira correta.
7. Não execute o arquivo dados_teste.sql mais de uma vez, pois há atributos que foram registrados com unicidade, ou seja, não podem se repetir.
8. Não execute o estrutura.sql após a criação do banco ecommerce, pois isso gerará um erro, porque o banco já foi criado.

## ORGANIZAÇÃO DO REPOSITÓRIO

- Pasta banco: Contém todos os arquivos do nosso banco de dados;
- Pasta docs: Contém a ficha de prototipagem do projeto;
- Pasta frontend/prototipo: Contém todos os protótipos de telas do projeto.

## POR ONDE COMEÇAR

Assim que clonar o repositório, leia a documentação README e execute os passos que definimos na seção BANCO DE DADOS, caso queira visualizar o banco de dados. Após isso acesse a pasta docs e leia a ficha de prototipagem, após a leitura retorne a pasta frontend e acesse prototipo, a partir daí execute o arquivo inicio.html, que é a Página Inicial do projeto, no VScode pelo Live Server ou siga o caminho predefinido na ficha de prototipagem.