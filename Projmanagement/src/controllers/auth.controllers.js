import {User} from "../models/user.models.js";
import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
import {sendEmail} from "../utils/mail.js";

const genarateAccessAndRefreshTokens = asyncHandler(async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.genarateAccessToken();
        const refreshToken = user.genarateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error genarating tokens", []);
    }
});

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
            user?.username, 
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

export {registerUser}