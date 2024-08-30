const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");


const startupRoute = require("./routes/startup");



const mongoose = require("mongoose");



const app = express();
const PORT = 8080;


// DB Connection
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            serverSelectionTimeoutMS: 5000, // Optional: Adjust as needed
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error Connecting To MongoDB:", error.message);
    }
};

// Call the function to connect to MongoDB
connectToMongoDB();



//for Ejs
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

//for css
app.use(express.static('public'));


//middlewares
app.use(express.urlencoded({ extended: false }));

app.use(express.json());




app.get("/" , (req , res) => {
    res.render("home");
})


app.use('/startup', startupRoute);


app.listen(PORT  , ()=> {
    console.log(`Server Started at ${PORT}`);
      

})