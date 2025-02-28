import './App.css'
import { Checkbox } from '@mui/material';  // Corrected import

const CheckBoxTest = () => {
    const label = { inputProps: { "aria-label": "CheckBox demo" } };

    return (
        <div className="left-align spacing">
            <h2 className="center-align" style={{color:'mediumpurple'}}>Dietary Preferences</h2>
            <div className="font-small">
                <label className={"equal-width-label"}>
                    <Checkbox {...label} /> Vegetarian
                </label>
                <label className={"equal-width-label"}>
                    <Checkbox {...label} /> Vegan
                </label>
            </div>

            <h2 className="center-align" style={{color:'mediumpurple'}}>Meal Category</h2>
            <div className="font-small">
                <label className={"equal-width-label"}>
                    <Checkbox {...label} /> Lunch
                </label>
                <label className={"equal-width-label"}>
                    <Checkbox {...label} /> Breakfast
                </label>
                <br />
                <label className={"equal-width-label"}>
                    <Checkbox {...label} /> Dinner
                </label>
                <label className={"equal-width-label"}>
                    <Checkbox {...label} /> Dessert
                </label>
            </div>
        </div>
    );
};

export default CheckBoxTest;

