import { Link } from "react-router";

export default function Banner() {
    return (
        <section className="bg-background text-foreground py-16 px-6 md:px-20 rounded-lg shadow-md">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          📚 Manage Your Books Effortlessly
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Organize, track, and explore your book collection with ease using our modern Book Management System.
        </p>
        <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-100 transition-all duration-300">
          <Link to={"/all-books"}>Books</Link>
        </button>
      </div>
    </section>
    )
}
