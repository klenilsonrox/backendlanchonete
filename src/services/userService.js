import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export async function getUsersService(){
    const users = await User.find()
    return users
}

export async function createUserService(username,email,password){
    const user = await User.create({
        username,
        email,
        password
    })
    return user
}

export async function getUserByEmailService(email){
    const user = await User.findOne({email})
    return user
}


export async function updateUserService(id, updateData){
    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    return updatedUser;
}

export async function getUserByIdService(id){
    const user = await User.findById(id)
    return user
}




export async function authenticateUserService(email, password) {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Email ou senha incorretos');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Email ou senha incorretos');
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            },
            process.env.SECRET_KEY,
            { expiresIn: '240d' }
        );

        return { token, user: { id: user._id, username: user.username, email: user.email, isAdmin:user.isAdmin } };
    } catch (error) {
        throw new Error(error.message);
    }
}

