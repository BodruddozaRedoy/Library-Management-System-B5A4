export interface IBook {
    _id?: string,
    title: string,
    genre: string,
    description: string,
    author: string,
    isbn: string,
    copies: number,
    available: boolean
}

export interface IBorrow {
    _id?: string,
    book: string,
    quantity: number,
    dueDate: string
}

export interface IBorrowObj {
    totalQuantity: number,
    book: {
        title: string,
        isbn: string
    }

}