import { authenticateUserService, createUserService, getUserByEmailService, getUsersService, updateUserService } from "../services/userService.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const getAllUsers = async(req,res)=>{
    try {
       if(!req.user.isAdmin){
        return res.status(401).json({message:"você nao tem permissão para realizar essa ação"})
       }
        const users = await getUsersService()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error.message) 
    }
}


export async function createUser(req,res){
    let {username,email,password,isAdmin}= req.body
try {

    const userExist = await getUserByEmailService(email)
    if(userExist){
        return res.status(401).json({message:"usuário já cadastrado", status:401})
    }

    const passHash =bcrypt.hashSync(password,10)
    password=passHash
    const user = await createUserService(username,email,password,isAdmin)
   
    return res.status(201).json({user, message:"usuário cadastrado com sucesso"})
} catch (error) {
    return res.status(500).json(error.message) 
}
}


export async function updateUser(req,res){
    const {userId}= req.params
    try {
        const userAtt = await updateUserService(userId,req.body)
        return res.status(200).json({userAtt, message:"usuário atualizado com sucesso!"})
    } catch (error) {
        return res.status(500).json(error.message)  
    }
}

export async function getUserById(){
    const {userId}= req.params
    try {
        const userExist = await getUserById(userId)
        return res.status(200).json({userExist, message:"já existe um usuário cadastrado com esse email"})
    } catch (error) {
        return res.status(500).json(error.message)  
    } 
}

export async function getUserByemail(req,res){

    try {
      const user = req.user
      return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error.message)  
    } 
}

export async function Login(req, res) {
    const { email, password } = req.body;

    try {
        const { token, user } = await authenticateUserService(email, password);

        return res.status(200).json({ token, user, message: "Autenticação bem-sucedida" });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}


export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
}

