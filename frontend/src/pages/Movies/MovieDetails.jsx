import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-galaxy"> {/* Galaxy-themed dark bg with subtle stars */}
      {/* Animated Stars Background - Subtle for immersion */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-blue-900" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40 animate-twinkle-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Go Back Link - Styled for cosmic theme */}
        <Link
          to="/"
          className="text-purple-200 font-semibold hover:text-cyan-300 hover:underline inline-block mt-6 ml-6 transition-colors duration-300"
        >
          ← Back to Movies
        </Link>
      </div>

      <div className="container mx-auto px-6 mt-12 relative z-10">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Movie Poster - With mild glow on hover */}
          <div className="flex justify-center">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="max-h-[450px] w-auto object-contain rounded-lg mx-auto shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-500 group-hover:scale-105" // Mild hover glow and scale
            />
          </div>

          {/* Movie Info - Dark theme adapted */}
          <div className="text-white flex flex-col justify-start">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-100 drop-shadow-md">
              {movie?.name}
            </h2>

            <p className="mb-6 text-gray-300 max-w-xl backdrop-blur-sm bg-black/20 rounded-lg p-4"> {/* Subtle backdrop for readability */}
              {movie?.detail}
            </p>

            <p className="text-lg font-semibold text-indigo-200">
              Releasing Date: <span className="text-gray-300">{movie?.year}</span>
            </p>

            <h3 className="mt-4 font-semibold text-xl text-purple-200">Cast:</h3>
            <ul className="text-gray-300 mt-2 bg-black/20 rounded-lg p-3">
              {movie?.cast?.map((c, index) => (
                <li key={index} className="ml-4 list-disc">{c}</li> // Added list style for better readability
              ))}
            </ul>
          </div>
        </div>

        {/* Tabs (Reviews, etc.) - Assume MovieTabs adapts to dark theme */}
        <div className="mt-12">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-twinkle-slow { animation: twinkle-slow infinite; }
      `}</style>
    </div>
  );
};

export default MovieDetails;