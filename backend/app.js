const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');

//
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

//
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

app.get('/userData',async (req,res)=>{
  const data = await User.find();
  res.json({data:data});
})
app.post('/register',async (req,res)=>{
  const {name,email,password}=req.body;
   await User.create({
    email,name,password
  })
  res.json({status:'user created'});
})

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

  const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
  