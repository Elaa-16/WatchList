import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[30rem] mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white rounded-xl shadow-lg shadow-cyan-900/60 p-6 border border-gray-700">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1 text-cyan-300 tracking-wide">Realtime</h2>
      <p className="text-gray-400 mb-4">Live updates</p>

      <div className="border-t border-gray-700 my-4"></div>

      {/* Live Count */}
      <h2 className="text-3xl font-extrabold mb-1 text-sky-400">{visitors?.length}</h2>
      <p className="text-gray-400 mb-4">Subscribers</p>

      <div className="border-t border-gray-700 my-4"></div>

      {/* Primary Card */}
      <PrimaryCard 
        cardBg="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500" 
        textColor="text-white" 
        shadow="shadow-lg shadow-purple-900/50"
      />
    </div>
  );
};

export default RealTimeCard;
