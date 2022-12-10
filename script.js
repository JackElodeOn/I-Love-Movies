let page = 1;
const api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=781b7d3d2fb2a8c59c1badceca94e795&page=";
const img_api = "https://image.tmdb.org/t/p/w1280";
const search_api = "https://api.themoviedb.org/3/search/movie?&api_key=781b7d3d2fb2a8c59c1badceca94e795&query=";


// display the movies in the main section
const movieList = (movies) => {
    document.getElementById("movieSection").innerHTML = "";

    // display the info for every movie
    movies.forEach((movie) => { 
        const { poster_path, title, vote_average, overview } = movie;

        const one_movie = document.createElement("div");
        one_movie.classList.add("movie");

        one_movie.innerHTML = `
            <img src="${img_api + poster_path}"/>
            <div class="movie-title">
                <h2>${title}</h2>
            </div>
            <div class="description">
                <h2>${title}</h2>
                <h3 class="description_title">Description:</h3>    
                <h3 class="rating">${vote_average}</h3>
                <p class="overview">${overview}</p>
            <div>`;
        document.getElementById("movieSection").appendChild(one_movie);
    });
};

const fetchMovies = async (api_url) => {
    const resp = await fetch(api_url);
    const respData = await resp.json();
    movieList(respData.results);
};

fetchMovies(api + page);


// search for the movie title
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const search_movie = document.getElementById("search").value;

  if (search_movie) {
    fetchMovies(search_api + search_movie);
    search.value = "";
  }
});

// button to get to the previous page
function prevMovies() {
    console.log("previous button clicked");
    if(page != 1) {
        page -= 1;
        console.log(page);
        fetchMovies(api + page);
    }
}

// button to get to the next page
function nextMovies() {
    console.log("next button clicked");
    page += 1;
    console.log(page);
    fetchMovies(api + page);
}