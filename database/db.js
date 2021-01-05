var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/product';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true },()=>{
	console.log("connected");
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));