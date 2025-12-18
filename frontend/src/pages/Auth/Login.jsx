import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

    {/* Form Container */}
<div className="relative z-10 bg-black/40 backdrop-blur-xl p-14 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/10 text-white">
  <h1 className="text-5xl font-extrabold text-center mb-6 tracking-wide drop-shadow-lg">
    🎬 MovieZone
  </h1>
  <p className="text-center text-gray-300 mb-8 text-lg">
    Sign in and enjoy unlimited movies 🍿
  </p>

  <form onSubmit={submitHandler} className="space-y-8 text-lg">
    <div>
      <label htmlFor="email" className="text-base">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="mt-2 w-full p-4 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-red-500 text-white outline-none text-lg"
        placeholder="user@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div>
      <label htmlFor="password" className="text-base">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="mt-2 w-full p-4 rounded-lg bg-gray-900/70 border border-gray-700 focus:border-red-500 text-white outline-none text-lg"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button
      disabled={isLoading}
      type="submit"
      className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-xl transition duration-200"
    >
      {isLoading ? "Signing In..." : "Sign In"}
    </button>

    {isLoading && (
      <div className="flex justify-center">
        <Loader />
      </div>
    )}
  </form>

  <p className="text-center text-base text-gray-300 mt-8">
    New to MovieZone?{" "}
    <Link
      to={redirect ? `/register?redirect=${redirect}` : "/register"}
      className="text-red-400 hover:underline font-semibold"
    >
      Register Now
    </Link>
  </p>
</div>

    </div>
  );
};

export default Login;
