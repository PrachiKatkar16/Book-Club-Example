// routes/bookRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/book.model');
const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add a new book
router.post("/", async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
  
    try {
      const newBook = new Book({
        name,
        description,
        price,
        imageUrl, // Directly saving the image URL
      });
      await newBook.save();
      res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
