const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataPath = path.join(__dirname, "data", "results.json");

// Endpoint para salvar resultados
app.post("/api/results", (req, res) => {
  const newResult = {
    ...req.body,
    timestamp: new Date().toISOString(),
  };

  fs.readFile(dataPath, (err, data) => {
    const results = JSON.parse(data.toString() || "[]");
    results.push(newResult);

    fs.writeFile(dataPath, JSON.stringify(results, null, 2), (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).send(newResult);
    });
  });
});

// Endpoint para obter ranking
app.get("/api/ranking", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) return res.status(500).send(err);

    const results = JSON.parse(data.toString() || "[]");
    const sorted = results.sort((a, b) => b.totalScore - a.totalScore);
    res.json(sorted);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // Criar arquivo JSON se não existir
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]");
  }
});
