import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-md w-full">
      <input
        type="text"
        placeholder="Search for books"
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 bg-transparent outline-none text-gray-700 dark:text-white"
      />
      <Search className="w-5 h-5 text-gray-500" />
    </div>
  );
}
