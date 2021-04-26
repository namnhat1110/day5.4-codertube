import { Switch, Route } from "react-router-dom";
import { useEffect } from 'react'
import './App.css';

import HomePage from "./pages/HomePage"
import MovieDetailPage from "./pages/MovieDetailPage"




function App() {

  useEffect(() => {
    const appState = localStorage.getItem("imdbState");
    if (!appState) {
      localStorage.setItem("imdbState", JSON.stringify({
        movies: [
          { id: "treo", comments: [] }
        ]
      }))
    } else {
    }
  }, [])


  return (
    <div className="App">

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movie/:id" component={MovieDetailPage} />
      </Switch>
    </div>
  );
}

export default App;
