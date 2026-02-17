import { useState } from 'react';
import { type Movie } from './types';

const apikey = "8c16b35e";



export  function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchFilm, setSearchFilm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    async function getMovie() {
    try {
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?s=${searchFilm}&apikey=${apikey}`);
    const data = await response.json();
    
    if (data.Search) {
        setMovies(data.Search);
    } else {
        alert("Фільм не знайдено! 🤷‍♂️");
    }
    } catch (err) {
    console.log(err);
    } finally {
    setLoading(false);
    }
}


async function onMovieSelect(id : string) {
    
    try {
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apikey}`);
    const data = await response.json();
    setSelectedMovie(data);
    } catch (err) {
    console.log(err);
    } finally {
    setLoading(false);
    }
}

    return {
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
    }
}
