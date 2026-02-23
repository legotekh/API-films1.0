import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import { type Movie } from "../types";
import { useMovies } from "../useMovies";

export function FavoritesPage() {
const { selectedMovie, setSelectedMovie, onMovieSelect } = useMovies();

const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("my-favorites");
    if (saved) return JSON.parse(saved);
    return [];
});

useEffect(() => {
    localStorage.setItem("my-favorites", JSON.stringify(favorites));
}, [favorites]);

function addToLike(film: Movie) {
    const newList = favorites.filter((item) => item.imdbID !== film.imdbID);
    setFavorites(newList);
}

return (
    <div className="favorites-section">
    <h2 className="section-title">Мої улюблені фільми 🍿</h2>

    {favorites.length === 0 ? (
        <div className="empty-state">
        <h3>Список порожній 😢</h3>
        <p>Повернись на головну сторінку та додай кілька фільмів!</p>
        </div>
    ) : (
        <div className="container">
        {favorites.map((movie) => (
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

    {selectedMovie && (
        <div className="overlay">
        <div className="modal">
            <h2>{selectedMovie.Title}</h2>
            <p>{selectedMovie.Plot}</p>
            <img src={selectedMovie.Poster} alt="Poster" />
            <button onClick={() => setSelectedMovie(null)}>Закрити ❌</button>
        </div>
        </div>
    )}
    </div>
);
}
