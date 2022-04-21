const express = require('express')
const app = express()
const cors = require('cors')  
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/full-mern-stack')



app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
    await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,

        })

	res.json({ status: 'ok' })
    
	} catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'Duplicate email' })
}
})






app.post ('/api/login', async (req, res) => {
    const user = await User.findOne({
            
            email: req.body.email,
            password: req.body.password,

        })

    if (user){
       const token =jwt.sign({
         name:user.name,
         email:user.email,
       },'secret123'
       )


      return res.json({status:'ok', user: token })
    }else{
      return res.json({status:'error', user: false })
    }
        
})

app.get ('/read', async (req, res) => {
     User.find({}, (err,result) =>{
        if (err){
            return res.send(err)
          }else{
            return res.send(result)
          }
     })
    
        
})




app.put ('/update', async (req, res) => {
 const newPassword = req.body.newPassword
 const id= req.body.id

 try{
    await User.findById(id,(error,userToUpdate) =>{
      userToUpdate.password =newPassword
      userToUpdate.save()

    })
 }catch(err){
   console.log(err)
 }
 res.send('updated')
     
})

app.delete ('/delete/:id', async (req, res) => {
 
      const id =req.params.id
      await User.findByIdAndRemove(id).exec();
      res.send('item deleted')
 })

app.listen(1337, () => {
    console.log('Server started on 1337')
    
})

