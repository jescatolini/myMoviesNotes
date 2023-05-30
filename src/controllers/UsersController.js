const AppError = require('../utils/AppError');
const knex = require('../database');
const {  hash, compare } = require('bcrypt')

class UsersController {
  async index(req, res){
    const users = await knex('users')
    return res.json(users)
  }

  async create(req, res){
      const { name, email, password } = req.body

      try{
        const checkUserExists = await knex('users')
        .where('email', email)
        .first()
  
        if(checkUserExists){
          throw new AppError('Email already exists.')
        }
    
        const hashedPassword = await hash(password, 8)
    
        await knex('users').insert({
          name: name,
          email: email,
          password: hashedPassword
        })
    
        return res.status(201).json()

      } catch(err){
        console.error(err)
        return res.status(500).json({ 
          error: err
        });
      }
    }

  async update(req, res){
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    try{
      const [user] = await knex('users').where({id})

      if(!user){
        res.json('User not found')
      }
  
      user.name = name ?? user.name
      user.email = email ?? user.email
  
      if(password && !old_password){
        throw new AppError("Please enter old password to update new password!")
      }
  
      if(password && old_password){
        const checkOldPassword = await compare(old_password, user.password)
  
        if(!checkOldPassword){
          throw new AppError("The password does not match!")
        }
  
        user.password = await hash(password, 8)
      }
  
      await knex('users')
      .where({id})
      .update({
        name: name,
        email: email,
        password: user.password,
        updated_at: knex.fn.now()
      })
  
      return res.json()
    } catch(err){
      console.error(err)
        return res.status(500).json({ 
          error: err
        });
    }

    
  }
}

module.exports = UsersController