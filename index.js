const { log } = require("console");
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

    
  },
  {
    id: 2,
    nome: "Gaby",
    login: "admin1",
    senha: "123"
    
  },
  {
    id: 3,
    nome: "Anna Laura",
    login: "admin3",
    senha: "123"
   
  },
  {
    id: 4,
    nome: "Yasmin",
    login: "admin4",
    senha: "123"
   
  },
  {
    id: 5,
    nome: "Lynne",
    login: "admin5",
    senha: "123"
   
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
  const { login, senha } = req.body;

  //verifica se um dos campos vieram vazios
  if (!login || !senha) {
    res.status(404).json({
      status: 404,
      message: "Requisição inválida",
    });
  }

  const usuario = pessoas.find((p) => p.login === login);
  if (!usuario) {
    res.status(404).json({
      status: 404,
      message: "Usuário não encontrado",
    });
  }
  if (usuario.senha !== senha) {
    res.status(404).json({
      status: 404,
      message: "Senha inválida",
    });
  }
  //res.status(200).json({ status: 200, message: "Login com sucesso" })
  res.redirect("/itens.html");
});

app.get("/itens.html", (req, res) => {
  console.log("chegou aqui");
  res.sendFile(path.join(publicDir, "itens.html"));
});

//get
app.get("/pessoas", (req, res) => {
  res.json(pessoas);
});

//post
app.post("/pessoas", (req, res) => {
  const pessoaExiste = pessoas.findIndex((p) => p.login === req.body.login);
  if (pessoaExiste !== -1) {
    return res.status(400).json({ message: "Login já existe" });
  }
  const novaPessoa = {
    id: pessoas.length + 1,
    nome: req?.body?.nome,
    idade: req?.body?.idade,
    irmaos: req?.body?.irmaos,
    cidade: req?.body?.cidade,
    hobby: req?.body?.hobby,
  };
  pessoas.push(novaPessoa);
  console.log(pessoas);
  res
    .status(201)
    .json({ message: "Pessoa cadastrada com sucesso", novaPessoa });
});

app.delete("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pessoaIndex = pessoas.findIndex((p) => p.id === id);
  if (pessoaIndex === -1) {
    return res.status(404).json({ message: "Pessoa não encontrada" });
  }

  pessoas.splice(pessoaIndex, 1);
  res.json({ message: "Pessoa deletada com sucesso" });
});

app.put("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const pessoaIndex = pessoas.findIndex((p) => p.id === id);
  if (pessoaIndex === -1) {
    return res.status(404).json({ message: "Pessoa não encontrada" });
  }
  const pessoaAtualizada = {
    id: id,
    nome: req?.body?.nome,
    login: req?.body?.login,
    senha: req?.body?.senha,
   
  };
  pessoas[pessoaIndex] = pessoaAtualizada;
  res.json({ message: "Pessoa atualizada com sucesso", pessoaAtualizada });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
