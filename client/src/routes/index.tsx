import MainLayout from '@/layouts/MainLayout'
import AddBook from '@/pages/AddBook'
import AllBooks from '@/pages/AllBooks'
import BorrowSummary from '@/pages/BorrowSummary'
import Home from '@/pages/Home'
import {createBrowserRouter} from 'react-router'

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/add-book",
                Component: AddBook
            },
            {
                path: "/all-books",
                Component: AllBooks
            },
            {
                path: "/borrow-summary",
                Component: BorrowSummary
            }
        ]
    }
])