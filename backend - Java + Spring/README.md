# DURC SYS

## Descrição

API para gerenciamento de usuários e seus respectivos perfis.

## Instruções para rodar o projeto

1. Clone o repositório.
2. Execute `mvn clean install` para compilar o projeto.
3. Execute `mvn spring-boot:run` para rodar a aplicação.

## Documentação da API

A documentação da API está disponível no Swagger UI. Você pode acessá-la através do seguinte link:

[Swagger UI](http://localhost:8080/durcsys-api/swagger-ui/index.html)

Certifique-se de que a aplicação está em execução antes de acessar o Swagger UI.

## Banco de Dados

O banco de dados Postgress é utilizado para armazenar os dados da aplicação.
Tenha instalado o Postgress e crie um banco de dados chamado `durcsys`.

### Configuração

Para configurar o banco de dados, você deve alterar as propriedades do arquivo `application.properties` localizado em `src/main/resources`.

## Autenticação

Esta API utiliza autenticação Jwt. Para obter um token de autenticação, você deve fazer uma requisição POST para o endpoint `/auth/signup` com o
cabeçalho `Content-Type: application/json` e o seguinte corpo

    {
        "email": "###",
        "nome": "###",
        "senha": "###"
    }

Logo após, faça uma requisição POST para o endpoint `/auth/signin` com o cabeçalho `Content-Type: application/json` e o seguinte corpo

    {
        "email": "###",
        "senha": "###"
    }
