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