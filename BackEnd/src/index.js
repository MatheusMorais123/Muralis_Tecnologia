const express = require("express")
const app = express()
const routes = require("./routes")

const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
