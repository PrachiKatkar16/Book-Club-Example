import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const BookList = ({ books, deleteBook }) => {
  return (
    <Box>
      {books.length > 0 ? (
        books.map((book) => (
          <Box
            key={book._id}
            border="1px solid #ddd"
            padding="20px"
            margin="10px 0"
            textAlign="center"
          >
            <img
              src={book.imageUrl}
              alt={book.name}
              style={{ width: '150px', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <Text fontSize="xl" fontWeight="bold">{book.name}</Text>
            <Text>{book.description}</Text>
            <Text fontWeight="bold">${book.price}</Text>
            <Button
              colorScheme="red"
              mt="10px"
              onClick={() => deleteBook(book._id)}
            >
              Delete Book
            </Button>
          </Box>
        ))
      ) : (
        <Text>No books available.</Text>
      )}
    </Box>
  );
};

export default BookList;
