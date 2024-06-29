import { Router } from "express";
import { Login, authenticateToken, createUser, getAllUsers, getUserById, getUserByemail, updateUser } from "../controllers/userController.js";


const router = Router()

router.get("/users", authenticateToken, getAllUsers)
router.post("/users", createUser)
router.put("/users/:userId", authenticateToken, updateUser)
router.get("/users/:userId", getUserById)
router.get("/perfil", authenticateToken, getUserByemail)
router.post("/login", Login)

export default router