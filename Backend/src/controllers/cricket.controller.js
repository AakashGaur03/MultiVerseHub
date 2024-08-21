import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const CRICKET_API_KEYS = [
    process.env.CRICKET_API_KEY1,
    process.env.CRICKET_API_KEY2,
    process.env.CRICKET_API_KEY3,
    process.env.CRICKET_API_KEY4,
    process.env.CRICKET_API_KEY5,
    process.env.CRICKET_API_KEY6,
]

const getRecentCricket = asyncHandler(async (req, res) => {
    let url = `https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent`
    let response;
    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            const options = {
                method: "GET",
                url: url,
                headers: {
                    "X-RapidAPI-Key": CRICKET_API_KEYS[i],
                    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
                },
            };
            response = await axios.request(options);
            if (response.status !== 429) {
                break
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Cricket Data...`);
            } else {
                console.error("Error fetching Cricket Data:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket Data"));
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
    const { id } = req.params; // Make sure 'id' is coming from req.query if it's a query parameter
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${id}/points-table`;
    let response;

    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            const options = {
                method: "GET",
                url: url,
                headers: {
                    "X-RapidAPI-Key": CRICKET_API_KEYS[i],
                    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
                    "Content-Type": "application/json",
                },
            };

            response = await axios.request(options);

            if (response.status === 200) {
                break; // Successfully fetched data, exit loop
            } else if (response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Points Table...`);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Points Table...`);
            } else {
                console.error("Error fetching Cricket Points Table Data:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket Points Table Data"));
            }
        }
    }

    try {
        if (response && response.status === 200) {
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
        console.error("Error processing Points Table:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while processing Points Table"));
    }
});

const getCricketNewsCB = asyncHandler(async (req, res) => {
    let url = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index'
    let response;
    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            const options = {
                method: "GET",
                url: url,
                headers: {
                    "X-RapidAPI-Key": CRICKET_API_KEYS[i],
                    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
                },
            };
            response = await axios.request(options);
            if (response.status !== 429) {
                break
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key News...`);
            } else {
                console.error("Error fetching Cricket News Data:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket News Data"));
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
    const { format, isWomen, category, prevData } = req.body;
    const responseName = `${format}${isWomen}${category}`;

    // Return cached data if available
    if (prevData && prevData[responseName]) {
        const structuredResponse = {
            responseData: {
                ...prevData,
            }
        };
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    structuredResponse,
                    "Ranking API Fetched Successfully As Data Exists"
                )
            );
    }

    const params = { formatType: format };
    if (isWomen == 1) {
        params.isWomen = isWomen;
    }

    let response;

    // Try each API key until one works or all fail
    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            const options = {
                method: "GET",
                url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
                params: params,
                headers: {
                    "x-rapidapi-key": CRICKET_API_KEYS[i],
                    "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
                },
            };

            response = await axios.request(options);

            if (response.status === 200) {
                break; // Successfully fetched data, exit loop
            } else if (response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Rankings...`);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Rankings...`);
            } else {
                console.error("Error fetching Cricket Rankings Data:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket Rankings Data"));
            }
        }
    }

    // Check if we got a response
    if (response && response.status === 200) {
        const responseData = {
            ...response.data,
            format: format || "",
            IsWomen: isWomen || "",
            category: category || ""
        };

        const structuredResponse = {
            responseData: {
                ...prevData,
                [responseName]: responseData
            }
        };

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    structuredResponse,
                    "Ranking API Fetched Successfully"
                )
            );
    } else {
        return res
            .status(400)
            .json(new ApiError(400, "Ranking API Failed to fetch Points Table"));
    }
});

const getCricketImageCB = asyncHandler(async (req, res) => {
    const { query } = req.query;
    let response;

    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            const options = {
                method: "GET",
                url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${query}/i.jpg`,
                params: { p: 'de', d: 'high' },
                headers: {
                    'Content-Type': 'application/json',
                    "x-rapidapi-key": CRICKET_API_KEYS[i],
                    "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
                },
                responseType: "arraybuffer",
            };

            response = await axios.request(options);

            if (response.status === 200) {
                break; // Successfully fetched data, exit loop
            } else if (response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Image...`);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Image...`);
            } else {
                console.error("Error fetching Cricket Image Data:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket Image Data"));
            }
        }
    }

    try {
        if (response && response.status === 200) {
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
        console.error("Error processing Cricket Image:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while processing Image"));
    }
});

const getCricketSearchPlayer = asyncHandler(async (req, res) => {
    const { playeraName } = req.body; // Corrected typo from 'playeraName' to 'playerName'
    let response;

    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            const options = {
                method: 'GET',
                url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search',
                params: { plrN: playeraName },
                headers: {
                    'x-rapidapi-key': CRICKET_API_KEYS[i], // Use the correct API key from the list
                    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            };

            response = await axios.request(options);

            if (response.status === 200) {
                break; // Successfully fetched data, exit the loop
            } else if (response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key for Player Search...`);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key for Player Search...`);
            } else {
                console.error("Error fetching Cricket Player Data:", error);
                return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket Player Data"));
            }
        }
    }

    try {
        if (response && response.status === 200) {
            const responseData = response.data;
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { responseData },
                        "Player's Info Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Player Info API Failed to fetch data"));
        }
    } catch (error) {
        console.error("Error processing Player info:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while processing Player Info"));
    }
});

const getCricketPlayerInfo = asyncHandler(async (req, res) => {
    const { playerId ,prevData } = req.body;
    if (prevData && prevData[playerId]) {
        const structuredResponse = {
            responseData: {
                ...prevData,
            }
        };
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    structuredResponse,
                    "Player Info API Fetched Successfully As Data Exists"
                )
            );
    }
    const urls = [
        `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}/career`,
        `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}/bowling`,
        `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}/batting`,
        `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}`,
    ];

    const options = {
        method: "GET",
        headers: {
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    for (let i = 0; i < CRICKET_API_KEYS.length; i++) {
        try {
            // Assign the current API key to the options
            options.headers['x-rapidapi-key'] = CRICKET_API_KEYS[i];

            // Make all requests concurrently using Promise.all
            const [response1, response2, response3, response4] = await Promise.all(urls.map(url => axios.request({ ...options, url })));

            // Check if all responses are successful
            if (response1 && response2 && response3 && response4) {
                const responseData = {
                    career: response1.data,
                    bowling: response2.data,
                    batting: response3.data,
                    info: response4.data
                };

                const structuredResponse = {
                    responseData: {
                        ...prevData,
                        [playerId]: responseData
                    }
                };

                // Send successful response with aggregated data
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            structuredResponse,
                            "Player Info API Fetched Successfully"
                        )
                    );
            } else {
                console.warn(`API key ${i + 1} failed, switching to next key Info...`);
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn(`API key ${i + 1} rate limited, switching to next key Player Info...`);
            } else {
                console.error("Error fetching Player info:", error.message);
                // If it's an error unrelated to rate limits, break the loop and return an error response
                return res.status(500).json(new ApiError(500, "Error occurred while fetching Player Info"));
            }
        }
    }

    // If all API keys fail, return a 400 response
    return res.status(400).json(new ApiError(400, "Player Info API failed to fetch Data after all keys"));
});



export {
    getRecentCricket,
    getCricketPointsTable,
    getCricketNewsCB,
    getCricketRankings,
    getCricketImageCB,
    getCricketSearchPlayer,
    getCricketPlayerInfo,
}