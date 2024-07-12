// MAX PAGE THAT CAN GO UPTO IS 500
// It shows total_pages : 44927 but when enter number greater than 500 it comes in response
// "Invalid page: Pages start at 1 and max at 500. They are expected to be an integer."




// YOU CAN ACCESS TOP RATED ,POPULAR ,NOW PLAYING ,INFO ABOUT SINGLE MOVIE ,CREDITS, REVIEWS using axios method by changing url


// Movies

// const axios = require("axios");


// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer (AUTHORIZATION HEADER)'
//   }
// };

// fetch(url, options)
// axios(url, options)
// .then((response) => console.log(response.data))
// .catch((error) => console.error("error:" + error));



// // GENERES MOVIES
// const axios = require("axios");


// const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer (AUTHORIZATION HEADER)'
//   }
// };

// fetch(url, options)
// axios(url, options)
// .then((response) => console.log(response.data))
// .catch((error) => console.error("error:" + error));





// INFO ABOUT SINGLE MOVIE
// https://api.themoviedb.org/3/movie/786892?api_key=27466545a65659fcc5cb0e1571b23956

// CREDITS
// https://api.themoviedb.org/3/movie/786892/credits?api_key=27466545a65659fcc5cb0e1571b23956

// REVIEWS
// https://api.themoviedb.org/3/movie/786892/reviews?api_key=27466545a65659fcc5cb0e1571b23956




// GET API
// TOP RATED
// https://api.themoviedb.org/3/movie/top_rated?api_key=(API_KEY)

// POPULAR
// https://api.themoviedb.org/3/movie/popular?api_key=(API_KEY)

// NOW PLAYING
// https://api.themoviedb.org/3/movie/now_playing?api_key=(API_KEY)

// MOVIE SEARCHING
// https://api.themoviedb.org/3/search/movie?api_key=(API_KEY)&query=H






// TV

// const axios = require("axios");


// const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer (AUTHORIZATION HEADER)'
//   }
// };

// fetch(url, options)
// axios(url, options)
// .then((response) => console.log(response.data))
// .catch((error) => console.error("error:" + error));



// GENERES TV

// const axios = require("axios");


// const url = 'https://api.themoviedb.org/3/genre/tv/list?language=en';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer (AUTHORIZATION HEADER)'
//   }
// };

// fetch(url, options)
// axios(url, options)
// .then((response) => console.log(response.data))
// .catch((error) => console.error("error:" + error));




// INFO ABOUT SINGLE TV SHOW
// https://api.themoviedb.org/3/tv/20169?api_key=27466545a65659fcc5cb0e1571b23956

// CREDITS
// https://api.themoviedb.org/3/tv/20169/credits?api_key=27466545a65659fcc5cb0e1571b23956

// REVIEWS
// https://api.themoviedb.org/3/tv/20169/reviews?api_key=27466545a65659fcc5cb0e1571b23956




// ON THE AIR
// https://api.themoviedb.org/3/tv/on_the_air?api_key=(API_KEY)

// POPULAR
// https://api.themoviedb.org/3/tv/popular?api_key=(API_KEY)

// TOP RATED
// https://api.themoviedb.org/3/tv/top_rated?api_key=(API_KEY)

// TV SEARCH
// https://api.themoviedb.org/3/search/tv?api_key=(API_KEY)&query=H

// Airing Today
// https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1'


// Images of Movies
// https://api.themoviedb.org/3/movie/1022789/images

// Video of Movies
// https://api.themoviedb.org/3/movie/1022789/videos?language=en-US

// Images of Person
// https://api.themoviedb.org/3/person/person_id/images 

// Search Person
// https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1


// Images of TV Series
// https://api.themoviedb.org/3/tv/series_id/images 

// Video of TV Series
// 'https://api.themoviedb.org/3/tv/series_id/videos?language=en-US' \


// Images of TV Season
// https://api.themoviedb.org/3/tv/series_id/season/season_number/images

// Video of TV Season
// https://api.themoviedb.org/3/tv/series_id/season/season_number/videos?language=en-US

// Images of TV Episode
// https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number/images


// Video of TV Episode
// https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number/videos?language=en-US