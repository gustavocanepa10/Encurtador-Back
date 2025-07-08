
import { Router } from "express";
import axios from "axios"

const route = Router()


route.post("/encurtar", async (req, res) => {
  const { long_url } = req.body;

  if (!long_url) {
    return res.status(400).json({ error: "link não foi enviado" });
  }

  try {
    const response = await axios.post(
      "https://api-ssl.bitly.com/v4/shorten",
      { long_url },
      {
        headers: {
          Authorization: `Bearer ${process.env.BITLY_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Erro ao chamar Bitly:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});


export {route}