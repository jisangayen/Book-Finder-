import { Link, useLocation } from "react-router-dom";
import { Book, Heart, LayoutDashboard, Layers, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/collections", label: "Collections", icon: <Layers size={20} /> },
    { to: "/favorites", label: "Saved", icon: <Heart size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen w-64 bg-gray-900 text-white flex flex-col p-6 fixed left-0 top-0 border-r border-gray-800 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          {/* <Book size={28} className="text-purple-400" /> */}
          <img src="/f1.png" alt="" className="h-8 w-8" />
          <h1 className="text-xl font-bold ">Book <span className="text-purple-500">Finder</span></h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {links.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)} // close sidebar on mobile after click
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
    </>
  );
}
