import { type IBorrow, type IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api"}),
    tagTypes: ["Books", "Borrow"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["Books"],
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: '/books',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation<IBook, {_id: string, data: Partial<IBook>}>({
            query: ({_id, data}) => ({
                url: `/books/${_id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation<string, void>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"]
        }),
        createBorrow: builder.mutation<IBorrow, IBorrow>({
            query: (book) => ({
                url: "/borrow",
                method: "POST",
                body: book
            }),
            invalidatesTags: ["Books", "Borrow"]
        }),
        getBorrowedBooks: builder.query({
            query: () => "/borrow",
            providesTags: ["Borrow"]
        })
    })
})


export const {useGetBooksQuery,useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation, useCreateBorrowMutation, useGetBorrowedBooksQuery} = baseApi