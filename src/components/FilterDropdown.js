import { useEffect, useState } from "react";
import { getCategories, getIngredients } from "../api";

function FilterDropdown({ filters, setFilters, onApply, onClear }) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFilters = async () => {
            setLoading(true);
            try {
                const catData = await getCategories();
                const ingData = await getIngredients();

                setCategories(catData.map((c) => c.strCategory));
                setIngredients(ingData.map((i) => i.strIngredient));
            } finally {
                setLoading(false);
            }
        };

        loadFilters();
    }, []);

    const toggleValue = (type, value) => {
        setFilters((prev) => {
            if (type === "category") {
                // single select
                return {
                    ...prev,
                    category: prev.category.includes(value) ? [] : [value],
                };
            }

            // ingredient → multi select
            if (type === "ingredient") {
                return {
                    ...prev,
                    ingredient: prev.ingredient.includes(value)
                        ? prev.ingredient.filter((i) => i !== value)
                        : [...prev.ingredient, value],
                };
            }

            return prev;
        });
    };


    return (
        <div className="relative z-50">
            {/* Trigger */}
            <button
                onClick={() => setOpen((p) => !p)}
                className="
                    px-4 py-2 rounded-full
                    bg-white text-gray-700
                    border shadow-sm
                    hover:bg-orange-50
                    transition
                    flex items-center gap-2
                    "
            >
                <i className="fa-solid fa-filter text-orange-500"></i>
                Filter
            </button>

            {open && (
                <div
                    className="
                        absolute right-0 mt-3 w-80
                        bg-white rounded-xl shadow-xl border
                        p-4 max-h-[420px] overflow-y-auto
                    "
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={() => setOpen(false)}
                        className="
                            sticky top-0 right-2
                            float-right
                            text-gray-500 hover:text-gray-700
                            text-xl font-bold
                        "
                    >
                        &times;
                    </button>

                    {loading && (
                        <p className="text-sm text-gray-500 text-center">
                            Loading filters...
                        </p>
                    )}

                    {!loading && (
                        <>
                            {/* CATEGORY */}
                            <div className="mb-5">
                                <p className="font-bold text-sm text-red-800 mb-2">
                                    Category
                                </p>

                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label
                                            key={cat}
                                            className="
                                                flex items-center gap-2 text-sm font-normal
                                                cursor-pointer
                                                hover:text-orange-600
                                                 "
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.category.includes(cat)}
                                                onChange={() => toggleValue("category", cat)}
                                                className="accent-orange-500"
                                            />
                                            {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* INGREDIENT */}
                            <div className="mb-5">
                                <p className="font-bold text-sm text-red-800 mb-2">
                                    Ingredient
                                </p>

                                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                    {ingredients.slice(0, 100).map((ing) => (
                                        <label
                                            key={ing}
                                            className="
                                                    flex items-center gap-2 text-sm font-normal
                                                    cursor-pointer
                                                    hover:text-orange-600
                                                "
                                        >
                                            <input
                                                type="checkbox"
                                                checked={filters.ingredient.includes(ing)}
                                                onChange={() => toggleValue("ingredient", ing)}
                                                className="accent-orange-500"
                                            />
                                            {ing}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-between gap-3 pt-2 border-t">
                                <button
                                    className="
                                        flex-1 py-2 text-sm rounded-full
                                        bg-orange-500 text-white
                                        hover:bg-orange-600
                                        transition
                                    "
                                    onClick={() => {
                                        onApply(filters);
                                        setOpen(false);
                                    }}
                                >
                                    Apply
                                </button>

                                <button
                                    className="
                                        flex-1 py-2 text-sm rounded-full
                                        border text-gray-600
                                        hover:bg-gray-100
                                        transition
                                    "

                                    onClick={() => {
                                        onClear();
                                        setOpen(false);
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default FilterDropdown;
