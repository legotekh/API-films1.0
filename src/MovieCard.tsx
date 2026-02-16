export interface Movie {
    Title : string;
    Year: string;
    imdbID: string;
    Poster: string;
    Plot?: string;
}

interface MovieCardProps {
    movie : Movie;
    onMovieSelect: (id: string) => void;
    addToLike: (film: Movie) => void;
    amIFav: boolean;
    buttonLike?: boolean;
}

export default function MovieCard({movie,onMovieSelect,addToLike,amIFav,buttonLike} : MovieCardProps) {
    return (
    <div>
        <div 
        className="movie"
        onClick={() => (onMovieSelect(movie.imdbID))}
        >
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title}/>
            </div>
            <div>
                <h3>{movie.Title}</h3>
            </div>
        </div>
        {buttonLike && (
        <button
            onClick={() => (addToLike(movie))}
        >
            {amIFav ? "💔 Remove" : "❤️ Like it"}
        </button>)}
    </div>
    )
}