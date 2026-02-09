import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMealDetails } from "../api";

function Favorites() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(""); // new state for notifications
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true); // show loading immediately
            setError("");
            try {
                const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

                if (!favoriteIds.length) {
                    setMeals([]); // empty if no favorites
                } else {
                    const responses = await Promise.all(
                        favoriteIds.map((id) => getMealDetails(id))
                    );

                    const validMeals = responses.map((r) => r?.[0]).filter(Boolean);
                    setMeals(validMeals);
                }
            } catch (err) {
                console.error("Failed to load favourites", err);
                setError("Failed to load favourites");
            } finally {
                setLoading(false); // stop loading
            }
        };

        fetchFavorites();
    }, []);

    const removeFavorite = (id, e) => {
        console.log("favourites removal fn")
        e.stopPropagation();

        const updated = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        ).filter((f) => f !== id);

        localStorage.setItem("favorites", JSON.stringify(updated));
        setMeals((prev) => prev.filter((m) => m.idMeal !== id));

        window.dispatchEvent(new Event("favoritesUpdated"));
        // Show toast
        setToast("Removed from Favourites!");
        setTimeout(() => setToast(""), 1500); // hide after 2 seconds
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">

            {/* Section Header */}
            <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-emerald-600 hover:underline font-medium"
                >
                    ← Back
                </Link>

                <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-700">
                    <i className="fa-solid fa-heart text-red-500"></i>
                    Favourites
                </h2>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center mt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-500 text-lg">Loading favourites...</p>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className="text-center mt-20 text-red-500 text-lg">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && meals.length === 0 && (
                <div className="flex flex-col items-center mt-24 text-gray-500">
                    <i className="fa-regular fa-heart text-6xl mb-4"></i>
                    <p className="text-lg font-medium">No favourites yet</p>
                    <p className="text-sm">
                        Save recipes by tapping the heart
                    </p>
                </div>
            )}

            {/* Grid */}
            <div className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal) => (
                    <div
                        key={meal.idMeal}
                        onClick={() => navigate(`/receipe/${meal.idMeal}`)}
                        className="
                        bg-white rounded-2xl shadow
                        hover:shadow-lg transition cursor-pointer
                        overflow-hidden group
                        "
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-58 object-cover group-hover:scale-105 transition"
                            />

                            {/* Remove */}
                            <button
                                onClick={(e) => removeFavorite(meal.idMeal, e)}
                                className="
                                absolute top-3 right-3
                                bg-white/90 backdrop-blur
                                p-2 rounded-full shadow
                                hover:bg-red-100
                                "
                            >
                                <i className="fa-solid fa-heart text-red-500"></i>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-bold text-base text-emerald-600 truncate">
                                {meal.strMeal}
                            </h3>
                            <p className="font-sm text-emerald-600 truncate">
                                {meal.strCategory}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toast notification */}
            {toast && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full shadow-lg animate-fade-in z-50">
                    {toast}
                </div>
            )}

        </div>
    );
}

export default Favorites;
