import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ReceipeList from "./components/ReceipeList";
import ReceipeDetails from "./components/ReceipeDetails";
import Favorites from "./components/Favorites";
import "./App.css"

import {
    searchReceipe,
} from "./api";

function App() {
    const [visibleMeals, setVisibleMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [filters, setFilters] = useState({
        category: [],
        ingredient: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // initial load
    useEffect(() => {
        loadDefaultMeals();
    }, []);

    const loadDefaultMeals = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await searchReceipe("");
            setVisibleMeals(data);
        } catch {
            setError("Failed to load meals");
        } finally {
            setLoading(false);
        }
    };


    const fetchCombinedResults = async (term = searchTerm, currentFilters = filters) => {
        console.log("fetchCombinedResults fn")
        setLoading(true);
        setError("");

        try {
            let results = [];

            // STEP 1: Search first
            if (term) {
                results = await searchReceipe(term);
            } else {
                results = await searchReceipe("");
            }

            // STEP 2: Apply filters on searched data
            if (currentFilters.category.length) {
                results = results.filter((meal) =>
                    currentFilters.category.includes(meal.strCategory)
                );
            }

            if (currentFilters.ingredient.length) {
                results = results.filter((meal) =>
                    currentFilters.ingredient.some((ing) =>
                        Object.keys(meal)
                            .filter((k) => k.startsWith("strIngredient"))
                            .some((k) =>
                                meal[k]?.toLowerCase().includes(ing.toLowerCase())
                            )
                    )
                );
            }

            setVisibleMeals(results);
            console.log("fetch combined results")
        } catch {
            setError("Failed to load meals");
        } finally {
            setLoading(false);
        }
    };

    // Search
    const handleSearch = async (term) => {
        setSearchTerm(term);
        fetchCombinedResults(term);
    };

    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);
        fetchCombinedResults(searchTerm, newFilters);
    };


    const clearFilters = () => {
        const cleared = { category: [], ingredient: [] };
        setFilters(cleared);
        fetchCombinedResults(searchTerm, cleared);
    };

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-[#F0FDFA]">
                <Header
                    onSearch={handleSearch}
                    onFilterApply={handleFilterApply}
                    onFilterClear={clearFilters}
                    filters={filters}
                    setFilters={setFilters}
                    setVisibleMeals={setVisibleMeals}
                    setLoading={setLoading}
                    setError={setError}
                />


                <Routes>
                    <Route
                        path="/"
                        element={
                            <ReceipeList
                                receipes={visibleMeals}
                                loading={loading}
                                error={error}
                            />
                        }
                    />
                    <Route path="/receipe/:id" element={<ReceipeDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
