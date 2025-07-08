import express from "express"
import dotenv from 'dotenv';
import cors from "cors"

import { route } from "./src/routes/route.js";



const app = express()

app.use(cors())


dotenv.config(); 
console.log("Token Bitly:", process.env.BITLY_TOKEN);

app.use(express.json())



app.use(route)



const PORT = 3333



app.listen(PORT,() => console.log(`server rodando na porta ${PORT}`))

