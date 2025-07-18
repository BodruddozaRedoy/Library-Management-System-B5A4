import BookCard from "@/components/BookCard";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

export default function AllBooks() {
  const { data, isLoading, isSuccess } = useGetBooksQuery(undefined)
  console.log(data)
  return (
    <div className="bg-background p-10 rounded-lg shadow-md">
      <div>
        <h1 className="font-bold text-2xl">AllBooks</h1>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          data?.data?.map((book: IBook, index: number) => (
            <BookCard key={index} book={book} />
          ))
        }
      </div>
    </div>
  )
}
