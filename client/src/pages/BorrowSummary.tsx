import BorrowCard from "@/components/card/BorrowCard"
import { useGetBorrowedBooksQuery } from "@/redux/api/baseApi"
import type { IBorrowObj } from "@/types"

export default function BorrowSummary() {
    const {data} = useGetBorrowedBooksQuery(undefined)
    console.log(data)
  return (
    <div className="p-10 rounded-lg bg-background">
        <div>
            <h1 className="font-bold text-xl">Borrow Summary</h1>
        </div>
        <hr className="my-5"/>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {
                data?.data?.map((borrow:IBorrowObj, index:string) => (
                    <BorrowCard key={index} borrow={borrow}/>
                ))
            }
        </div>
    </div>
  )
}
