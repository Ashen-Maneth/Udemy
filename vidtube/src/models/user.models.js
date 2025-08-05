/* 
id string pk
username string
email string
fullName string
avatar string
coverImage string
watchhistory ObjectId[] videos
password string
refreshToken string
createdAt Date
updatedAt Date
 */

import mongoose , {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullName : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String, // cloudinary url
            required : true
        },
        coverImage : {
            type : String
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            required : [true , "Password is required"],
        },
        refreshToken : {
            type : String
        },
    },
    {timestamps : true}
);

userSchema.pre("save" , async function(next) {
    if (this.modified("password")) return next()
    this.password = bcrypt.hash(this.password , 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName,  
    }, 
process.env.JWT_SECRET , 
{expiresIn : process.env.JWT_LIFETIME});
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id   
    }, 
process.env.JWT_REFRESH_SECRET , 
{expiresIn : process.env.JWT_REFRESH_LIFETIME});
}


export const User = mongoose.model("User" , userSchema)