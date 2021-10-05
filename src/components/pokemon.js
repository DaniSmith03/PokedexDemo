import React, { useEffect, useState } from "react";
import mockData from "../mockData";
import {capitalizeFirst, getImageId} from "./Styling";
import { Typography,
         Link, 
         CircularProgress,
        Button } from "@material-ui/core";





const Pokemon=(props)=>{
    const {match}= props;
    const {params}=match;
    const {pokemonId}=params;
    const[pokemon, setPokemon]= useState(mockData[`${pokemonId}`])
    
    const generatePokemonJSX=() =>{
        const { name, id, species, height, weight, types, sprites} = pokemon;
        const newId= getImageId(id);
        console.log(newId);

        const fullImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newId}.png`;
        

        
        const { front_default } = sprites;
        const { front_shiny } = sprites;



        return (
            <React.Fragment>
              <Typography variant="h1">
                {`${id}.`} {capitalizeFirst(name)}
                <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                <img style={{ width: "300px", height: "300px" }} src={front_shiny} />
            
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}> {`${name}`}</Typography>
        })}
            </React.Fragment>
        
          );
        };

    
    return(
        <React.Fragment>
            {generatePokemonJSX()}
        </React.Fragment>
      
    );
};

export default Pokemon;