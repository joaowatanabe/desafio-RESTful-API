const express = require("express");
const verificarUsuarioLogado = require("../intermadiarios/intermadiarios");
const {
  cadastrarUsuario,
  logarUsuario,
  obterUsuario,
  atualizarUsuario,
  listarCategorias,
} = require("../controladores/usuarios");

const {
  listarTransacao,
  cadastrarTransacao,
  detalharTransacao,
  atualizarTransacao,
  excluirTransacao,
  obterExtrato,
} = require("../controladores/transacoes");

const rotas = express();


rotas.use(express.json());

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", logarUsuario);

rotas.use(verificarUsuarioLogado);

rotas.get("/usuario", obterUsuario);
rotas.get("/categoria", listarCategorias);
rotas.get("/transacao", listarTransacao);
rotas.get("/transacao/extrato", obterExtrato);
rotas.get("/transacao/:id", detalharTransacao);
rotas.put("/usuario", atualizarUsuario);
rotas.put("/transacao/:id", atualizarTransacao);
rotas.post("/transacao", cadastrarTransacao);
rotas.delete("/transacao/:id", excluirTransacao);



module.exports = rotas;
