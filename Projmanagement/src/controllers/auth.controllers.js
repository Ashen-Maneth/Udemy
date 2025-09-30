import {User} from "../models/user.models.js";
import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
import {sendEmail} from "../utils/mail.js";
import { emailVerificationMailgenContent } from "../utils/mail.js";

const genarateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.genarateAccessToken();
        const refreshToken = user.genarateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error genarating tokens");
    }
};

const registerUser = asyncHandler(async (req, res ) => {
    const {email, username, password, role} = req.body

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exists", []);
    }

    const user = await User.create({
        email,
        password,
        username,
        role,
        isEmailVerified: false
    });

    const {unHashedToken, hashedToken, tokenExpiry} = user.genarateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email address",
        mailgenContent: emailVerificationMailgenContent(
            user.username, 
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        ),
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");
    if(!createdUser) {
         throw new ApiError(500, "Error creating user"); 
        }
        return res
        .status(201)
        .json(
            new ApiResponse(
                200, 
                {user: createdUser},
                "User registered successfully and email verification link sent to your email address"
            ),
        );

});

const login = asyncHandler(async(req,res) => {
    const {email, password, username} = req.body

    if(!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400,"User Does Not Exists");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid){
        throw new ApiError(400, "Invalid credentionls")
    }

    const {accessToken, refreshToken } = await genarateAccessAndRefreshTokens(user._id)
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");
    
    const options = {
        httpOnly: true,
        secure : true
    }

    return res 
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken" , refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User Logging Successfully"
        )
    )
});


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out Successfully"
        )
    )
});
    
export {registerUser ,login , logoutUser}