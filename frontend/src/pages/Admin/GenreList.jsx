import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import { Loader2, Trash2, Edit3 } from "lucide-react"; // Added icons for better UX
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres = [], refetch, isLoading: loadingGenres } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Added delete confirmation

  const [createGenre, { isLoading: creating }] = useCreateGenreMutation();
  const [updateGenre, { isLoading: updating }] = useUpdateGenreMutation();
  const [deleteGenre, { isLoading: deleting }] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name: name.trim() }).unwrap();
      setName("");
      toast.success(`${result.name} created successfully! 🌟`);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to create genre. Try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updatingName.trim()) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: { name: updatingName.trim() },
      }).unwrap();

      toast.success(`${result.name} updated! ✨`);
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update genre. Try again.");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      toast.success(`${result.name} deleted. 🚀`);
      refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to delete genre. Try again.");
    }
  };

  const closeModal = () => {
    setSelectedGenre(null);
    setUpdatingName("");
    setModalVisible(false);
    setShowConfirmDelete(false);
  };

  if (loadingGenres) {
    return (
      <div className="ml-[10rem] flex min-h-screen items-center justify-center bg-galaxy">
        <div className="flex items-center space-x-2 text-purple-300">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading genres...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-[10rem] min-h-screen relative overflow-hidden bg-galaxy flex flex-col p-4"> {/* Galaxy theme wrapper */}
      {/* Animated Stars Background */}
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

      <div className="md:w-3/4 p-3 relative z-10 flex flex-col space-y-6"> {/* Responsive, spaced layout */}
        <h1 className="text-3xl font-bold text-purple-100 drop-shadow-md text-center md:text-left">Manage Genres 🌌</h1>

        {/* Create Genre Form - Enhanced with theme */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
            buttonText={creating ? "Creating..." : "Add Genre"}
            isLoading={creating}
            className="space-y-4" // Added for form spacing
          />
        </div>

        {/* Genres Grid - Cosmic cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {genres.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 text-lg">No genres yet. Create one to start! 🚀</p>
          ) : (
            genres.map((genre) => (
              <div
                key={genre._id}
                className="group relative bg-black/30 backdrop-blur-md rounded-xl p-4 border border-cyan-500/30 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-indigo-200 text-center mb-2">{genre.name}</h3>
                <button
                  onClick={() => {
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                    setModalVisible(true);
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-purple-500/20 hover:bg-purple-500 text-purple-300"
                  title="Edit Genre"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal - Themed and improved */}
        <Modal isOpen={modalVisible} onClose={closeModal}>
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 max-w-md w-full mx-auto space-y-4 border border-purple-500/30">
            <h2 className="text-2xl font-semibold text-center text-purple-100 drop-shadow-md">
              Edit Genre: {selectedGenre?.name}
            </h2>
            <GenreForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateGenre}
              buttonText={updating ? "Updating..." : "Update Genre"}
              isLoading={updating}
              className="space-y-3"
            />
            {/* Delete Button with Confirmation */}
            <button
              onClick={() => setShowConfirmDelete(true)}
              disabled={deleting || updating}
              className="w-full flex items-center justify-center space-x-2 bg-red-600/80 hover:bg-red-500/80 text-white py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              <span>{deleting ? "Deleting..." : "Delete Genre"}</span>
            </button>
          </div>

          {/* Confirmation Modal for Delete */}
          {showConfirmDelete && (
            <Modal isOpen={showConfirmDelete} onClose={() => setShowConfirmDelete(false)}>
              <div className="bg-black/90 backdrop-blur-md rounded-xl p-6 max-w-sm w-full mx-auto space-y-4 text-center">
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-purple-100">Delete {selectedGenre?.name}?</h3>
                <p className="text-gray-300">This action cannot be undone. Are you sure?</p>
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={() => setShowConfirmDelete(false)}
                    className="flex-1 bg-gray-600/80 hover:bg-gray-500/80 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteGenre}
                    disabled={deleting}
                    className="flex-1 bg-red-600/80 hover:bg-red-500/80 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Delete"}
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </Modal>
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

export default GenreList;