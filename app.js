const express = require('express') //import the express library
const app = express()
const path = require('path')
const mongoose = require('mongoose') //import mongoose
//const url = 'mongodb+srv://Udaykiran:udaykiran@uday.uuhmz.mongodb.net/peopledb?retryWrites=true&w=majority'
const url = 'mongodb://localhost/peopledb' //url to connect to DB

const UserModel = require("./models/user") //importing the schema

const router = express.Router()
const port = process.env.PORT || 5000 //assigns the port 5000 if available

mongoose.connect(url, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true})
			.then(() => console.log("db connected..."))
			.catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended: true})) // these are to parse the body of request

// set the template engine
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")


//this endpoint renders the html form for user input

app.get('/', (req,res) => {
	res.render('index')
})

// this creates the document taking form data 
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
						

// this endpoint fetches all the users documents

app.get('/allusers', (req,res) => {
	UserModel.find({ }, (err,users) => {
		if (err)
			throw err
		
		res.json(users)

	})
})

// this is used to search a specific document 

app.get('/:name', (req,res) => {
	UserModel.find({ name: req.params.name }, (err,users) => {
		if (err)
			throw err
		res.json(users)

	})
})

//this updates a document with name parameter to search the document, and city paratment to assign a new value, it can be done for other fields also
app.patch('/update/:name/:city', (req,res) => {
	UserModel.updateOne({ name: req.params.name }, { $set: { city: req.params.city } }, (err,data) => {
		if (err)
			throw err

		res.end()
		console.log(data)
		

	})

})

//this can be used to delete a particular document by name in its URI

app.delete('/delete/:name', (req,res) => {
	UserModel.deleteOne({ name: req.params.name }, (err, data) => {
		if (err)
			throw err

		res.end()
		console.log(data)
	})
})

// listens to the server at the port assigned
app.listen(port, () => {
	console.log('server running at:' + port)
})