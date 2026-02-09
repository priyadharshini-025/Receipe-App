import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

function Header({
  onSearch,
  onFilterApply,
  onFilterClear,
  filters,
  setFilters,
}) {
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const updateFavorites = () => {
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavCount(favs.length);
    };

    updateFavorites(); // initial load
    window.addEventListener("favoritesUpdated", updateFavorites);

    return () =>
      window.removeEventListener("favoritesUpdated", updateFavorites);
  }, []);

  return (
    <header
      className="
        sticky top-0 z-50
        bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
        px-4 md:px-8 py-4
        mb-5
        shadow-lg
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          flex items-center justify-between
          gap-4
          flex-col sm:flex-row
        "
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 text-white">
          <img src="./favicon.png" alt="cooksmart logo" className="w-10"/>
          <h1 className="text-xl font-bold tracking-wide">
            CookSmart
          </h1>
        </div>

        {/* SEARCH + FILTER (CENTER) */}
        <div
          className="
            flex items-center gap-3
            w-full sm:w-auto
            justify-center
            flex-wrap sm:flex-nowrap
          "
        >
          <SearchBar onSearch={onSearch} />

          <FilterDropdown
            filters={filters}
            setFilters={setFilters}
            onApply={onFilterApply}
            onClear={onFilterClear}
          />
        </div>

        {/* FAVORITES */}
        <Link
          to="/favorites"
          className="
            relative flex items-center gap-2
            text-white font-medium
            hover:scale-105 transition
          "
        >
          <i
            className={`
              fa-solid fa-heart text-xl transition
              ${favCount > 0 ? "text-red-500" : "text-white/60"}
            `}
          ></i>

          <span className="sm:inline">Favourites</span>

          {favCount > 0 && (
            <span
              className="
                absolute -top-2 -right-3
                bg-red-600 text-white
                text-xs font-semibold
                w-5 h-5 rounded-full
                flex items-center justify-center
              "
            >
              {favCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
