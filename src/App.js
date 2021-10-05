import React from "react";
import {Route, Switch} from "react-router-dom";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import Subscribe from "./components/Subscribe";





function App() {

  return (
    <Switch>
      <Route exact path="/" component={Pokedex}/>;
      <Route exact path="/subscribe" component={Subscribe}/>;
      <Route exact path="/:pokemonId" component={Pokemon}/>;

      



    </Switch>
  
  );
}







export default App;
