import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      toast.success("Movie updated successfully!");
      navigate("/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
      toast.error("Failed to update movie");
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id);
      toast.success("Movie deleted successfully");
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-start pt-20 bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <form className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6 text-black">
        <h2 className="text-3xl font-bold text-teal-600 text-center">
          Update Movie
        </h2>

        <div>
          <label className="block font-semibold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500 text-black"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500 text-black"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Detail:</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            rows={6}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500 resize-none text-black"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Cast (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500 text-black"
          />
        </div>

        <div>
          <div
            className="border-2 border-dashed border-teal-400 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:border-teal-600 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {!selectedImage && <span className="text-teal-500">Click to select an image</span>}
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="h-48 w-auto object-cover rounded"
              />
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleUpdateMovie}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-1/2 mr-2 transition"
            disabled={isUpdatingMovie || isUploadingImage}
          >
            {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
          </button>

          <button
            type="button"
            onClick={handleDeleteMovie}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-1/2 ml-2 transition"
            disabled={isUpdatingMovie || isUploadingImage}
          >
            {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
