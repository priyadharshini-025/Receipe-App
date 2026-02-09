import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealDetails } from "../api";

function ReceipeDetails() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [isFav, setIsFav] = useState(false);
    const [toast, setToast] = useState(""); // new state for notifications'

    useEffect(() => {
        async function fetchMeal() {
            const data = await getMealDetails(id);
            const fetchedMeal = data?.[0];
            setMeal(fetchedMeal);

            if (fetchedMeal) {
                const favs = JSON.parse(localStorage.getItem("favorites")) || [];
                setIsFav(favs.includes(fetchedMeal.idMeal));
            }
        }
        fetchMeal();
    }, [id]);

    if (!meal) return <p className="text-center mt-10">Loading...</p>;

    // Extract ingredients
    const ingredients = [];
    for (let i = 1; i <= 100; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    // Toggle favorite
    const toggleFavorite = () => {
        let favs = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favs.includes(meal.idMeal)) {
            favs = favs.filter((fav) => fav !== meal.idMeal);
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

    return (<div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg mt-6">
        <Link to="/" className="text-emerald-600 hover:underline font-bold">← Back</Link>

        <div className="flex flex-col md:flex-row gap-8 mt-6">
            {/* IMAGE */}
            <div className="relative w-full md:w-1/2">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-xl shadow-lg w-full" />
                <button
                    onClick={toggleFavorite}
                    className="absolute top-3 right-3 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
                >
                    <i className={`fa-solid fa-heart text-2xl ${isFav ? "text-red-500" : "text-gray-400"}`}></i>
                </button>

            </div>

            {/* INFO */}
            <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
                <span className="text-lg text-gray-700">
                    Category: <span className="font-semibold text-emerald-600">{meal.strCategory}</span>
                </span>

                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <ul className="grid grid-cols-2 gap-2">
                        {ingredients.map((item, idx) => (
                            <li key={idx} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </div>

                {meal.strYoutube && (
                    <a href={meal.strYoutube} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 text-red-600 font-medium hover:underline mt-2">
                        <i className="fa-brands fa-youtube text-xl"></i> Watch Video
                    </a>
                )}
            </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">{meal.strInstructions}</p>
        </div>

        {/* Toast notification */}
        {toast && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white px-6 py-2 rounded-full shadow-lg animate-fade-in z-50">
                {toast}
            </div>)}
    </div>

    );
}

export default ReceipeDetails;
