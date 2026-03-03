import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function MovieDetails() {
    const [movie, setMovie] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams();
    const apikey = "8c16b35e";

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apikey}`);
                const data = await response.json();
                
                if (data.Response === "False") {
                    setError(data.Error);
                } else {
                    setMovie(data);
                }
            } catch (err) {
                console.log(err);
                setError('Помилка мережі');
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        if(movie !== null){
            document.title = movie.Title;
        }
    },[movie])

    return (
        <div style={{ color: 'white', padding: '20px' }}>
            <h2>ID: {id}</h2>
            {loading && <p>Завантаження...</p>}
            {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}
            {movie && 
                <div>
                    <img src={movie.Poster}/>
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <p>{movie.Plot}</p>
                </div>
            }
        </div>
    );
}