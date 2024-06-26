import { Router } from "express";
import { createEndereco, getEndereco, updateEnderecoUser } from "../controllers/enderecoController.js";
import { authenticateToken } from "../controllers/userController.js";

const routerEndereco = Router()

routerEndereco.get("/endereco", authenticateToken, getEndereco)
routerEndereco.post("/endereco", authenticateToken, createEndereco)
routerEndereco.put("/endereco/:id", authenticateToken, updateEnderecoUser)


export default routerEndereco