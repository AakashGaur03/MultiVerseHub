import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const NEWS_API_KEYS = [
    process.env.NEWS_API_KEY1,
    process.env.NEWS_API_KEY2,
    process.env.NEWS_API_KEY3,
    process.env.NEWS_API_KEY4,
    process.env.NEWS_API_KEY5,
    process.env.NEWS_API_KEY6,
    process.env.NEWS_API_KEY7,
]


const getNews = asyncHandler(async (req, res) => {
    const { query } = req.query;
    let response;
    // console.log(query)
    for (let i = 0; i < NEWS_API_KEYS.length; i++) {
        try {
            response = await axios.get(
                `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEYS[i]}&q=${query}`
            );
            if (response.status !== 429) {
                break
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key...`);
            } else {
                console.error("Error fetching News:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching News"));
            }
        }
    }
    try {
        if (response) {
            const responseData = response.data;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { responseData },
                        "NEWS API Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "NEWS API Failed to fetch Data"));
        }
    } catch (error) {
        console.error("Error fetching News:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching News"));
    }
});

export {
    getNews
}