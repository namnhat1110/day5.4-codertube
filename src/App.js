import { Switch, Route } from "react-router-dom";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage"
import MovieDetailPage from "./pages/MovieDetailPage"



function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies/:id" component={MovieDetailPage} />
      </Switch>
    </div>
  );
}

export default App;
