import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

/*

// for this we use the asyncHandler

const healthCheck = async (rq, res , next) => {
    try {
        const user = await getUserFromDB();
        res
        .status(200)
        .json(new ApiResponse(200, {message: "Server is running"}));
    } catch (error) {
        next(err);
    }
}
*/

const healthCheck = asyncHandler(async (rq, res) => {
    res
    .status(200)
    .json(new ApiResponse(200, {message: "Server is running"}));
})


export {healthCheck}