import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input } from '@chakra-ui/react';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://book-club-example-2.onrender.com/api/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async () => {
    try {
      const response = await fetch('https://book-club-example-2.onrender.com/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        const addedBook = await response.json();
        setBooks([...books, addedBook.book]); // Update the state to include the new book
        setNewBook({ name: '', description: '', price: '', imageUrl: '' }); // Clear input fields
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`https://book-club-example-2.onrender.com/api/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks(books.filter(book => book._id !== id)); // Remove deleted book from state
        console.log('Book deleted successfully');
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl">Books</Text>
      <Box marginBottom="4">
        <Input placeholder="Name" value={newBook.name} onChange={e => setNewBook({ ...newBook, name: e.target.value })} />
        <Input placeholder="Description" value={newBook.description} onChange={e => setNewBook({ ...newBook, description: e.target.value })} />
        <Input placeholder="Price" type="number" value={newBook.price} onChange={e => setNewBook({ ...newBook, price: e.target.value })} />
        <Input placeholder="Image URL" value={newBook.imageUrl} onChange={e => setNewBook({ ...newBook, imageUrl: e.target.value })} />
        <Button colorScheme="teal" onClick={addBook}>Add Book</Button>
      </Box>
      {books.length > 0 ? (
        books.map(book => (
          <Box key={book._id} borderWidth="1px" borderRadius="lg" padding="4" marginBottom="4">
            <Text>{book.name}</Text>
            <Text>{book.description}</Text>
            <Text>Price: ${book.price}</Text>
            {book.imageUrl && <img src={book.imageUrl} alt={book.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
            <Button colorScheme="red" onClick={() => deleteBook(book._id)}>Delete</Button>
          </Box>
        ))
      ) : (
        <Text>No available books</Text>
      )}
    </Box>
  );
}

export default App;
