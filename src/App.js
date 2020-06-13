import React from "react";
import Pizza from "./components/Pizza";
import {Link, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      <Route exact path='/'>
        <h1>Lambda Eats</h1>
        <Link to='/pizza'>Click here to get started!</Link>
      </Route>
      <Route path="/pizza">
        <Pizza />
      </Route>
    </>
  );
};
export default App;
