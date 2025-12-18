// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/movies/dashboard" },
    { name: "Create Movie", path: "/admin/movies/create" },
    { name: "Create Genre", path: "/admin/movies/genre" },
    { name: "Update Movie", path: "/admin/movies-list" },
    { name: "Comments", path: "/admin/movies/comments" },
  ];

  return (
    <div className="fixed h-screen w-64 bg-gray-900 border-r border-gray-700 shadow-lg z-50">
      <aside className="text-gray-300 flex flex-col py-6">
        <ul className="flex flex-col gap-4 px-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 shadow-md"
                      : "hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
