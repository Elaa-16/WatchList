import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres && genres.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      const selectedGenre = genres.find((g) => g._id === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast || !selectedImage) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadResponse = await uploadImage(formData);
        if (uploadResponse.data) {
          uploadedImagePath = uploadResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await createMovie({
        ...movieData,
        image: uploadedImagePath,
      });

      toast.success("Movie added to database");
      navigate("/admin/movies-list");

      setMovieData({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        rating: 0,
        image: null,
        genre: genres?.[0]?._id || "",
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to create movie:", error);
      toast.error("Failed to create movie");
    }
  };

  return (
    <div
      className="flex justify-center pt-8 pb-8 bg-cover bg-center p-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      <form className="relative bg-white/90 backdrop-blur-sm px-4 pt-2 pb-2 rounded-xl shadow-lg w-full max-w-md space-y-3 text-gray-800 z-10">
        <h2 className="text-2xl font-bold text-teal-600 text-center">Create Movie</h2>

        <div>
          <label className="block font-semibold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Detail:</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            rows={3}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Cast:</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Genre:</label>
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full focus:outline-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1"></label>
          <div
            className="border-2 border-dashed border-teal-400 rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-teal-600 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {!selectedImage && <span className="text-teal-500">Click to select an image</span>}
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="h-32 w-auto object-cover rounded"
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

        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full transition"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
