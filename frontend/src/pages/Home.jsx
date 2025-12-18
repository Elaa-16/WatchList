import { useState } from "react";
import { Home, Clapperboard, RefreshCcw, User, Search } from "lucide-react";

const movies = [
  { id: 1, title: "The Shawshank Redemption", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
  { id: 2, title: "The Godfather", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eEslKSwcqmiNS6va24Pbxf2UKmJ.jpg" },
  { id: 3, title: "The Dark Knight", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 4, title: "Pulp Fiction", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id: 5, title: "Forrest Gump", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/saHP97rTPS5eLmrLQEcANmKrsFl.jpg" },
  { id: 6, title: "Inception", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
  { id: 7, title: "The Matrix", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id: 8, title: "Goodfellas", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg" },
  { id: 9, title: "Interstellar", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 10, title: "The Silence of the Lambs", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg" },
  { id: 11, title: "Saving Private Ryan", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg" },
  { id: 12, title: "The Green Mile", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg" },
  { id: 13, title: "Parasite", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: 14, title: "Gladiator", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg" },
  { id: 15, title: "The Departed", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nT97ifVT2J1yMQmeq20Qblg61T.jpg" },
  { id: 16, title: "Whiplash", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7fn624j5lj3xTme2SgiLCeuedmO.jpg" },
  { id: 17, title: "The Prestige", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg" },
  { id: 18, title: "The Lion King", poster: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg" }
];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const filtered = movies.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white overflow-hidden relative">
      {/* Animated Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 bg-black/30 backdrop-blur-xl border-r border-purple-600/30 flex flex-col items-center py-8 gap-8 z-50">
        <div className="text-3xl mb-4">🌌</div>
        <button className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/50">
          <Home size={24} />
        </button>
        <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
          <Clapperboard size={24} />
        </button>
        <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300">
          <RefreshCcw size={24} />
        </button>
        <button className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 mt-auto">
          <User size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-20 p-8">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8 h-64 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-sm border border-purple-600/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 h-full flex flex-col justify-center px-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Warp In, Explorer
            </h1>
            <p className="text-xl text-gray-300">Continue your stellar journey</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search the cosmos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 p-3 rounded-xl bg-black/20 backdrop-blur-md border border-purple-600/50 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
          />
        </div>

        {/* Movies Slider */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Stellar Hits
          </h2>
          <div className="relative overflow-hidden">
            <div className="flex gap-4 pb-4 animate-scroll hover:pause">
              {[...filtered, ...filtered].map((movie, idx) => (
                <div 
                  key={`${movie.id}-${idx}`}
                  className="min-w-[200px] flex-shrink-0 group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:z-10"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-lg shadow-purple-900/50 border-2 border-purple-600/30 hover:border-cyan-400 transition-all duration-300">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-semibold text-sm">{movie.title}</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span>🌟</span>
                      <span>8.5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default HomePage;