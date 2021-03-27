# React Material-ui Sistema de Autenticação

Este projeto foi criado com a intenção de servir como base para novos trabalhos, é um ponto de partida para criação de aplicativos devido a constante necessidade de
autenticação e registro de usuários. Material-ui é usado para lidar com a parte visual e no gerenciamento de estado no React usei o contexto.

As rotas são criadas com Node e Express e o Banco de dados é o MongoDB atlas.

<br />
<img src="./react-login.gif" alt="react-login">

## Instalação

## 1 passo instalar os pacotes no servidor e no cliente

```bash
cd reactLoginRegister
npm install

cd reactLoginRegister/client
npm install
```

## 2 passo criar o arquivo default.json na pasta config/

```bash
cd reactLoginRegister/config
touch default.json
```

## 3 passo inserir os dados do seu banco de dados MongoDB

```js
{
  "mongoURI": "mongodb+srv://usuario:senha@cluster0-7xmit.mongodb.net/users?retryWrites=true&w=majority",
  "jwtSecret": "secret"
}
```

## 4 iniciar projeto em modo de desenvolvimento

```bash
npm run dev
```

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
