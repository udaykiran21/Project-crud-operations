const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
//const url = 'mongodb+srv://Udaykiran:udaykiran@uday.uuhmz.mongodb.net/peopledb?retryWrites=true&w=majority'
const url = 'mongodb://localhost/peopledb'

const UserModel = require("./models/user")

const router = express.Router()
const port = process.env.PORT || 5000

mongoose.connect(url, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true})
			.then(() => console.log("db connected..."))
			.catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*app.engine('ejs', require('ejs').renderFile)*/
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")




app.get('/', (req,res) => {
	res.render('index')
})

app.post('/newuser', (req,res) => {

			const NewUser = new UserModel({
											name: req.body.name,
											city: req.body.city,
											mobile: req.body.mobile									
							})

				
			NewUser.save((error, data) => {
    			
				if(error) 
    				throw error
        		//res.send(savedUser)
        		console.log(data)
        		res.redirect('/')

			})
})
						



app.get('/allusers', (req,res) => {
	UserModel.find({ }, (err,users) => {
		if (err)
			throw err
		
		res.json(users)

	})
})

app.get('/:name', (req,res) => {
	UserModel.find({ name: req.params.name }, (err,users) => {
		if (err)
			throw err
		res.json(users)

	})
})

app.patch('/update/:name/:city', (req,res) => {
	UserModel.updateOne({ name: req.params.name }, { $set: { city: req.params.city } }, (err,data) => {
		if (err)
			throw err

		res.end()
		console.log(data)
		

	})

})


app.delete('/delete/:name', (req,res) => {
	UserModel.deleteOne({ name: req.params.name }, (err, data) => {
		if (err)
			throw err

		res.end()
		console.log(data)
	})
})


app.listen(port, () => {
	console.log('server running at:' + port)
})