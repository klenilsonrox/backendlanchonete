import { Router } from "express";
import { createProducts, deleteProduct, getAllProducts, getProductsbyId, updateProducts } from "../controllers/productController.js";
import { authenticateToken } from "../controllers/userController.js";

const router= Router()

router.get("/products", getAllProducts)
router.post("/products", authenticateToken, createProducts)
router.get("/products/:id", getProductsbyId)
router.put("/products/:id", authenticateToken, updateProducts)
router.delete("/products/:id", authenticateToken, deleteProduct)

export default router