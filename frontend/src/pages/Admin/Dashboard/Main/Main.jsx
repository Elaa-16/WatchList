// Main.jsx
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen text-gray-300 font-sans ml-64 p-6">
      <section className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-full max-w-6xl">
         {/* Summary Cards */}
<div className="flex flex-wrap gap-4">
  <SecondaryCard
    pill="Users"
    content={visitors?.length}
    info="20.2k more than usual"
    gradient="from-teal-500 via-cyan-500 to-sky-500"
    textColor="text-white"
    shadow="shadow-lg shadow-cyan-900/50"
  />
  <SecondaryCard
    pill="Comments"
    content={sumOfCommentsLength}
    info="742.8 more than usual"
    gradient="from-purple-600 via-pink-500 to-red-500"
    textColor="text-white"
    shadow="shadow-lg shadow-purple-900/50"
  />
  <SecondaryCard
    pill="Movies"
    content={allMovies?.length}
    info="372+ more than usual"
    gradient="from-indigo-700 via-blue-600 to-teal-500"
    textColor="text-white"
    shadow="shadow-lg shadow-blue-900/50"
  />
</div>


          {/* Top Content Header */}
          <div className="flex justify-between w-full mt-10 mb-4 text-gray-400 font-semibold text-lg tracking-wide">
            <p>Top Content</p>
            <p>Comments</p>
          </div>

          {/* Top Movies List */}
          <div className="flex flex-col gap-4">
            {topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
                cardBg="bg-gray-800 hover:bg-gray-700 transition"
                textColor="text-gray-300"
                shadow="shadow-md shadow-gray-900/50"
              />
            ))}
          </div>
        </div>

        {/* Real-Time Stats */}
        <div className="mt-10 lg:mt-0 lg:ml-8">
          <RealTimeCard
            cardBg="bg-gray-800"
            textColor="text-gray-300"
            shadow="shadow-lg shadow-gray-900/50"
          />
        </div>
      </section>
    </div>
  );
};

export default Main;
