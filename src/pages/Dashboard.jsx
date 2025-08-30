import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("trending");

  // fetch trending books
  useEffect(() => {
    if (mode === "trending") {
      fetch("https://openlibrary.org/search.json?q=bestsellers&page=1")
        .then((res) => res.json())
        .then((data) => setBooks(data.docs.slice(0, 12)));
    }
  }, [mode]);

  const searchBooks = async (e) => {
    e.preventDefault();
    setMode("search");
    setPage(1);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${query}&page=1`
    );
    const data = await res.json();
    setBooks(data.docs.slice(0, 12));
  };

  const loadPage = async (newPage) => {
    setPage(newPage);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${query || "bestsellers"}&page=${newPage}`
    );
    const data = await res.json();
    setBooks(data.docs.slice(0, 12));
    window.scrollTo({ top: 0, behavior: "smooth" }); // smooth scroll to top
  };

  return (
    <div className="p-4 sm:p-6">
      
      <div className="flex items-center gap-2 mb-5 md:hidden justify-self-start">
          <img src="/f1.png" alt="" className="h-10 w-10" />
          <h1 className="text-3xl font-bold ">Book <span className="text-purple-500">Finder</span></h1>
      </div>
      {/* Search Form */}
      <form onSubmit={searchBooks} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="flex-1 px-4 py-2 rounded-lg text-black"
        />
        <button className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition">
          Search
        </button>
      </form>
      <div className="flex">
        <img src="/f1.png" alt="" className="sm: h-6 sm:w-6 lg:h-8 lg:w-8" />
        <h2 className="mb-8 ml-3 text-white font-semibold xl:text-2xl sm:text-xl">Explore Books</h2>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <Link
            key={book.key}
            to={`/book/${book.key.replace("/works/", "")}`}
            className="group bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/200x300?text=No+Cover"
              }
              alt={book.title}
              className="rounded-t-xl w-full h-64 sm:h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-base sm:text-lg text-white truncate group-hover:text-purple-400 transition">
                {book.title}
              </h2>
              <p className="text-sm text-gray-400">
                {book.author_name?.[0] || "Unknown Author"}
              </p>
              <p className="text-xs text-gray-500">
                {book.first_publish_year || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {books.length > 0 && (
        <div className="flex justify-center mt-8 gap-4 flex-wrap">
          {page > 1 && (
            <button
              onClick={() => loadPage(page - 1)}
              className="px-6 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 shadow-lg transition"
            >
              ← Previous
            </button>
          )}
          <button
            onClick={() => loadPage(page + 1)}
            className="px-6 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 shadow-lg transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
