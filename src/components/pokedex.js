import React, {useState, useEffect} from "react";
import {capitalizeFirst} from "./Styling";
import axios from 'axios';
import pokeLogo from "../images/pokeLogo.png";
import{
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    CardMedia,
    Typography,
    Button,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import mockData from '../mockData';
import { CenterFocusStrong } from "@material-ui/icons";

const useStyles = makeStyles({
    pokedexContainer:{
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',

    },
    cardMedia:{
        margin: 'auto',
    },
    cardContent: {
        textAlign: 'center',
    },
    logoContainer:{
        
    display: 'block',
    paddingBottom: '20px',
    

    }
});



const Pokedex=(props)=>{
    const {history}=props;
    const classes=useStyles();
    const [pokemonData, setPokemonData] = useState({});

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=800`)
        .then(function (response) {
            const { data } = response;
            const { results } = data;
            const newPokemonData = {};
            results.forEach((pokemon, index) => {
              newPokemonData[index + 1] = {
                id: index + 1,
                name: pokemon.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`,
              };
            });
            setPokemonData(newPokemonData);
          });
      }, []);

const getPokemonCard=(pokemonId)=>{
    console.log(pokemonData[`${pokemonId}`])
    const { id, name } = pokemonData[`${pokemonId}`]
    const sprite=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return(
    <Grid item xs={12} sm={4} key={pokemonId}>
        <Card onClick={()=> history.push(`/${pokemonId}`)}>
            <CardMedia
                className={classes.cardMedia}
                image={sprite}
                style={{ width: "130px", height: "130px"}}
                />
            <CardContent className={classes.cardContent}>
                <Typography>{`${id}. ${capitalizeFirst(name)}`}</Typography>
            </CardContent>
        </Card>
    </Grid>
    )
}


    return(
        <React.Fragment>
            <img className={classes.logoContainer} style={{ width: "500px", height: "300px", margin: "auto" }} src={pokeLogo} alt="Logo" /> 
            <AppBar position="static">
                <Toolbar>
                    <Button variant="contained" onClick={() => history.push("/Subscribe")}>
          Subscribe
        </Button></Toolbar>
                </AppBar>
                {pokemonData ? (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId =>
                        getPokemonCard(pokemonId)
                        )};
                    </Grid>

                ) : (
                    <CircularProgress/>
                )};

        </React.Fragment>
    )
};

export default Pokedex;