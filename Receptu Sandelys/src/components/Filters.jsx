import {useState} from "react";

// eslint-disable-next-line react/prop-types
const Filters = ({onFilterChange}) => {
    const [filters, setFilters] = useState({
        vegetarian: false,
        vegan: false,
        breakfast: false,
        dinner: false,
        dessert: false,
    });

    const handleChange = (event) => {
        const {name, checked} = event.target;
        const newFilters = {...filters, [name]: checked};
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="p-4 bg-yellow-100 border">
            <h2 className = "text-lg font-bold">Dietary Preferences</h2>
            <label>
                <input type = "checkbox" name = "vegetarian" checked = {filters.vegetarian} onChange = {handleChange} />
            Vegetarian
            </label>
        </div>
    );
};
export default Filters;