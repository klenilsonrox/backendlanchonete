import mongoose from "mongoose";


const mongo_url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@lanchonete.ac0wltw.mongodb.net/?retryWrites=true&w=majority&appName=lanchonete`

export async function connDB(){
    try{
        await mongoose.connect(mongo_url)
        console.log("servidor online")
    }catch(error){
        console.log(error)
    }
}