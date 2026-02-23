import { useState , useEffect } from 'react';
import { type Movie } from './types';

const apikey = "8c16b35e";

export  function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchFilm, setSearchFilm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    async function getMovie() {
    try {
    setLoading(true);
    setError('');
    const response = await fetch(`https://www.omdbapi.com/?s=${searchFilm}&apikey=${apikey}`);
    const data = await response.json();
    
    if (data.Search) {
        setMovies(data.Search);
    } else {
        setError(data.Error);
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

useEffect(() => {
    if(searchFilm.length < 3){
        return
    }
    const timer = setTimeout(() => {
        getMovie();
    },1000)
    return () => clearTimeout(timer);
},[searchFilm])

    return {
        movies,
        searchFilm,
        loading,
        selectedMovie,
        showFavorites,
        error,
        setSearchFilm,
        setSelectedMovie,
        setShowFavorites,
        getMovie,
        onMovieSelect
    }
}
