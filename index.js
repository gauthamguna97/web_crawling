const { connectToDB } = require('./db');
const { topRatedMovies } = require('./movieCrawl')

topRatedMovies()
  .then(results => {
   console.log("number of results: "+results.length);
   connectToDB(results).catch(console.error);
    console.log(results);
  }).catch(err => {
   console.log("Error while fetching top rated movies with error :::: "+err);
});


