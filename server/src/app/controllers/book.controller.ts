import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();
// create a book
bookRoutes.post("/books", async (req: Request, res: Response) => {
  const body = req.body;

  try {
    if(!body){
      res.status(404).json({
      success: false,
      message: "Book details not found",
    });
    }
    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
    console.log(error);
  }
});

// get all books
bookRoutes.get("/books", async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit } = req.query as {
    filter?: string;
    sortBy?: string;
    sort?: string;
    limit?: string;
  };

  try {
    if(!req.query){
      res.status(404).json({
      success: false,
      message: "Query not found",
    });
    }
    const filterQuery = filter ? { genre: filter } : {};
    const sortField = sortBy || "createdAt";
    const sortOrder = sort?.toLowerCase() === "asc" ? 1 : -1;
    const resultLimit = limit ? parseInt(limit) : 10;

    const books = await Book.find(filterQuery)
      .sort({ [sortField]: sortOrder })
      .limit(resultLimit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
    console.error(error);
  }
});

// get book by book id
bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  // console.log(bookId);
  try {
    if(!bookId){
      res.status(404).json({
      success: false,
      message: "Book id not found",
    });
    }
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
    console.error(error);
  }
});

// update a book
bookRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { copies, ...rest } = req.body;

  try {
    if(!bookId || !copies){
      res.status(404).json({
      success: false,
      message: "Please provide required data",
    });
    }
    const updateQuery: any = { ...rest };
    
    if (typeof copies === 'number') {
      updateQuery.$inc = { copies };
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateQuery, {
      new: true,
      runValidators: true,
    });

    await Book.updateAvailability(bookId);

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
    console.error(error);
  }
});


// delete a book
bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    if(!bookId){
      res.status(404).json({
      success: false,
      message: "BookId not found",
    });
    }
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
    console.error(error);
  }
});


