import "./App.css";
import CheckBox from "./components/CheckBox.jsx";
import Recipe_Name from "./components/Recipe_Name.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Header from "./components/Header.jsx";
import FilterRecipeSlider from "./components/Filter_Recipe_Slider";
import Sidebar from "./components/Sidebar.jsx";

function App() {

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4">
          <SearchBar />
          <FilterRecipeSlider />
          <CheckBox />
        </div>
      </div>
    </>
  );
}

export default App;
