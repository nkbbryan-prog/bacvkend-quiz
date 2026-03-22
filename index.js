import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 OpenAI config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🧪 Route test
app.get("/", (req, res) => {
  res.send("Backend OK 🚀");
});

// 🧠 Route quiz
app.get("/api/quiz", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Tu es une IA qui génère des quiz de football.",
        },
        {
          role: "user",
          content:
            "Génère une question de quiz sur le football avec 4 choix et indique la bonne réponse au format JSON.",
        },
      ],
    });

    const response = completion.choices[0].message.content;

    res.json({
      quiz: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

// 🌍 PORT (IMPORTANT POUR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur lancé sur le port " + PORT);
});