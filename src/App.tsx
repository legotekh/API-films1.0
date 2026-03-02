import './index.css';
import { Link, Route, Routes } from 'react-router-dom';
import { FavoritesPage } from './pages/FavoritesPage';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Кінопошук</h1>
        <nav className="navbar">
          <Link to='/home' className="nav-link">🏠 Головна</Link>
          <Link to='/favourites' className="nav-link">💛 Улюблені</Link>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/favourites' element={<FavoritesPage />} />
        <Route path='/movie/:id' element={<MovieDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;