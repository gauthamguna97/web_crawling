const cheerio = require("cheerio");
const axios = require('axios');
const baseUrl = "https://www.imdb.com";
const trmUrl = baseUrl+"/chart/top?ref_=nv_mv_250";

const fetchPage = async (url, n) => {
    try {
        const result = await axios.get(url);
        return result.data;
    } catch(err) {
        if (n === 0) throw err;
        console.log("fetchPage(): Waiting For 3 seconds before retrying the request.")
        await waitFor(3000);
        console.log(`Request Retry Attempt Number: ${7 - n} ====> URL: ${url}`)
        return await fetchPage(url, n - 1);
    }
};

const topRatedMovies = async () => {

  try {
   const html = await fetchPage(trmUrl, 6);
 
   const $ = cheerio.load(html);
 
   const topRatedMoviesMap = $('.lister-list > tr').map( async (index, element) => {
  
    let moviePoster = $(element).find('.posterColumn > a > img').attr('src');
    let movieName = $(element).find('.titleColumn > a').text();
    let movieDate = parseInt($(element).find('.titleColumn > span').text().slice(1, 5) || 0, 10);
    let movieRating = parseFloat($(element).find('.imdbRating > strong').text() || 0, 10);
    
    console.log("Created Promise for movie: "+ movieName);
 
    return {
     moviePoster,
     movieName,
     movieDate,
     movieRating
    }
   }).get();
  
   return Promise.all(topRatedMoviesMap);
  } catch (error) {
   throw error;
  }
 }


module.exports = { topRatedMovies }
