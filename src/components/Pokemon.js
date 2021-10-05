import React, { useEffect, useState } from "react";
import axios from 'axios';
import {capitalizeFirst, getImageId} from "./Styling";
import pokeLogo from "../images/pokeLogo.png"
import { AppBar,
         Toolbar,
         Typography,
         Link,
         Box,
         Container,
         CircularProgress,
        Button,
         Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  borderContainer:{
    backgroundColor:'white',

  },

  logoContainer:{    
  display: 'block',
  paddingBottom: '20px',
  

  },
  infoContainer:{
      
    display: 'flex',
    justifyContent:'center',
    paddingBottom: '20px',
    paddingTop: '20px',
  
    
  
    },
    statsContainer:{
      borderBlockStyle:'dashed',
      borderColor:'#0075BE',
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'center',
      paddingBottom: '20px',
      paddingTop: '20px',
      marginBottom:'3rem',
    
      }
});



        


const Pokemon=(props)=>{
    const classes=useStyles();
    const {history, match}= props;
    const {params}=match;
    const {pokemonId}=params;
    const[pokemon, setPokemon]= useState(undefined);

    useEffect(()=>{
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function(response){
        const {data} = response;
        setPokemon(data);
      })
      .catch(function(error){
        setPokemon(false);
      });
    }, [pokemonId]);
    
    const generatePokemonJSX=() =>{
        const { name, id, species, height, weight, types, sprites} = pokemon;
        const newId= getImageId(id);
        console.log(newId);

        const fullImageUrl = `https://www.serebii.net/swordshield/pokemon/${newId}.png`;
        const fullShinyUrl = `https://www.serebii.net/Shiny/SWSH/${newId}.png`;

        
        const { front_default } = sprites;
        const { front_shiny } = sprites;



        return (
            <React.Fragment>
              <div className={classes.borderContainer}>

              <Typography className={classes.infoContainer} variant="h3">
                {`# ${id}.`} {capitalizeFirst(name)}
                <img src={front_default} />
                </Typography>

                <Container className={classes.infoContainer} maxWidth="sm"> 
                Standard Sprite
                <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} alt="Standard Sprite" />
                Shiny Sprite
                <img style={{ width: "300px", height: "300px" }} src={fullShinyUrl} alt="Shiny Sprite"/>
                </Container>


        <Container className={classes.infoContainer} maxWidth="sm">    
        <Typography variant="h3">Pokemon Info</Typography>
        </Container>
        <Container className={classes.statsContainer} maxWidth="sm">    
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

        </Container>
        </div>
            </React.Fragment>
        
          );
        };

    
    return(
        <React.Fragment>
          <img className={classes.logoContainer} style={{ width: "500px", height: "300px", margin: "auto" }} src={pokeLogo} alt="Logo" /> 
            <AppBar position="static">
                <Toolbar>
                <Button variant="contained" onClick={() => history.push("/")}>
          Back To Pokedex
        </Button>
                    </Toolbar>
                </AppBar>
            {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography variant="h2"> Pokemon not found</Typography>}
        </React.Fragment>
      
    );
};

export default Pokemon;
