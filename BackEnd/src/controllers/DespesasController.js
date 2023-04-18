const db = require("../db");
const axios = require("axios");
//const Excel = require("exceljs");
const ExcelJS = require("exceljs/dist/es5/exceljs.browser");

module.exports = {
  async exportExpensesToExcel(month, year) {
    const conn = await db.connect();
    const query = `SELECT * FROM despesas WHERE MONTH(data_compra) = ? AND YEAR(data_compra) = ?`;
    const [rows] = await conn.query(query, [month, year]);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Despesas');

    // Cabeçalhos da planilha
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Valor', key: 'valor', width: 15 },
      { header: 'Data', key: 'data_compra', width: 20 },
      { header: 'Descrição', key: 'descricao', width: 30 },
      { header: 'Tipo de Pagamento', key: 'tipo_pagamento_id', width: 25 },
      { header: 'Categoria', key: 'categoria_id', width: 20 },
      { header: 'Endereço', key: 'endereco', width: 50 }
    ];

    // Adiciona as despesas à planilha
    rows.forEach(row => {
      worksheet.addRow({
        id: row.id,
        valor: row.valor,
        data_compra: row.data_compra.toISOString(),
        descricao: row.descricao,
        tipo_pagamento_id: row.tipo_pagamento_id,
        categoria_id: row.categoria_id,
        endereco: row.endereco
      });
    });

    // Retorna o arquivo Excel como buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  },

  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const conn = await db.connect();
      const [rows] = await conn.query('SELECT * FROM despesas LIMIT ?, ?', [offset, parseInt(limit)]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ocorreu um erro ao listar as despesas.');
    }
  },

  async store(req, res) {
    try {
      const { valor, data_compra, descricao, tipo_pagamento_id, categoria_id, cep, numero_estabelecimento } = req.body;
      const conn = await db.connect();

      // Busca os dados do endereço através do CEP
      const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      // Monta o endereço completo com o número do estabelecimento
      const enderecoCompleto = `${endereco.data.logradouro}, ${numero_estabelecimento} - ${endereco.data.bairro}, ${endereco.data.localidade} - ${endereco.data.uf}`;

      const query = "INSERT INTO despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id, endereco) VALUES (?, ?, ?, ?, ?, ?)";

      // Convertendo a data de compra para o formato aceito pelo MySQL
      const date = new Date(data_compra).toISOString().slice(0, 19).replace('T', ' ');

      const [result] = await conn.query(query, [valor, date, descricao, tipo_pagamento_id, categoria_id, enderecoCompleto]);
      res.json({ id: result.insertId, ...req.body, endereco: enderecoCompleto });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const conn = await db.connect();
      const query = "DELETE FROM despesas WHERE id = ?";
      const [result] = await conn.query(query, [id]);
      if (result.affectedRows > 0) {
        res.json({ message: `Despesa com id ${id} removida com sucesso!` });
      } else {
        res.status(404).json({ error: "Despesa não encontrada" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const { valor, data_compra, descricao, tipo_pagamento_id, categoria_id, cep, numero_estabelecimento } = req.body;
      const { id } = req.params;

      const conn = await db.connect();

      // Busca os dados do endereço através do CEP
      const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      // Monta o endereço completo com o número do estabelecimento
      const enderecoCompleto = `${endereco.data.logradouro}, ${numero_estabelecimento} - ${endereco.data.bairro}, ${endereco.data.localidade} - ${endereco.data.uf}`;

      const query = "UPDATE despesas SET valor = ?, data_compra = ?, descricao = ?, tipo_pagamento_id = ?, categoria_id = ?, endereco = ? WHERE id = ?";

      // Convertendo a data de compra para o formato aceito pelo MySQL
      const date = new Date(data_compra).toISOString().slice(0, 19).replace('T', ' ');

      await conn.query(query, [valor, date, descricao, tipo_pagamento_id, categoria_id, enderecoCompleto, id]);
      res.json({ id, ...req.body, endereco: enderecoCompleto });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};