import Banner from "@/components/Banner";
import BookCard from "@/components/card/BookCard";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";

export default function Home() {
  const {data} = useGetBooksQuery(undefined)
  return (
    <div className="">
        <Banner/>
        <div className="p-10 rounded-lg bg-background mt-5">
          <h1 className="font-bold text-xl">All Books</h1>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5  ">
          {
            data?.data?.map((book:IBook, index:string) => (
              <BookCard key={index} book={book}/>
            ))
          }
        </div>
        </div>
    </div>
  )
}
