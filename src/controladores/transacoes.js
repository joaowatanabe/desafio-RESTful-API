const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../utilidades/senhaJwt");

const listarTransacao = async (req, res) => {
  const idUsuario = req.usuario.id;
  const categoriasNomes = req.query.categorias;

  try {
    let pedidoSQL =
      "SELECT t.*, c.descricao AS categoria_nome FROM transacoes t LEFT JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1";
    const parametros = [idUsuario];

    if (categoriasNomes && categoriasNomes.length > 0) {
      const idsCategorias = await Promise.all(
        categoriasNomes.map(async (nomeCategoria) => {
          const { rows } = await pool.query(
            "SELECT id FROM categorias WHERE nome = $1",
            [nomeCategoria]
          );
          return rows[0]?.id;
        })
      );

      const idsCategoriasValidos = idsCategorias.filter((id) => id !== null);

      if (idsCategoriasValidos.length > 0) {
        const placeholders = idsCategoriasValidos
          .map((_, index) => `$${index + 2}`)
          .join(", ");
        pedidoSQL += ` AND categoria_id IN (${placeholders})`;
        parametros.push(...idsCategoriasValidos);
      } else {
        return res.status(200).json([]);
      }
    }

    const transacoes = await pool.query(pedidoSQL, parametros);

    return res.status(200).json(transacoes.rows);
  } catch (error) {
    return res.status(500).json("Erro ao listar transações.");
  }
};

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const usuario_id = req.usuario.id;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  if (tipo.toLowerCase() !== "entrada" && tipo.toLowerCase() !== "saida") {
    return res.status(404).json({
      mensagem: "Tipo definido é invalido, informar entrada ou saida!",
    });
  }

  try {
    const cadastroTrasacao = await pool.query(
      "INSERT INTO transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [descricao, valor, data, categoria_id, usuario_id, tipo]
    );

    const {
      rows: [transacaoCadastrada],
    } = cadastroTrasacao;
    const {
      rows: [categoria],
    } = await pool.query("SELECT descricao FROM categorias WHERE id = $1", [
      transacaoCadastrada.categoria_id,
    ]);

    const transacaoComCategoriaNome = {
      ...transacaoCadastrada,
      categoria_nome: categoria ? categoria.descricao : null,
    };

    return res.status(201).json(transacaoComCategoriaNome);
  } catch (error) {
    console.error("Erro ao cadastrar transação:", error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar transação." });
  }
};

const detalharTransacao = async (req, res) => {
  const { id } = req.params;
  const idUsuario = req.usuario.id;

  try {
    const transacaoDetalhada = await pool.query(
      "SELECT t.*, c.descricao AS categoria_nome FROM transacoes t LEFT JOIN categorias c ON t.categoria_id = c.id WHERE t.usuario_id = $1 AND t.id = $2",
      [idUsuario, id]
    );

    if (transacaoDetalhada.rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada" });
    }

    return res.status(200).json(transacaoDetalhada.rows);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Transação não encontrada");
  }
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const idUsuario = req.usuario.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res
      .status(404)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.status(404).json({
      mensagem: "Tipo definido é invalido, informar entrada ou saida!",
    });
  }

  try {
    const transacaoExiste = await pool.query(
      "select * from transacoes where id = $1",
      [id]
    );
    if (!transacaoExiste) {
      return res.status(404), json({ menssagem: "Transação não encontrada!" });
    }

    await pool.query(
      "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 AND usuario_id = $7",
      [descricao, valor, data, categoria_id, tipo, id, idUsuario]
    );
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(404).json("Você não tem acesso a essa transação.");
  }
};

const excluirTransacao = async (req, res) => {
  const { id } = req.params;
  const idUsuario = req.usuario.id;

  try {
    const resultado = await pool.query(
      "delete from transacoes where id = $1 AND usuario_id = $2 RETURNING id",
      [id, idUsuario]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json("Transação não encontrada ou já excluída.");
    }

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json("Erro ao excluir transação.");
  }
};

const obterExtrato = async (req, res) => {
  const usuario_id = req.usuario.id;

  let valorEntradaTotal = 0;
  let valorSaidaTotal = 0;

  try {
    const extratoUsuario = await pool.query(
      "select * from transacoes where usuario_id = $1",
      [usuario_id]
    );
    for (const movimentacao of extratoUsuario.rows) {
      if (movimentacao.tipo === "entrada") {
        valorEntradaTotal += movimentacao.valor;
      } else {
        valorSaidaTotal += movimentacao.valor;
      }
    }

    return res.status(200).json({
      entrada: valorEntradaTotal,
      saida: valorSaidaTotal,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json("Você não tem acesso a esse extrato.");
  }
};

module.exports = {
  listarTransacao,
  cadastrarTransacao,
  detalharTransacao,
  atualizarTransacao,
  excluirTransacao,
  obterExtrato,
};
