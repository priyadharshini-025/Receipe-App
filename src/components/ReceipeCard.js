import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ReceipeCard({ meal }) {
    const [isFav, setIsFav] = useState(false);
    const [toast, setToast] = useState(""); // new state for notifications

    useEffect(() => {
        if (!meal) return;

        const favs = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFav(favs.includes(meal.idMeal));
    }, [meal]);

    if (!meal) return null;

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let favs = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favs.includes(meal.idMeal)) {
            favs = favs.filter((id) => id !== meal.idMeal);
            setIsFav(false);
            // Show toast
            setToast("Removed from Favourites!");
            setTimeout(() => setToast(""), 2000); // hide after 2 seconds

        } else {
            favs.push(meal.idMeal);
            setIsFav(true);
            // Show toast
            setToast("Added to Favourites!");
            setTimeout(() => setToast(""), 2000); // hide after 2 seconds
        }

        localStorage.setItem("favorites", JSON.stringify(favs));
        window.dispatchEvent(new Event("favoritesUpdated"));

    };

    return (
        <Link to={`/receipe/${meal.idMeal}`}>
            <div
                className="
          group rounded-2xl overflow-hidden
          shadow-md hover:shadow-xl
          transition-all duration-300
          hover:-translate-y-1
          bg-white border border-emerald-200
         text-emerald-600

        "
            >
                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="
              w-full h-48 object-cover
              group-hover:scale-105 transition-transform duration-300
            "
                    />

                    {/* FAVORITE */}
                    <button
                        onClick={toggleFavorite}
                        className="
                        absolute top-3 right-3
                        bg-white/90 backdrop-blur
                        rounded-full p-2
                        shadow hover:scale-110
                        transition
                        "
                        aria-label="Add to favorites" >
                        <i className={`fa-solid fa-heart text-lg ${isFav ? "text-red-500" : "text-gray-400"}`} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-1">
                    <h3 className="font-bold text-base truncate text-emerald-600">
                        {meal.strMeal}
                    </h3>

                    <p className="text-sm text-emerald-600">
                        {meal.strCategory}
                    </p>
                </div>

            </div>
            {/* Toast notification */}
            {toast && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white px-6 py-2 rounded-full shadow-lg animate-fade-in z-50">
                    {toast}
                </div>)}
        </Link>
    );
}

export default ReceipeCard;
