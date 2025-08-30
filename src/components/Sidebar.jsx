import { Link, useLocation } from "react-router-dom";
import { Book, Heart, LayoutDashboard, Layers } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/collections", label: "Collections", icon: <Layers size={20} /> },
    { to: "/favorites", label: "Saved", icon: <Heart size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-6 fixed left-0 top-0 border-r border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <Book size={28} className="text-purple-400" />
        <h1 className="text-xl font-bold">Book Finder</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {links.map(({ to, label, icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-500">
        © {new Date().getFullYear()} Book Finder
      </div>
    </div>
  );
}
