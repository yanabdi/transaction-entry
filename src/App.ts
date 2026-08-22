import express from "express";
import path from "node:path";
import { TransactionRecord } from "../src/model/TransactionRecord.js";
import { transactionFacade } from "../src/controller/TransactionFacade.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "../src/frontend/public")));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/transactions", async (req, res) => {
  try {
    const result = await transactionFacade.addTransaction(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      res.status(400).json({ error: "Invalid year or month." });
      return;
    }

    const transactions =
      await transactionFacade.listTransactions(year, month);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    await transactionFacade.removeTransaction(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});