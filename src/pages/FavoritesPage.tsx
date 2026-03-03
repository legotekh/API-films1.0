import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import { type Movie } from "../types";
import { useNavigate } from "react-router-dom";

export function FavoritesPage() {

const Maps = useNavigate();

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
            onMovieSelect={() => Maps(`/movie/${movie.imdbID}`)}
            />
        ))}
        </div>
    )}
    </div>
);
}
