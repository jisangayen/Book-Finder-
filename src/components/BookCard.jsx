import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id.replace("/works/", "")}`}>
      <div className="relative w-36 sm:w-40 md:w-48 lg:w-52 flex-shrink-0 cursor-pointer group transition-transform duration-300 hover:scale-105">
        {/* Card background and border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-700/30 to-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <div className="rounded-xl overflow-hidden shadow-lg border-2 border-transparent group-hover:border-purple-500 transition-all duration-300 bg-gray-800">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-xl"
          />
          <div className="p-3">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 line-clamp-1">
              {book.title}
            </h3>
            <p className="text-xs sm:text-sm text-red-600">{book.author}</p>
          </div>
        </div>
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:bg-purple-700/10 transition duration-300"></div>
      </div>
    </Link>
  );
}
