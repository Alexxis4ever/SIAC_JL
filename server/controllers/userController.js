const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../model/userModel")


//@Desc     Register user
//@Route    POST /api/users
//@Access   Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name,dni,email,password} = req.body

    if(!name || !dni || !email || !password){
        res.status(400)
        throw new Error('Please add all fiels')
    }

    // check if user exist
    const userExists = await User.findOne({dni})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    // salt valores aleatorios se agg a la contraseña antes de ser hasheada (contra)+salt osea pepepe29+salt =pepe29@+973G

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create User

    const user = await User.create({
        name,
        dni,
        email,
        password: hashedPassword

    })

    if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


//@Desc     Auth new user
//@Route    POST /api/users/login
//@Access   Public
const loginUser = asyncHandler(async(req,res)=>{

    const {dni,password} = req.body

    // check for user dni
    const user =  await User.findOne({dni})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            dni: user.dni,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    // res.json({message: 'Login User'})
})


//@Desc     Get data user
//@Route    GET /api/users/me
//@Access   Private
const getMe = asyncHandler(async(req,res)=>{
    const {_id,name,dni,email} = await User.findById(req.user.id)

    res.status(200).json({
        id : _id,
        name,
        dni,
        email
    })
})


//Generate Token
// si expira el token pide al user, volver a logearse
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '20d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
    
}