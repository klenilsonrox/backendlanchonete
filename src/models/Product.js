import { Schema, model } from "mongoose";



const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    urlImage:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
    
})

const Product = model("Product", productSchema)
export default Product