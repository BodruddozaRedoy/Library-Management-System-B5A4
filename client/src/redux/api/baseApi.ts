import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api"}),
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
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"]
        })
    })
})


export const {useGetBooksQuery,useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = baseApi