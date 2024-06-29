import Endereco from "../models/Endereco.js";


export async function getEnderecoService(){
    const endereco = await Endereco.find()
    return endereco
}


export async function createEnderecoService(rua,numero,bairro,complemento,referencia,userRef){
    const endereco = await Endereco.create({rua,numero,bairro,complemento,referencia,userRef})
    return endereco
}

export async function updateEnderecoService(id,updateFields){
    const updatedEndereco = await Endereco.findByIdAndUpdate(id, updateFields, { new: true });
    return updatedEndereco
}


export async function getEnderecoByUserService(userRef){
    const endereco = await Endereco.findOne({userRef})
    return endereco
}






