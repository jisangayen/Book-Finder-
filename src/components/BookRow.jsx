import BookCard from "./BookCard";

export default function BookRow({ title, books }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
