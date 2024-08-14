import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const getRecentCricket = asyncHandler(async (req, res) => {
    try {
        // const response = await axios.get(
        //   `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRICKET_API_KEY}&offset=1`
        // );
        const options = {
            method: "GET",
            url: "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
            headers: {
                "X-RapidAPI-Key": process.env.CRICKET_API_KEY,
                "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
            },
        };
        const response = await axios.request(options);

        if (response) {
            // console.log(response, "response");
            // const responseData = response.data.data;
            const responseData = response.data;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { responseData },
                        "Cricket API Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Cricket API Failed to fetch Data"));
        }
    } catch (error) {
        console.error("Error fetching Cricket:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching cricket API"));
    }
});
const getCricketPointsTable = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id,"getWordOfTheDayAPIFunc")
        const options = {
            method: "GET",
            url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${id}/points-table`,
            headers: {
                "X-RapidAPI-Key": process.env.CRICKET_API_KEY,
                "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
                "Content-Type": "application/json",
            },
        };
        const response = await axios.request(options);

        if (response) {
            const responseData = response.data;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { responseData },
                        "Points Table API Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Cricket API Failed to fetch Points Table"));
        }
    } catch (error) {
        console.error("Error fetching Points Table:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Points Table"));
    }
});
const getCricketNewsCB = asyncHandler(async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
            headers: {
                'x-rapidapi-key': process.env.CRICKET_API_KEY,
                'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        if (response) {
            const responseData = response.data;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { responseData },
                        "Cricket News Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Cricket API Failed to fetch News"));
        }
    } catch (error) {
        console.error("Error fetching News:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket News"));
    }
});
const getCricketRankings = asyncHandler(async (req, res) => {
    try {
        const { format, isWomen, category } = req.params;
        // console.log(id,"getWordOfTheDayAPIFunc")
        const params = { formatType: format };
        if (isWomen !== undefined) {
            params.isWomen = isWomen === "1" ? "1" : "0";
        }
        const options = {
            method: "GET",
            url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
            params: params,
            headers: {
                "x-rapidapi-key": process.env.CRICKET_API_KEY,
                "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
        };
        const response = await axios.request(options);

        if (response) {
            const responseData = response.data;
            responseData.format = format ? format : ""
            responseData.IsWomen = isWomen ? isWomen : ""
            responseData.category = category ? category : ""
            // console.log(responseData,"responseDataresponseData")
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { responseData },
                        "Ranking API Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Ranking API Failed to fetch Points Table"));
        }
    } catch (error) {
        console.error("Error fetching Rankings:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Rankings"));
    }
});
const getCricketImageCB = asyncHandler(async (req, res) => {
    const { query } = req.query;
    // console.log(query, "querytsssss");
    try {
        const options = {
            method: "GET",
            url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${query}/i.jpg`,
            params: { p: 'de', d: 'high' },
            headers: {
                'Content-Type': 'application/json',
                "x-rapidapi-key": process.env.CRICKET_API_KEY,
                "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            },
            responseType: "arraybuffer",
        };
        const response = await axios.request(options);

        // if (response) {
        //   let imageUrl = URL.createObjectURL(response.data);
        //   const responseData = imageUrl;
        //   return res
        //     .status(200)
        //     .json(
        //       new ApiResponse(
        //         200,
        //         { responseData },
        //         "Cricket API Image Fetched Successfully"
        //       )
        //     );
        // }
        if (response) {
            const buffer = Buffer.from(response.data, "binary");
            const base64Image = buffer.toString("base64");
            const imageUrl = `data:image/jpeg;base64,${base64Image}`;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { imageUrl },
                        "Cricket API Image Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Cricket API Image Failed to fetch Data"));
        }
    } catch (error) {
        console.error("Error fetching Cricket Image:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Image"));
    }
});


export {
    getRecentCricket,
    getCricketPointsTable,
    getCricketNewsCB,
    getCricketRankings,
    getCricketImageCB,
}