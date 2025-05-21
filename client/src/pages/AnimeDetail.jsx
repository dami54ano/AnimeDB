import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/anime/${id}`);
        setAnime(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch anime details. Please try again later.');
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this anime? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`/api/anime/${id}`);
      navigate('/');
    } catch (error) {
      setError('Failed to delete anime. Please try again later.');
      console.error('Error deleting anime:', error);
    } finally {
      setIsDeleting(false);
    }
  };

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

  if (!anime) {
    return (
      <div className="text-center p-4">
        Anime not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {anime.imageUrl && (
          <div className="relative h-96">
            <img
              src={anime.imageUrl}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h1 className="text-3xl font-bold text-white">{anime.title}</h1>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  anime.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                  anime.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {anime.status.charAt(0).toUpperCase() + anime.status.slice(1)}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{anime.releaseYear}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{anime.episodes} Episodes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Studio:</span>
                <span className="font-medium">{anime.studio}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/edit-anime/${id}`)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {anime.genre.map(g => (
                <span
                  key={g}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Rating</h2>
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">{anime.rating}</span>
              </div>
              <div className="ml-4">
                <div className="text-gray-600">out of 10</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{anime.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Characters</h2>
            <div className="flex flex-wrap gap-2">
              {anime.characters.map(character => (
                <span
                  key={character}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {character}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail; 