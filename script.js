let page = 1;
const api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=781b7d3d2fb2a8c59c1badceca94e795&page=" + {page};
const img_api = "https://image.tmdb.org/t/p/w1280";
const search_api = "https://api.themoviedb.org/3/search/movie?&api_key=781b7d3d2fb2a8c59c1badceca94e795&query=";

const movieSection = document.getElementById("movieSection");
const form = document.getElementById("form");
const search = document.getElementById("search");


const movieList = (movies) => {
  movieSection.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const one_movie = document.createElement("div");
    one_movie.classList.add("movie");

    one_movie.innerHTML = `
      <img src="${img_api + poster_path}"/>
      <div class="movie-title">
        <h3>${title}</h3>
        <span class="rating">${vote_average}</span>
      </div>
      <div class="description">
        <h4>Description:</h4>${overview}
      <div>`;
    movieSection.appendChild(one_movie);
  });
};

const fetchMovies = async (url) => {
    const resp = await fetch(url);
    const respData = await resp.json();
    movieList(respData.results);
};

fetchMovies(api);


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const search_movie = search.value;

  if (search_movie) {
    fetchMovies(search_api + search_movie);
    search.value = "";
  }
});

next.addEventListener("next", (event) => {
    event.preventDefault();
    page += 1;
    console.log(page);
    fetchMovies(api);
});