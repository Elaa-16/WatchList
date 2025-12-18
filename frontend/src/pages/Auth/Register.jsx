import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered!");
      } catch (err) {
        toast.error(err?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black">

      {/* Left Register Form */}
      <div className="flex flex-col justify-center px-20 w-[40%] text-white">
        <h1 className="text-4xl font-bold mb-8">
          Create Your Movie Account 🎥
        </h1>

        <form
          onSubmit={submitHandler}
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg space-y-6 max-w-md"
        >
          {/* Username */}
          <div>
            <label className="text-sm opacity-80">Username</label>
            <input
              type="text"
              className="w-full mt-1 bg-black/40 text-white px-4 py-2 rounded-lg border border-white/20 focus:border-teal-400 transition"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm opacity-80">Email Address</label>
            <input
              type="email"
              className="w-full mt-1 bg-black/40 text-white px-4 py-2 rounded-lg border border-white/20 focus:border-teal-400 transition"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm opacity-80">Password</label>
            <input
              type="password"
              className="w-full mt-1 bg-black/40 text-white px-4 py-2 rounded-lg border border-white/20 focus:border-teal-400 transition"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm opacity-80">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 bg-black/40 text-white px-4 py-2 rounded-lg border border-white/20 focus:border-red-400 transition"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 transition text-white py-3 rounded-lg font-semibold"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {isLoading && <Loader />}
        </form>

        <p className="mt-6 opacity-90">
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-teal-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Right Movie Image */}
      <div className="w-[60%] h-full relative">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format"
          alt="Cinema"
          className="w-full h-full object-cover rounded-l-2xl"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-black/60 to-transparent rounded-l-2xl"></div>
      </div>

    </div>
  );
};

export default Register;
