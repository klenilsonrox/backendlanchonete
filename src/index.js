import express from "express"
import cors from "cors"
import { connDB } from "./database/connDB.js"
import routerUsers from "./routes/userRoutes.js"
import routerProducts from "./routes/productRouter.js"
import routerEndereco from "./routes/enderecoRouter.js"

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api", routerUsers)
app.use("/api", routerProducts)
app.use("/api", routerEndereco)



connDB()

app.listen(port || 5000, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})