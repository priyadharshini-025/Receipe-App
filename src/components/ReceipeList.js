import ReceipeCard from "./ReceipeCard";

function ReceipeList({ receipes, loading, error }) {
    if (loading) {
        return <p className="p-6 text-center">Loading receipes...</p>;
    }

    if (error) {
        return <p className="p-6 text-center text-red-500">{error}</p>;
    }

    if (!receipes.length) {
        return <p className="p-6 text-center">No meals found</p>;
    }

    return (
        <div className="    
        max-w-6xl mx-auto p-4
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4">
            {receipes.map((meal) => (
                <ReceipeCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
    );
}

export default ReceipeList;