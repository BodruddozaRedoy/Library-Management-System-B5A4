import { Button } from '../ui/button'
import type { IBook, IBorrow, IBorrowObj } from '@/types'
import { cn } from '@/lib/utils'
import {  Trash } from 'lucide-react'
import EditBookModal from '../modals/EditBookModal'
import { useDeleteBookMutation, useGetBorrowedBooksQuery } from '@/redux/api/baseApi'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import BorrowModal from '../modals/BorrowModal'


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
