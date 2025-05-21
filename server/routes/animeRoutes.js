const express = require('express');
const router = express.Router();
const Anime = require('../models/Anime');

// Get all animes
router.get('/', async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one anime
router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create anime
router.post('/', async (req, res) => {
  const anime = new Anime(req.body);
  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update anime
router.put('/:id', async (req, res) => {
  try {
    const anime = await Anime.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json(anime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete anime
router.delete('/:id', async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json({ message: 'Anime deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 