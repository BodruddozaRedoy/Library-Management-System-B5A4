import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.models";
import { IBorrow } from "../interfaces/borrow.interface";

export const borrowRoutes = express.Router();

// create a borrow
borrowRoutes.post(
  "/borrow",
  async (req: Request<{}, {}, IBorrow>, res: Response) => {
    const body = req.body;
    try {
      if(!body){
        return res.status(404).json({
          success: false,
          message: "Book details not found",
        });
      }
      const book = await Book.findById(body.book);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      if (book.copies < body.quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough copies available",
        });
      }

      book.copies -= body.quantity;
      await book.save();

      await Book.updateAvailability(body.book.toString());

      const borrow = await Borrow.create(body);
      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error,
      });
      console.error(error);
    }
  }
);

// get borrowed books
borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get borrowed books",
      error
    });
  }
});

