import Product from "../models/Product.js";

export async function getAllProductsService(){
    const produtos = await Product.find()
    return produtos
}

export async function createProductService(name,price,description,urlImage,category){
    const produtoCriado =await Product.create({name,price,description,urlImage,category})
    return produtoCriado
}


export async function updateProductService(id, updatedProduct) {
    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        return product
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getProductByIdService(id) {
    try {
        const product = await Product.findById(id);

        return product;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteProductService(id) {
    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new Error('Produto não encontrado');
        }

        return
    } catch (error) {
        throw new Error(error.message);
    }
}

