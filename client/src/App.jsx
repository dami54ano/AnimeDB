import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddAnime from './pages/AddAnime';
import Products from './pages/Products';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-anime" element={<AddAnime />} />
        <Route path="/products" element={<Products />} />      
      </Routes>
    </Router>
  );
};

export default App
;