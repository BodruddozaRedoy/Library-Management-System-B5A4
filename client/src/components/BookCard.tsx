import React from 'react'
import { Button } from './ui/button'
import type { IBook } from '@/types'
import { cn } from '@/lib/utils'
import { SquarePen, Trash } from 'lucide-react'
import EditBookModal from './modals/EditBookModal'


interface IProps {
  book: IBook
}

export default function BookCard({book}:IProps) {
  return (
    <div className='bg-background shadow-md p-5 rounded-lg'>
        <h1 className='font-bold text-xl'>{book.title}</h1>
        <p className='text-muted-foreground'>{book.description}</p>
        <div className='flex justify-between items-center mt-3'>
            <p className='text-primary'>{book.author}</p>
            <p>{book.genre}</p>
        </div>
        <div className=' justify-between items-center mt-3'>
            <p className='text-muted-foreground'><span className='text-black'>ISBN: </span>{book.isbn}</p>
            <p className='text-muted-foreground'><span className='text-black'>Copies: </span>{book.copies}</p>
        </div>
        <hr className='my-3'/>
        <div className='flex items-center justify-between'>
            <p className={cn({
              "text-green-500": book.available,
              "text-red-500": !book.available
            })}>{book.available ? "Available" : "Unavailable"}</p>
            <div className='space-x-1 flex items-center'>
              <EditBookModal book={book}/>
              
              <Button variant={"outline"}><Trash/></Button>
              <Button>Borrow</Button>
            </div>
        </div>
    </div>
  )
}
