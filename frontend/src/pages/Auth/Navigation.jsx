import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/60 backdrop-blur-md border border-white/10 shadow-lg rounded-2xl px-12 py-5">
      <section className="flex items-center gap-14 text-white">

        {/* HOME */}
        <Link
          to="/"
          className="flex flex-col items-center hover:scale-110 transition transform"
        >
          <AiOutlineHome size={28} />
          <span className="text-xs mt-1 opacity-80">Home</span>
        </Link>

        {/* MOVIES */}
        <Link
          to="/movies"
          className="flex flex-col items-center hover:scale-110 transition transform"
        >
          <MdOutlineLocalMovies size={28} />
          <span className="text-xs mt-1 opacity-80">Movies</span>
        </Link>

        {/* USER */}
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex flex-col items-center hover:scale-110 transition transform"
            >
              <span className="font-semibold text-sm">{userInfo.username}</span>
            </button>
          ) : (
            <div className="flex gap-8">
              <Link
                to="/login"
                className="flex flex-col items-center hover:scale-110 transition transform"
              >
                <AiOutlineLogin size={28} />
                <span className="text-xs opacity-80">Login</span>
              </Link>

              <Link
                to="/register"
                className="flex flex-col items-center hover:scale-110 transition transform"
              >
                <AiOutlineUserAdd size={28} />
                <span className="text-xs opacity-80">Signup</span>
              </Link>
            </div>
          )}

          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 bottom-16 w-52 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 text-white shadow-2xl py-4 text-base space-y-2 animate-fadeIn">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-white/10 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-white/10 rounded-md"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-red-500/40 rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
