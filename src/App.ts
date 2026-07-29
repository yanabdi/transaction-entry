import express from "express";
import path from "node:path";

const app = express();
const PORT = 4000;

app.use(express.static(path.join(import.meta.dirname, "../src/frontend/public")));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});