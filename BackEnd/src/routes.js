const express = require('express');
const router = express.Router();
const despesasController = require('./controllers/DespesasController');

router.get('/despesas', despesasController.index);
router.post('/despesas', despesasController.store);
router.put('/despesas/:id', despesasController.update);
router.delete('/despesas/:id', despesasController.delete);

router.get('/exportar-despesas/:ano/:mes', async (req, res) => {
  try {
    const { ano, mes } = req.params;
    const buffer = await despesasController.exportExpensesToExcel(mes, ano);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=despesas_${mes}_${ano}.xlsx`
    );
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao gerar a planilha Excel.');
  }
});

module.exports = router;
