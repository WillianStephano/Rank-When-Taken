const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { isValid, parseISO } = require("date-fns");

const app = express();
const PORT = 5000;

// Configurar CORS corretamente
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const dataPath = path.join(__dirname, "data", "results.json");

// Novo formato: { "YYYY-MM-DD": [results], ... }
const defaultDataStructure = {};

// Migrar dados antigos se necessário
const migrateOldData = (existingData) => {
  if (Array.isArray(existingData)) {
    const migratedData = {};
    existingData.forEach((item) => {
      const date = item.timestamp.split("T")[0];
      if (!migratedData[date]) migratedData[date] = [];
      migratedData[date].push(item);
    });
    return migratedData;
  }
  return existingData;
};

// Endpoint para salvar resultados (agrupado por data)
app.post("/api/results", (req, res) => {
  try {
    const { gameDate, ...newResult } = req.body;

    // Validação da data
    if (!/^\d{4}-\d{2}-\d{2}$/.test(gameDate)) {
      return res
        .status(400)
        .json({ error: "Formato de data inválido. Use YYYY-MM-DD" });
    }

    if (!isValid(parseISO(gameDate))) {
      return res.status(400).json({ error: "Data inválida" });
    }

    fs.readFile(dataPath, (err, data) => {
      try {
        let allData = JSON.parse(
          data.toString() || JSON.stringify(defaultDataStructure)
        );
        allData = migrateOldData(allData);

        if (!allData[gameDate]) allData[gameDate] = [];

        allData[gameDate].push({
          ...newResult,
          timestamp: new Date().toISOString(),
        });

        fs.writeFile(dataPath, JSON.stringify(allData, null, 2), (err) => {
          if (err) throw err;
          res.status(201).json({ date: gameDate, ...newResult });
        });
      } catch (error) {
        console.error("Erro no processamento:", error);
        res.status(500).json({ error: "Erro interno ao processar dados" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para obter datas disponíveis
app.get("/api/dates", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    try {
      let allData = JSON.parse(
        data.toString() || JSON.stringify(defaultDataStructure)
      );
      allData = migrateOldData(allData);
      const dates = Object.keys(allData).sort().reverse();
      res.json(dates);
    } catch (error) {
      res.status(500).json({ error: "Erro ao ler dados" });
    }
  });
});

// Endpoint para obter resultados por data
app.get("/api/results/:date", (req, res) => {
  const date = req.params.date;

  fs.readFile(dataPath, (err, data) => {
    try {
      let allData = JSON.parse(
        data.toString() || JSON.stringify(defaultDataStructure)
      );
      allData = migrateOldData(allData);
      const results = allData[date] || [];
      const sorted = results.sort((a, b) => b.totalScore - a.totalScore);
      res.json(sorted);
    } catch (error) {
      res.status(500).json({ error: "Erro ao ler dados" });
    }
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

  // Criar arquivo com estrutura correta se não existir
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify(defaultDataStructure, null, 2));
  }
});
