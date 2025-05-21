import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAnime = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    episodes: '',
    rating: '',
    characters: '',
    studio: '',
    imageUrl: '',
    description: '',
    status: 'completed',
    releaseYear: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.genre.trim()) newErrors.genre = 'At least one genre is required';
    if (!formData.episodes || formData.episodes < 1) newErrors.episodes = 'Episodes must be at least 1';
    if (!formData.rating || formData.rating < 0 || formData.rating > 10) newErrors.rating = 'Rating must be between 0 and 10';
    if (!formData.characters.trim()) newErrors.characters = 'At least one character is required';
    if (!formData.studio.trim()) newErrors.studio = 'Studio is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.releaseYear || formData.releaseYear < 1900 || formData.releaseYear > new Date().getFullYear()) {
      newErrors.releaseYear = 'Release year must be valid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Convert comma-separated strings to arrays
      const animeData = {
        ...formData,
        genre: formData.genre.split(',').map(g => g.trim()),
        characters: formData.characters.split(',').map(c => c.trim()),
        episodes: parseInt(formData.episodes),
        rating: parseFloat(formData.rating),
        releaseYear: parseInt(formData.releaseYear),
      };

      await axios.post('/api/anime', animeData);
      navigate('/');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || 'Error adding anime. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Anime</h1>
      
      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genres (comma-separated)</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Action, Adventure, Fantasy"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.genre ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Episodes</label>
            <input
              type="number"
              name="episodes"
              value={formData.episodes}
              onChange={handleChange}
              min="1"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.episodes ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.episodes && <p className="text-red-500 text-sm mt-1">{errors.episodes}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.rating ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Characters (comma-separated)</label>
          <input
            type="text"
            name="characters"
            value={formData.characters}
            onChange={handleChange}
            placeholder="e.g. Character 1, Character 2, Character 3"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.characters ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.characters && <p className="text-red-500 text-sm mt-1">{errors.characters}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Studio</label>
          <input
            type="text"
            name="studio"
            value={formData.studio}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.studio ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.studio && <p className="text-red-500 text-sm mt-1">{errors.studio}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.imageUrl ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.releaseYear ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.releaseYear && <p className="text-red-500 text-sm mt-1">{errors.releaseYear}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Anime'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnime; 