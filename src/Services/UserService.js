import User from '../Entities/User.js'
import Observation from '../Entities/Observation.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '../db.js';

dotenv.config();

export async function registration(username, login, password) {
    let user_by_username = await User.findOne({ where: {username: username} })
    if(user_by_username != null) return {err: "Username занят", code: 400}

    let user_by_login = await User.findOne({ where: {login: login} })
    if(user_by_login != null) return {err: "Login занят",  code: 400}

    await User.create({
        username: username,
        password: password,
        login: login
    })

    return {}
}

export async function authentication(login, password) {
    let user = await User.findOne({ where: {login: login} })
   
    const query = 'SELECT check_password(:login, :password)'; 
    const result = await db.query(query, {replacements: {'login': login, 'password': password}});

    /*
    if(!user || user.password != password) {
        return {err: "Логин или пароль не верны", code: 400}
    }*/

    if(!user || !result) {
        return {err: "Логин или пароль не верны", code: 400}
    }

    const token = jwt.sign(
        { username: user.username, login: user.login }, 
        process.env.JWT_SECRET, 
        { expiresIn: '12h' }
      );
    
    return { token: token };
}

export async function getUserProfile(login) {
    let user = await User.findOne({where: {login: login}})

    if(!user) {
        return {err: "Пользователь не найден", code: 404}
    }

    let observations = await Observation.findAll({where: {author: login}})
    return {
        userInfo: { 
            username: user.username
        },
        observations: observations,
        is_owner: true
    }
}