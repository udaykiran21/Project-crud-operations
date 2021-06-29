const mongoose = require("mongoose") //Importing mongoose
const Schema = mongoose.Schema

const UserSchema = new Schema({				//define the schema
	
	name: String, 	//declare the type for every key
	city: String,
	mobile: { type: Number, unique: true } //unique true makes sure that mobile number is unique for every entry
	
}) // timestamps enable us to include createdAt, updatedAt



module.exports = mongoose.model("users", UserSchema) //exporting the model, so that, it can be imported in controller handle