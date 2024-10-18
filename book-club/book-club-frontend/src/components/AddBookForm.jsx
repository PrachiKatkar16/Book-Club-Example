import React, { useState } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';

const AddBookForm = ({ addBook }) => {
  const [book, setBook] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://book-club-example-2.onrender.com/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Book added successfully!');
        addBook(data);  // Update book list in parent component
      } else {
        alert('Failed to add the book');
      }
    } catch (error) {
      console.error("An error occurred while adding the book:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} padding="20px">
      <Input
        placeholder="Book Name"
        name="name"
        value={book.name}
        onChange={handleChange}
        mb="10px"
      />
      <Textarea
        placeholder="Description"
        name="description"
        value={book.description}
        onChange={handleChange}
        mb="10px"
      />
      <Input
        placeholder="Price"
        name="price"
        value={book.price}
        onChange={handleChange}
        mb="10px"
      />
      <Input
        placeholder="Image URL"
        name="imageUrl"
        value={book.imageUrl}
        onChange={handleChange}
        mb="10px"
      />
      <Button type="submit" colorScheme="teal">
        Add Book
      </Button>
    </Box>
  );
};

export default AddBookForm;
