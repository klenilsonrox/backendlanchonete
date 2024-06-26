import { Schema, model } from "mongoose";



const enderecoSchema = new Schema({
    rua:{
        type:String,
        required:true
    },
    numero:{
        type:String,
        required:true
    },
    bairro:{
        type:String,
        required:true
    },
    referencia:{
        type:String
    },
    complemento:{
        type:String
    },
    userRef:{
        type:String
    }
    
})

const Endereco = model("Endereco", enderecoSchema)
export default Endereco