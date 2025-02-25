import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );

};



export default App
