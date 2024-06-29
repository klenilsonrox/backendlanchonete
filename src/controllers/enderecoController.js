import { createEnderecoService, getEnderecoByUserService, updateEnderecoService } from "../services/enderecoService.js"

export async function getEndereco(req,res){
    const {id} = req.Params
    try {
       const endereco = await getEnderecoByUserService(id) 
       if(!endereco){
        return res.status(404).json({message:"Nenhum endereço cadastrado"})
       }
       return res.status(200).json(endereco)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export async function createEndereco(req,res){
    const {rua,numero,bairro,complemento,referencia,cidade} = req.body
    const userRef = req.user.id
    try {
       const endereco = await createEnderecoService(rua,numero,bairro,complemento,referencia,userRef,cidade) 
       return res.status(200).json(endereco)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export async function updateEnderecoUser(req,res){
    const {id}= req.params
    try {
        const enderecoUpdated = await updateEnderecoService(id,req.body)
        return res.status(200).json(enderecoUpdated)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

