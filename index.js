import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/quiz", async (req, res) => {
  try {
    const { theme } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Génère 5 questions de quiz sur ${theme} en JSON avec question, options et réponse.`,
    });

    res.json(response.output_text);
  } catch (err) {
  console.error(err); // 👈 IMPORTANT
  res.status(500).json({ error: err.message });

  }
});

app.listen(3000, () => console.log("Serveur lancé"));