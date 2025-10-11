import {User} from "../models/user.models.js";
import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
import {sendEmail} from "../utils/mail.js";
import { emailVerificationMailgenContent } from "../utils/mail.js";
import jwt from "jsonwebtoken";

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

const getCurruntUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User Fetched Successfully"
        )
    )
});

const verifyEmail = asyncHandler(async (req, res) => {
    const {verificationToke} = req.params;

    if(!verificationToke) {
        throw new ApiError(400, "Verification token is required");
    }

    let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToke)
    .digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: {$gt: Date.now()}
    });

    if(!user) {
        throw new ApiError(400, "Invalid verification token");
    }

    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    user.isEmailVerified = true ;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                isEmailVerified : true
            },
            "Email Verified Successfully"
        )
    )
})

const resendEmailVerification = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);

    if(!user) {
        throw new ApiError(404, "User Does Not Exists");
    }

    if(user.isEmailVerified) {
        throw new ApiError(409, "Email Already Verified");
    }

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

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Email Verification Link Sent Successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

   if(!incomingRefreshToken) {
       throw new ApiError(400, "Unauthorized access token");
   }

   try {
       const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET) // verify the token
       const user = await User.findById(decodedToken?._Id);
        
       if(!user) {
           throw new ApiError(401, "invalid refresh token");
       }

       if(incomingRefreshToken !== user.refreshToken) {
           throw new ApiError(401, "Refresh token does not match");
       }

       const options = {
           httpOnly: true,
           secure : true
       }

       const {accessToken, refreshToken:newRefreshToken} = await genarateAccessAndRefreshTokens(user._id);

       user.refreshToken = newRefreshToken;
       await user.save();

       return res
       .status(200)
       .cookie("accessToken" , accessToken, options)
       .cookie("refreshToken" , newRefreshToken, options)
       .json(
           new ApiResponse(
               200,
               {accessToken, refreshToken: newRefreshToken},
               "Access Token Refreshed Successfully"
           )
       )
   } catch (error) {
       throw new ApiError(401, "invalid refresh token");
   }
})

const forgotPasswordRequest = asyncHandler(async (req, res) => {
    const {email} = req.body;
    
    const user = await User.findOne({email});

    if(!user) {
        throw new ApiError(404, "User Does Not Exists");
    }

    const {unHashedToken, hashedToken, tokenExpiry} = user.genarateTemporaryToken();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Please reset your password",
        mailgenContent: forgotPasswordMailgenContent(
            user.username, 
            `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
        ),
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Reset Link Sent Successfully"
        )
    )
})
const resetForgotPassword = asyncHandler(async (req, res) => { 
    const {resetToken} = req.params;
    const{newPassword} = req.body;

    let hashedToken= crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: {$gt : Date.now()},
        isEmailVerified: true
    })

    if(!user) {
        throw new ApiError(404, "Tocken is invalid or expired");
    }

    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    user.password = newPassword;

    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Reset Successfully"
        )
    )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {  
    const{oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordValid = user.isPasswordCorrect(oldPassword);

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid Current Password");
    }

    user.password = newPassword;

    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Changed Successfully"
        )
    )
})



    
export {
    registerUser ,
    login , 
    logoutUser , 
    getCurruntUser, 
    verifyEmail, 
    resendEmailVerification, 
    refreshAccessToken, 
    forgotPasswordRequest,
    resetForgotPassword,
    changeCurrentPassword
}; 
