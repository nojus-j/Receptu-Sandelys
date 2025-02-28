import './Recipe.css';

const Recipe_Name = () => {
    return (
        <div>
            <div style={{textAlign: "left"}} className="image-container">
                <img className="recipe-image" src={Image} alt="Recipe Image" />
            </div>
            <h3 style={{textAlign: "left"}}>Recipe</h3>
            <p style={{textAlign: "left"}}>Description and ingredients for the recipe</p>
        </div>
    )
}
export default Recipe_Name;