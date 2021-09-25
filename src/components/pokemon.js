import React from "react";

const pokemon=props=>{
    const {match}= props;
    const {params}=match;
    const {pokemonId}=params;
    return(
        <div>
            {`This is the pokemon page for pokemon#${pokemonId}`}
        </div>
    )
};

export default pokemon;