const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory book storage
let books = [];
let idCounter = 1;

// Routes

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET a single book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author)
    return res.status(400).json({ message: "Title and author are required" });

  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book
app.put("/books/:id", (req, res) => {
  const { title, author } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  const deleted = books.splice(bookIndex, 1);
  res.json({ message: "Book deleted", book: deleted[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
