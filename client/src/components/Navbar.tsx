import { Link } from 'react-router'


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
    }
]

export default function Navbar() {
    return (
        <div className='flex justify-between items-center rounded-lg shadow-md py-5 px-10 m-10'>
            <h1 className='text-primary text-3xl font-bold'>LMS</h1>
            <ul className='flex gap-4'>
                {
                    navLinks?.map((link, index) => (
                        <Link to={link.path} key={index}> <li className='text-primary'>{link.title}</li> </Link>
                    ))
                }
            </ul>
        </div>
    )
}
