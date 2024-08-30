const { createHmac, randomBytes } = require("crypto");
const { Schema , model } = require("mongoose");
const { createTokenForUser } = require("../services/authentication")


const startupSchema = new Schema({
    fullName : {
        type : String , 
        required : true,
    } , 
    email : {
        type : String , 
        required : true,
        unique : true ,
    } ,
    salt : {
        type : String ,

    } ,
    password : {
        type : String , 
        required : true , 

    } ,
    profileImageURL : {
        type : String , 
        default : "/images/default.png"
    } , 


    role : {
        type : String , 
        enum : ["USER" , "ADMIN"],
        default : "USER" ,
    } ,
} , { timestamps : true }
);


//We use Hmac for Hashed the password
startupSchema.pre("save" , function(next) {
    const startup = this;

    if(!startup.isModified("password"))
    return;

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac("sha256" , salt)
    .update(startup.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();

});


startupSchema.statics.matchPasswordAndGenerateToken = async function({ email, password }) {
    try {
        // console.log('Looking for user with email:', email);

        const startup = await this.findOne({ email });
        
        if (!startup) throw new Error("User not found!");
        // console.log(startup)

        const salt = startup.salt;
        const hashedPassword = startup.password;

        const startupProvidedHash = createHmac("sha256", salt)
            .update(password)
            .digest("hex");

        if (hashedPassword !== startupProvidedHash) 
            throw new Error("Incorrect password");

        // console.log(startup);
        // return startup;

        const token = createTokenForUser(startup);
        return token;


    } catch (error) {
        // console.error("Error in matchPasswordAndGenerateToken:", error);
        throw error;
    }
};


const StartupUser = model("StartupUser" , startupSchema)


module.exports = StartupUser;