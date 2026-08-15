import express from "express";
import path from "node:path";
import { TransactionRecord } from "../src/model/TransactionRecord.js";
import { transactionFacade } from "../src/controller/TransactionFacade.js";

const app = express();
const PORT = 4000;

app.use(express.static(path.join(import.meta.dirname, "../src/frontend/public")));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

//add transactions
//this is the routing for it, not the function. it can't be seen through user interface as of yet.
app.post("/transactions/:id", async (req, res) => {
    try {
        let reqDate = req.body.date;
        const transaction: TransactionRecord = {
            entry: 0, // TransactionFacade will assign this
            date: reqDate,
            category: req.body.category,
            amount: req.body.amount,
            name: req.body.name,
            vendor: req.body.vendor,
            desc: req.body.desc,
            notes: req.body.notes
        };
        const result = await transactionFacade.addTransaction(
            Number(String(reqDate.year) + String(reqDate.month)),
            transaction
        );

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: String(error) });
    }
});
