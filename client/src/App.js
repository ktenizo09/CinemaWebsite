import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieSearchResults from './components/MovieSearchResults';
import NavBar from './components/Navbar';



function App() {
  return (
    <>
      
      <BrowserRouter>
      <NavBar></NavBar>
        <Routes>
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/search" element={<MovieSearchResults />} />

        </Routes>
      </BrowserRouter>
    </>
  );

};



export default App
