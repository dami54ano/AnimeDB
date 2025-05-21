import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx'; // Navbar importieren

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const animesPerPage = 9;

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/anime');
        setAnimes(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch animes. Please try again later.');
        console.error('Error fetching animes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  const filteredAnimes = animes.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || anime.genre.includes(selectedGenre);
    const matchesStatus = !selectedStatus || anime.status === selectedStatus;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const uniqueGenres = [...new Set(animes.flatMap(anime => anime.genre))];
  const uniqueStatuses = ['ongoing', 'completed', 'upcoming'];

  // Pagination
  const indexOfLastAnime = currentPage * animesPerPage;
  const indexOfFirstAnime = indexOfLastAnime - animesPerPage;
  const currentAnimes = filteredAnimes.slice(indexOfFirstAnime, indexOfLastAnime);
  const totalPages = Math.ceil(filteredAnimes.length / animesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar /> {/* Render the Navbar here */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search anime..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedGenre ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedGenre('')}
            >
              All Genres
            </button>
            {uniqueGenres.map(genre => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedGenre === genre ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => {
                  setSelectedGenre(genre);
                  setCurrentPage(1);
                }}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedStatus ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedStatus('')}
            >
              All Status
            </button>
            {uniqueStatuses.map(status => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedStatus === status ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAnimes.map(anime => (
            <Link
              key={anime._id}
              to={`/anime/${anime._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1"
            >
              {anime.imageUrl && (
                <img
                  src={anime.imageUrl}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{anime.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {anime.genre.map(g => (
                    <span
                      key={g}
                      className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">{anime.studio}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    anime.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                    anime.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {anime.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === number
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;