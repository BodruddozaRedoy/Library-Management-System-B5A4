import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router'


const navLinks = [
    {
        path: "/",
        title: "Home"
    },
    {
        path: "/all-books",
        title: "All Books"
    },
    {
        path: "/add-book",
        title: "Add Book"
    },
    {
        path: "/borrow-summary",
        title: "Borrow Summary"
    }
]

export default function Navbar() {
    const location = useLocation()
    console.log(location)
    return (
        <div className='flex justify-between items-center rounded-lg shadow-md py-5 px-10 m-10 bg-background'>
            <h1 className='text-primary text-3xl font-bold'>LMS</h1>
            <ul className='flex gap-4 items-center'>
                {
                    navLinks?.map((link, index) => (
                        <Link to={link.path} key={index}> <li className={cn('text-primary', {"border-b border-primary shadow-md font-semibold py-1 px-3 rounded-lg": location.pathname === link.path})}>{link.title}</li> </Link>
                    ))
                }
            </ul>
        </div>
    )
}
