import type { IBorrowObj } from '@/types'


interface IProps {
  borrow: IBorrowObj
}



export default function BorrowCard({ borrow }: IProps) {
//   const [data] = useGetBorrowedBooksQuery()
  

  // if(!book._id) return toast.error("Book info not found")
  return (
    <div className='bg-background shadow-md p-5 rounded-lg'>
      <h1 className='font-bold text-xl'>{borrow.book.title}</h1>
      <hr className='my-3' />
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground'><span className='text-black'>ISBN: </span>{borrow.book.isbn}</p>
        <p>Quantity Borrowed: {borrow.totalQuantity}</p>
      </div>
    </div>
  )
}
