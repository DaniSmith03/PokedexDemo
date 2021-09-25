import React from "react";
import {Route, Switch} from "react-router-dom";
import pokedex from "./components/pokedex";
import pokemon from "./components/pokemon";
import subscribe from "./components/subscribe";
// import Default from "./components/default";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={pokedex}/>;
      <Route exact path="/subscribe" component={subscribe}/>;
      <Route exact path="/subscribe" component={subscribe}/>;
      {/* <Route component={Default}/>; */}
      <Route exact path="/:pokemonId" component={pokemon}/>;
      



    </Switch>
  
  );
}

export default App;
