import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Collections from "./pages/Collections";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";

export default function App() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 bg-gray-950 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/book/:id" element={<BookDetails />} />
          {/* Fallback route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
