// displaying each page of movie, for going to the next and previous page
let page = 1;
// api for the (default) first page of popular movies, will change the page when requested
const api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=781b7d3d2fb2a8c59c1badceca94e795&page=";


// display the movies in the main section
const movieList = (movies) => {
    // initial the main section
    document.getElementById("movieSection").innerHTML = "";

    // display the info for every movie
    movies.forEach((movie) => { 
        // these variable names are taken from the api website, cannot be changed
        var { poster_path, title, vote_average, overview } = movie;

        var one_movie = document.createElement("div");
        one_movie.classList.add("movie");

        one_movie.innerHTML = `
            <img src="${"https://image.tmdb.org/t/p/w1280" + poster_path}"/>
            <div class="movie-title">
                <h2>${title}</h2>
            </div>
            <div class="description">
                <h2>${title}</h2>
                <h3 class="description_title">Description:</h3>    
                <h3 class="rating">${vote_average}</h3>
                <p class="overview">${overview}</p>
            <div>`;
        // add one movie in the main section each time
        document.getElementById("movieSection").appendChild(one_movie);
    });
};

async function getMovies(api_url) {
    let movies = await fetch(api_url);
    let data = await movies.json();
    movieList(data.results);
};

getMovies(api + page);


// search for the movie title
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const search_movie = document.getElementById("search").value;

  if (search_movie) {
    getMovies("https://api.themoviedb.org/3/search/movie?&api_key=781b7d3d2fb2a8c59c1badceca94e795&query=" + search_movie);
    search.value = "";
  }
});

// button to get to the previous page
function prevMovies() {
    console.log("previous button clicked");
    if(page != 1) {
        page -= 1;
        console.log(page);
        getMovies(api + page);
    }
}

// button to get to the next page
function nextMovies() {
    console.log("next button clicked");
    page += 1;
    console.log(page);
    getMovies(api + page);
}


/****************************************************

References:

1. the API, posters and descriptions of all movies got from here: https://developers.themoviedb.org/3/getting-started/introduction
2. forEach method: https://www.w3schools.com/jsref/jsref_foreach.asp
3. fetch API: https://www.w3schools.com/jsref/api_fetch.asp

*****************************************************/