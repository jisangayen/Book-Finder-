import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Collections from "./pages/Collections";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar (fixed on desktop, collapsible on mobile) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:ml-64">
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
