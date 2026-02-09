import { useState } from "react";

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        e.preventDefault();
        setTerm(value);
        onSearch(value);
    };

    return (
        <form className="w-full">
            <input
                type="text"
                placeholder="Search recipes..."
                value={term}
                onChange={(e) => handleChange(e)}
                className="
                    w-full sm:w-64
                    px-4 py-2
                    rounded-full
                    focus:outline-none
                    focus:ring-2 focus:ring-accent
                    bg-white/90
                    focus:bg-white
                    placeholder-gray-500
                    shadow-inner
                    "
            />
        </form>
    );
}
export default SearchBar


