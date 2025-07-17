import { IBook, IBookModel } from './../interfaces/book.interface';
import mongoose, { model } from "mongoose";


const BookSchema = new mongoose.Schema<IBook>({
    title: {type: String, required: true, trim: true},
    author: {type: String, required: true, trim: true},
    genre: {type: String, required: true, trim: true},
    isbn: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    copies: {type: Number, required: true, trim: true, min: [0, 'Copies must be a positive number']},
    available: {type: Boolean, required: true, trim: true}
},{
    versionKey: false,
    timestamps: true
})

BookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

BookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});


export const Book = model<IBook, IBookModel>("Book", BookSchema)