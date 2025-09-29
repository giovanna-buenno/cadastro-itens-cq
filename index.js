const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = path.join(__dirname, "./public");

let pessoas = [
  {
    id: 1,
    nome: "Lara",
    login: "admin",
    senha: "123",
    idade: 14,
    irmaos: true,
    cidade: "São Paulo",
    hobby: "Desenhar",
  },
  {
    id: 2,
    nome: "Gaby",
    login: "admin1",
    senha: "123",
    idade: 13,
    irmaos: false,
    cidade: "Rio de Janeiro",
    hobby: "Tocar violão",
  },
  {
    id: 3,
    nome: "Anna Laura",
    login: "admin3",
    senha: "123",
    idade: 14,
    irmaos: true,
    cidade: "Belo Horizonte",
    hobby: "Dançar",
  },
  {
    id: 4,
    nome: "Yasmin",
    login: "admin4",
    senha: "123",
    idade: 13,
    irmaos: true,
    cidade: "Salvador",
    hobby: "Ler livros",
  },
  {
    id: 5,
    nome: "Lynne",
    login: "admin5",
    senha: "123",
    idade: 13,
    irmaos: true,
    cidade: "Curitiba",
    hobby: "Jogar videogame",
  },
];

// ========================================
// 3. ROTAS DA API (ENDPOINTS)
// ========================================

// ROTA DE TESTE
// Método: GET
// Endpoint: http://localhost:3000/
// Função: Verificar se a API está funcionando
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "login.html"));
});

app.post("/login", (req, res) => {
  const { nome, login, senha } = req.body;

  if (!nome || !login || !senha) {
    return res
      .status(400)
      .json({ message: "Nome, login e senha são obrigatórios" });
  }

  const pessoaExiste = pessoas.findIndex((p) => p.login === login);
  if (pessoaExiste) {
    res.status(404).json("pessoa já existe");
  }

  const novaPessoa = {
    id: pessoas.length + 1,
    nome: req?.body.nome,
    login: req?.body.login,
    senha: req?.body.senha,
  };
  pessoas.push(novaPessoa);
  res.status(201).json("pssoa criada com sucesso");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
