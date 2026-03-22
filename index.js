import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route test
app.get("/", (req, res) => {
  res.send("Backend OK 🚀");
});

// Route quiz propre (JSON direct)
app.get("/api/quiz", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es une IA qui génère des quiz de football au format JSON strict.",
        },
        {
          role: "user",
          content: `Génère un quiz au format JSON STRICT:
{
  "question": "string",
  "choices": ["A", "B", "C", "D"],
  "answer": "string"
}`,
        },
      ],
    });

    let text = completion.choices[0].message.content;

    // Nettoyage (au cas où GPT ajoute du texte autour)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const quiz = JSON.parse(text);

    res.json({
      success: true,
      quiz: quiz,
    });
  } catch (error) {
  console.error("ERREUR COMPLETE :", error);

  res.status(500).json({
    success: false,
    error: error.message,
  });
}
});

// Port pour Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur lancé sur le port " + PORT);
});