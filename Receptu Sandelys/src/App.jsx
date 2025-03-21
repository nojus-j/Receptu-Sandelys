import "./App.css";
import CheckBox from "./components/CheckBox.jsx";
import Recipe_Name from "./components/Recipe_Name.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Header from "./components/Header.jsx";
import FilterRecipeSlider from "./components/Filter_Recipe_Slider";

function App() {

  return (
    <>
      <Header />
      <SearchBar />
      <FilterRecipeSlider/>
        <CheckBox/>
    </>
  );
}

export default App;
