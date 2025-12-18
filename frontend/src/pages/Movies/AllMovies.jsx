import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllMoviesQuery, useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { setMoviesFilter, setFilteredMovies, setMovieYears, setUniqueYears } from "../../redux/features/movies/moviesSlice";
import MovieCard from "./MovieCard";
import banner from "../../assets/banner.jpg";

const AllMovies = () => {
  const dispatch = useDispatch();

  // --- Queries ---
  const { data: movies = [] } = useGetAllMoviesQuery();
  const { data: genres = [] } = useFetchGenresQuery();
  const { data: newMovies = [] } = useGetNewMoviesQuery();
  const { data: topMovies = [] } = useGetTopMoviesQuery();
  const { data: randomMovies = [] } = useGetRandomMoviesQuery();
  const { filteredMovies } = useSelector((state) => state.movies);

  // --- Calculate unique years with useMemo ---
  const uniqueYears = useMemo(() => {
    return [...new Set(movies.map((m) => m.year))].sort((a, b) => b - a); // Sort descending for recency
  }, [movies]);

  // --- Conditional initialization ---
  useEffect(() => {
    // Dispatch only if filteredMovies is empty and we have movies
    if (filteredMovies.length === 0 && movies.length > 0) {
      dispatch(setFilteredMovies(movies));
      dispatch(setMovieYears(uniqueYears));
      dispatch(setUniqueYears(uniqueYears));
    }
  }, [movies, uniqueYears, filteredMovies.length, dispatch]);

  // --- Handlers ---
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm)
    );
    dispatch(setMoviesFilter({ searchTerm }));
    dispatch(setFilteredMovies(filtered));
  };

  const handleGenreChange = (genreId) => {
    const filtered = genreId
      ? movies.filter((m) => m.genre === genreId)
      : movies;
    dispatch(setFilteredMovies(filtered));
  };

  const handleYearChange = (year) => {
    const filtered = year
      ? movies.filter((m) => m.year === +year)
      : movies;
    dispatch(setFilteredMovies(filtered));
  };

  const handleSortChange = (value) => {
    if (value === "new") dispatch(setFilteredMovies(newMovies));
    else if (value === "top") dispatch(setFilteredMovies(topMovies));
    else if (value === "random") dispatch(setFilteredMovies(randomMovies));
    else dispatch(setFilteredMovies(movies));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-galaxy"> {/* Galaxy-themed dark bg with subtle stars */}
      {/* Animated Stars Background - Reduced for subtlety */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-blue-900" />
        {[...Array(50)].map((_, i) => ( // Reduced from 100 to 50 stars
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40 animate-twinkle-slow" // Slower twinkle
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              animationDelay: `${Math.random() * 10}s`, // Longer delays
              animationDuration: `${4 + Math.random() * 4}s`, // Slower
            }}
          />
        ))}
        {/* Removed shooting stars to tone down */}
      </div>

      {/* Hero Section - Simplified, no float */}
      <section className="relative h-96 flex items-center justify-center text-white z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-2xl text-purple-100">🌌 The Movies Cosmos</h1>
          <p className="text-xl md:text-2xl font-light mb-6 drop-shadow-lg text-indigo-100">Warp into Worlds. Discover Galaxies of Stories.</p>
          <div className="flex justify-center space-x-4 text-2xl"> {/* Removed pulse for calm */}
            <span className="text-yellow-300 drop-shadow-md">🍿</span>
            <span className="text-cyan-300 drop-shadow-md">🎥</span>
            <span className="text-orange-300 drop-shadow-md">⭐</span>
          </div>
        </div>
      </section>

      {/* Search Bar - Kept glowing but no extra anim */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search the stars for a movie... 🔭"
              onChange={handleSearchChange}
              className="w-full p-4 text-lg rounded-full border-2 border-purple-500 focus:border-cyan-400 focus:outline-none shadow-lg shadow-purple-500/25 transition-all duration-300 bg-white/10 backdrop-blur-md text-white placeholder-gray-300"
            />
          </div>
        </div>
      </section>

      {/* Filters - Simplified labels: Genre, Year, Rated */}
      <section className="py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Genre Filter */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-lg">
              <label className="block text-sm font-semibold mb-2 text-purple-200">Genre</label>
              <select
                onChange={(e) => handleGenreChange(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none bg-black/20 text-white"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-lg">
              <label className="block text-sm font-semibold mb-2 text-purple-200">Year</label>
              <select
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none bg-black/20 text-white"
              >
                <option value="">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter - Labeled "Rated", simplified options */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-lg">
              <label className="block text-sm font-semibold mb-2 text-purple-200">Rated</label>
              <select
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none bg-black/20 text-white"
              >
                <option value="">All</option>
                <option value="top">Top Rated</option>
                <option value="new">New</option>
                <option value="random">Random</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Cards Grid - Toned down: no orbit, milder hover, simpler slide-in */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-100 drop-shadow-md">Featured Movies</h2> {/* Removed bounce */}
          {filteredMovies?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 bg-black/20 backdrop-blur-md border border-cyan-500/30 ${index % 2 === 0 ? 'animate-slide-in-left-mild' : 'animate-slide-in-right-mild'}`} // Milder transform, no rotate/orbit
                >
                  <MovieCard
                    movie={movie}
                    className="h-full text-white relative z-10" // Boost z-index for click priority
                  />
                  {/* Simplified badge, no pulse */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ⭐ Play
                  </div>
                  {/* Removed orbit ring */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-300 mb-4">No movies found 🤷‍♂️</h3> {/* Simplified back */}
              <p className="text-gray-400">Try adjusting your filters.</p>
              <div className="flex justify-center space-x-2 text-xl"> {/* Removed bounce */}
                <span className="text-yellow-300">🔍</span>
                <span className="text-cyan-300">🎥</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes slide-in-left-mild {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right-mild {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-twinkle-slow { animation: twinkle-slow infinite; }
        .animate-slide-in-left-mild { animation: slide-in-left-mild 0.6s ease-out; }
        .animate-slide-in-right-mild { animation: slide-in-right-mild 0.6s ease-out 0.1s both; }
      `}</style>
    </div>
  );
};

export default AllMovies;