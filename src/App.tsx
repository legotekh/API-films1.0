import { useState,useEffect } from 'react'
import './index.css'
import MovieCard from './MovieCard';
import {type Movie} from './types'
import {useMovies} from './useMovies'

function App() {
  const {
        movies,
        searchFilm,
        loading,
        selectedMovie,
        showFavorites,
        setSearchFilm,
        setSelectedMovie,
        setShowFavorites,
        getMovie,
        onMovieSelect
    } = useMovies();



  const [favorites,setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('my-favorites');
    if(saved) return JSON.parse(saved);
    return [];
  })


  useEffect(() => {
    localStorage.setItem('my-favorites', JSON.stringify(favorites));
  },[favorites])

  function addToLike(film : Movie) {
    const isTrue = favorites.some(item => item.imdbID === film.imdbID);
    if(!isTrue) setFavorites([...favorites,film]);
    else{
      const newList = favorites.filter(item => item.imdbID !== film.imdbID);
      setFavorites(newList);
    };
  }

  return (
    <div className="app">
      {!selectedMovie && (
        <div>
          <h1>🎬 Кінопошук</h1>

        <div className="search">
          <input 
            placeholder="Введи назву (напр. Batman)"
            value={searchFilm}
            onChange={(e) => setSearchFilm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getMovie()}
          />
          <button onClick={getMovie}>Search</button>
        </div>
        {loading ? (
        <h2>Завантаження... ⏳</h2>
      ) : (
        <div className="container"> 
          {movies.map((movie) => { 
            const isFavorite = favorites.some(item => item.imdbID === movie.imdbID);          
            return <MovieCard
              key={movie.imdbID}
              movie = {movie}
              onMovieSelect = {onMovieSelect}
              addToLike = {addToLike}
              amIFav = {isFavorite}
              buttonLike = {true}
            />
          })}
        </div>
      )}
      </div>)}

      {selectedMovie && (
        <div className="overlay">
            
            <div className="modal">
                            
                <h2>{selectedMovie.Title}</h2>
                <p>{selectedMovie.Plot}</p>
                <img src={selectedMovie.Poster} />
                <button onClick={() => (setSelectedMovie(null))}>Закрити ❌</button>
                
            </div>

          </div>
      )}

        <button
        onClick={() => (setShowFavorites(true))}
        >Show fav</button>

        <button
        onClick={() => (setShowFavorites(false))}
        >Hide fav</button>


        {favorites.length > 0 && (
          <button
        onClick={() => (setFavorites([]))}
        >Clear all</button>
        )}


      {showFavorites && (
        <div className="favorites-section">
          
          {favorites.length === 0 ? (
            <p>empty list</p>
          ) : (
            <div className="container">
              {favorites.map(movie => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  buttonLike={true}
                  addToLike={addToLike}
                  amIFav={true}
                  onMovieSelect={onMovieSelect}
                />
              ))}
            </div>
          )}
          
        </div>
      )}

    </div>
  );
}

export default App;