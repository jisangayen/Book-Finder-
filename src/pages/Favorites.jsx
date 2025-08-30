import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, removeFavorite } from "../utils/storage";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (key) => {
    removeFavorite(key);
    setFavorites(getFavorites());
  };

  if (favorites.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">❤️ My Favorites</h1>
        <p className="text-gray-400">No favorite books yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">❤️ My Favorites</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favorites.map((book) => (
          <div
            key={book.key}
            className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Link to={`/book/${book.key.replace("/works/", "")}`}>
              <h2 className="font-semibold">{book.title}</h2>
            </Link>
            <button
              onClick={() => handleRemove(book.key)}
              className="mt-2 text-sm text-red-400 hover:underline"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
