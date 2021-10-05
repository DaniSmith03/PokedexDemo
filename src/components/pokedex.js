import React, {useState, useEffect} from "react";
import {capitalizeFirst} from "./Styling";
import axios from 'axios';
import pokeLogo from "../images/pokeLogo.png";
import SearchIcon from "@material-ui/icons/Search";
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
    TextField,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


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
    },

    toolBarClass:{
        display:'flex',
        justifyContent:'space-evenly',

    },
    searchBar:{
        display:'flex',
        backgroundColor:'#0075BE'

    },
    searchIcon:{
        alignSelf:'flex-end',
        height:'2rem',
        fontSize:'5rem',

    },
    searchInput:{
        width:'15rem',
        margin:'5px',
        marginLeft:'-1rem'
    },
});



const Pokedex=(props)=>{
    const {history}=props;
    const classes=useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
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

      const handleSearchChange = (e) => {
        setFilter(e.target.value);
      };

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
                <Toolbar className={classes.toolBarClass}>
                    <Button variant="contained" onClick={() => history.push("/Subscribe")}>
                    Subscribe
                    </Button>
                    <div className={classes.searchBar}>
                        <SearchIcon className={classes.searchIcon}/>
                        <TextField className={classes.searchInput}
                        onChange={handleSearchChange}
                        label="Pokemon Name"
                        variant="standard"
                        />
                        

                    </div>
        
                </Toolbar>
                </AppBar>
                {pokemonData ? (
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId =>
                    pokemonData[pokemonId].name.includes(filter)&&
                        getPokemonCard(pokemonId)
                        )};
                    </Grid>

                ) : (
                    <CircularProgress/>
                )}

        </React.Fragment>
    )
};

export default Pokedex;


