import User from "../models/User.js"
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/productService.js"

export async function getAllProducts(req,res){
    try {
        const produtos = await getAllProductsService()
        return res.status(200).json(produtos)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export async function createProducts(req, res) {
    const { name, price, description, urlImage, category } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Acesso negado. Usuário não é administrador" });
        }

        // Verifica se todos os campos estão preenchidos
        if (!name || !price || !description || !urlImage || !category) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        // Cria o produto associado ao usuário
        const produto = await createProductService(name,price,description,urlImage,category);

        return res.status(201).json({ produto, message: "Produto cadastrado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function updateProducts(req,res){
    const {id}= req.params
    const {name,price,description,urlImage,category}= req.body

    try {

        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Acesso negado. Usuário não é administrador" });
        }

        const produtoExist = await getProductByIdService(id)

        if(!produtoExist){
            return res.status(404).json({message:"produto não encontrado!"})
        }

        if(!name || !price || !description || !urlImage || !category ){
            return res.status(400).json({message:"preencha todos os campos"})
        }

        const prod = {name,price,description,urlImage}

        const produtoAtualizado = await updateProductService(id, prod)
        return res.status(200).json({produtoAtualizado, message:"produto atualizado com sucesso!"})

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export async function getProductsbyId(req,res){
    const {id}= req.params


    try {
      const product = await getProductByIdService(id)
      if(!product){
        return res.status(404).json({message:"produto não encontrado!"})
      }

        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}


export async function deleteProduct(req,res){
    const {id}= req.params


    try {
      const product = await getProductByIdService(id)
      if(!product){
        return res.status(404).json({message:"produto não encontrado!"})
      }

        await deleteProductService(id)

        return res.status(200).json({message:"produto deletado com sucesso!"})

    } catch (error) {
        return res.status(500).json(error.message)
    }
}