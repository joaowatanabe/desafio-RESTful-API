const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../utilidades/senhaJwt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(404)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3)",
      [nome, email, senhaCriptografada]
    );
    const usuarioSemSenha = await pool.query(
      "select id, nome, email from usuarios where email = $1",
      [email]
    );

    return res.status(201).json(usuarioSemSenha.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: "Email informado ja existe" });
  }
};

const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount < 1) {
      return res.status(404).json({ mensagem: "Email ou senha invalida" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(404).json({ mensagem: "Email ou senha invalida" });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, senhaJwt, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const obterUsuario = (req, res) => {
  const { senha: _, ...usuarioObtido } = req.usuario;
  return res.status(200).json(usuarioObtido);
};

const atualizarUsuario = async (req, res) => {
  const id = req.usuario.id;

  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(401)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  try {
    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      "update usuarios set nome = $1, email = $2, senha = $3 where id = $4",
      [nome, email, senhaCriptografada, id]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json("Email informado ja existente");
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await pool.query("select * from categorias");

    return res.status(200).json(categorias.rows);
  } catch (error) {
    return res.status(404).json("Não encontrado");
  }
};

module.exports = {
  cadastrarUsuario,
  logarUsuario,
  obterUsuario,
  atualizarUsuario,
  listarCategorias,
};
