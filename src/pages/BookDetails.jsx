import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams(); // book id
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);

        // Fetch first author details (if available)
        if (data.authors && data.authors.length > 0) {
          const authorKey = data.authors[0].author.key;
          const resAuthor = await fetch(
            `https://openlibrary.org${authorKey}.json`
          );
          const authorData = await resAuthor.json();
          setAuthor(authorData);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
      }
    }

    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="p-6 text-white">
      <Link to="/" className="text-purple-400 hover:underline">
        ← Back
      </Link>

      <div className="mt-6 flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <img
          src={
            book.covers
              ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
              : "https://via.placeholder.com/250x350?text=No+Cover"
          }
          alt={book.title}
          className="rounded-xl w-60 h-80 object-cover shadow-lg"
        />

        {/* Book Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="mb-4 text-gray-300">
            {book.description?.value || book.description || "No description available."}
          </p>

          <p className="text-sm text-gray-400">
            First published: {book.first_publish_date || "N/A"}
          </p>
          <p className="text-sm text-gray-400">
            Subjects: {book.subjects ? book.subjects.slice(0, 5).join(", ") : "N/A"}
          </p>

          {/* Author Info */}
          {author && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Author: {author.name}</h2>
              <p className="text-sm text-gray-300">
                {author.bio?.value || author.bio || "No bio available."}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Born: {author.birth_date || "Unknown"}{" "}
                {author.death_date && `– Died: ${author.death_date}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
