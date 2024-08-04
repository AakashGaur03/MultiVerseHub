import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";


const getGamesSectionData = asyncHandler(async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://www.freetogame.com/api/games',
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
                        "Games Section Data Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Games API Failed to fetch Games"));
        }
    } catch (error) {
        console.error("Error fetching Games:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Games Section"));
    }
});
const getGamesSectionDataCategoryWise = asyncHandler(async (req, res) => {
    const { category="strategy",sortBy="release-date",platform="all" } = req.body
    try {
        const options = {
            method: 'GET',
            url: `https://www.freetogame.com/api/games?platform=${platform}&category=${category}&sort-by=${sortBy}`,
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
                        "Games Section Data Fetched Successfully"
                    )
                );
        } else {
            return res
                .status(400)
                .json(new ApiError(400, "Games API Failed to fetch Games"));
        }
    } catch (error) {
        console.error("Error fetching Games:", error);
        return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Games Section"));
    }
});

export {
    getGamesSectionData,
    getGamesSectionDataCategoryWise,
}