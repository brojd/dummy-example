var MoviesModule = (function() {
  function getMoviesFromLocalStorage() {
    var moviesFromLocalStorage = localStorage.getItem('movies');
    var moviesParsedToJS = JSON.parse(moviesFromLocalStorage);
    return moviesParsedToJS;
  }
  
  function deleteMovieFromLocalStorage(id) {
    var currentMovies = getMoviesFromLocalStorage();
    var newMovies = currentMovies.filter(function(elem) {
      if (elem.id !== id) {
        return elem;
      }
    });
    var moviesTransformedToJSON = JSON.stringify(newMovies);
    localStorage.setItem('movies', moviesTransformedToJSON);
  }

  function displayMoviesInTable() {
    var tableElem = document.querySelector('#movies-table');
    var movies = getMoviesFromLocalStorage();

    tableElem.innerHTML = '';

    for (var i = 0; i < movies.length; i++) {
      var row = createMovieRow(movies[i]);
      tableElem.appendChild(row);
    }
  }
  
  function createMovieRow(movie) {
    var row = document.createElement('tr');
    
    var titleTd = document.createElement('td');
    var yearTd = document.createElement('td');
    var genreTd = document.createElement('td');
    var imgTd = document.createElement('td');
    var buttonTd = document.createElement('td');
    var imgElem = document.createElement('img');
    var button = document.createElement('button');
    
    titleTd.innerText = movie.title;
    yearTd.innerText = movie.year;
    genreTd.innerText = movie.genre;
    imgElem.src = movie.imgSrc;
    button.innerText = 'Delete';
    button.addEventListener('click', function() {
      deleteMovieFromLocalStorage(movie.id);
      displayMoviesInTable()
    });
    
    imgTd.appendChild(imgElem);
    buttonTd.appendChild(button);
    row.appendChild(titleTd);
    row.appendChild(yearTd);
    row.appendChild(genreTd);
    row.appendChild(imgTd);
    row.appendChild(buttonTd);
    
    return row;
  }
  
  return {
    displayMoviesInTable: displayMoviesInTable
  }
})();
