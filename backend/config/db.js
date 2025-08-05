const mongoose = require('mongoose');

const  constDB = async() => {
  try {
   await mongoose.connect(process.env.MONGO_URI, {});
   console.log("MongoDB connected")
  }
  catch (err) {
    console.error("Error connecting to mongodb", err);
    process.exit(1);
  }
    
};
module.exports = constDB;