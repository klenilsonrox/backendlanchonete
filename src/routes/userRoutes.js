import { Router } from "express";
import { Login, authenticateToken, createUser, getAllUsers, updateUser } from "../controllers/userController.js";


const router = Router()

router.get("/users", getAllUsers)
router.post("/users", createUser)
router.put("/users/:userId", authenticateToken, updateUser)
router.post("/login", Login)

export default router