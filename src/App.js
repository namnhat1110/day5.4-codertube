import { Switch, Route } from "react-router-dom";
import './App.css';

import HomePage from "./pages/HomePage"
import MovieDetailPage from "./pages/MovieDetailPage"



function App() {
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
