"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_models_1 = require("../models/borrow.models");
exports.borrowRoutes = express_1.default.Router();
// create a borrow
exports.borrowRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        if (!body) {
            return res.status(404).json({
                success: false,
                message: "Book details not found",
            });
        }
        const book = yield book_model_1.Book.findById(body.book);
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
        yield book.save();
        yield book_model_1.Book.updateAvailability(body.book.toString());
        const borrow = yield borrow_models_1.Borrow.create(body);
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error,
        });
        console.error(error);
    }
}));
// get borrowed books
exports.borrowRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooks = yield borrow_models_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get borrowed books",
            error
        });
    }
}));
