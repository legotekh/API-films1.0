import { useState, useEffect } from "react";
import MovieCard from "../MovieCard";
import { type Movie } from "../types";
import { useMovies } from "../useMovies";
import { useNavigate } from 'react-router-dom';

export function Home() {

const {
    movies,
    searchFilm,
    loading,
    selectedMovie,
    error,
    setSearchFilm,
} = useMovies();

const navigate = useNavigate();

const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("my-favorites");
    if (saved) return JSON.parse(saved);
    return [];
});

useEffect(() => {
    localStorage.setItem("my-favorites", JSON.stringify(favorites));
}, [favorites]);

function addToLike(film: Movie) {
    const isTrue = favorites.some((item) => item.imdbID === film.imdbID);
    if (!isTrue) setFavorites([...favorites, film]);
    else {
    const newList = favorites.filter((item) => item.imdbID !== film.imdbID);
    setFavorites(newList);
    }
}

return (
    <div className="page-content">
    {!selectedMovie && (
        <>
        <div className="search">
            <input
            placeholder="Введи назву (напр. Batman)"
            value={searchFilm}
            onChange={(e) => setSearchFilm(e.target.value)}
            />
        </div>

        {loading ? (
            <h2>Завантаження... ⏳</h2>
        ) : error ? (
            <div style={{ color: "#ff4b4b", textAlign: "center" }}>
            <h2>❌ {error}</h2>
            </div>
        ) : (
            <div className="container">
            {movies.map((movie) => {
                const isFavorite = favorites.some(
                (item) => item.imdbID === movie.imdbID,
                );
                return (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onMovieSelect={() => navigate(`/movie/${movie.imdbID}`)}
                    addToLike={addToLike}
                    amIFav={isFavorite}
                    buttonLike={true}
                />
                );
            })}
            </div>
        )}
        </>
    )}
    </div>
);
}
