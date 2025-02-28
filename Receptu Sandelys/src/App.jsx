import { useState } from 'react'
import './App.css'
import './components/Filters';

function App() {
    const [Filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
      setFilters(newFilters);
      console.log("Updated filters", newFilters);
  };

  return (
      <>
          <div>
              <h1 className="text-2xl font-bold p-4">Receptų Sandėlis</h1>
              <Filters onFilterChange={handleFilterChange}/>
              <p>Pasirinkti Filtrai: {JSON.stringify(Filters)}</p>
          </div>
      </>
  )
}

export default App
