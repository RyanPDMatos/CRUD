import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VendaMensal from "./VendaMensal.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.log("Erro ao conectar com o MongoDB", error);
  }
};

connectDB();

// CREATE
app.post("/vendas", async (req, res) => {
  try {
    const VendaMensal = await VendaMensal.create(req.body);
    res.json(VendaMensal);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// READ
app.get("/vendas", async (req, res) => {
  try {
    const VendaMensal = await VendaMensal.find();
    res.json(VendaMensal);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// UPDATE
app.put("/vendas/:id", async (req, res) => {
  try {
    const VendaMensal = await VendaMensal.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(vendaMensalAtualizada);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// DELETE
app.delete("/vendas/:id", async (req, res) => {
  try {
    const vendaMensalDeletada = await VendaMensal.findByIdAndDelete(
      req.params.id
    );
    res.json(vendaMensalDeletada);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
