import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", ""); // check if the accessToken is in the cookies or in the header

    if(!token) {
        throw new ApiError(401, "Unauthorized access token");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // verify the token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry"); // find the user in the database 
        
        if(!user) {
            throw new ApiError(401, "invalid access token");
        }

        req.user = user;
        next();

    }catch (error) {
        throw new ApiError(401, "invalid access token");
    }
})