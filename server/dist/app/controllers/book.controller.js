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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// create a book
exports.bookRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        if (!body) {
            res.status(404).json({
                success: false,
                message: "Book details not found",
            });
        }
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Validation failed",
            error: error,
        });
        console.log(error);
    }
}));
// get all books
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort, limit } = req.query;
    try {
        if (!req.query) {
            res.status(404).json({
                success: false,
                message: "Query not found",
            });
        }
        const filterQuery = filter ? { genre: filter } : {};
        const sortField = sortBy || "createdAt";
        const sortOrder = (sort === null || sort === void 0 ? void 0 : sort.toLowerCase()) === "asc" ? 1 : -1;
        const resultLimit = limit ? parseInt(limit) : 10;
        const books = yield book_model_1.Book.find(filterQuery)
            .sort({ [sortField]: sortOrder })
            .limit(resultLimit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
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
// get book by book id
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    // console.log(bookId);
    try {
        if (!bookId) {
            res.status(404).json({
                success: false,
                message: "Book id not found",
            });
        }
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
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
// update a book
exports.bookRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const _a = req.body, { copies } = _a, rest = __rest(_a, ["copies"]);
    try {
        if (!bookId || !copies) {
            res.status(404).json({
                success: false,
                message: "Please provide required data",
            });
        }
        const updateQuery = Object.assign({}, rest);
        if (typeof copies === 'number') {
            updateQuery.$inc = { copies };
        }
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updateQuery, {
            new: true,
            runValidators: true,
        });
        yield book_model_1.Book.updateAvailability(bookId);
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error,
        });
        console.error(error);
    }
}));
// delete a book
exports.bookRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        if (!bookId) {
            res.status(404).json({
                success: false,
                message: "BookId not found",
            });
        }
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
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
