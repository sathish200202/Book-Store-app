import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for get  all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Route for update a book
router.put("/:id", async (req, res) => {
  try {
    // Check if required fields are present
    const { title, author, publishyear } = req.body;
    if (!title || !author || !publishyear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishyear",
      });
    }

    // Extract ID from parameters
    const { id } = req.params;

    // Find and update the book
    const result = await Book.findByIdAndUpdate(id, req.body, { new: true });

    // Check if the book was found and updated
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Return updated book
    return res
      .status(200)
      .send({ message: "Book updated successfully", data: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Route for get a particular book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Route for post a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishyear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishyear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishyear: req.body.publishyear,
    };

    const book = await Book.create(newBook);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route for delete qa book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "book was deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
