import React from "react";
import Paypal from './Paypal';
import pokeLogo from "../images/pokeLogo.png"
import { GitHub } from "@material-ui/icons";
import { AppBar,
         Toolbar,
         Typography,
         Button,
         Paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    borderContainer:{
        backgroundColor:'white',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    
      },
    logoContainer:{    
    display: 'block',
    paddingBottom: '20px',
    },
    Center:{
        textAlign:'center',
    },
    gitHub:{
        paddingBottom:'2rem',
        fontSize:'5rem',
        color: 'purple',
    '&:hover': {
    color: 'yellow',
    },
    }

});


const Subscribe=(props)=>{
    const pay= Paypal();
    const classes=useStyles();
    const {history, match}= props;
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
                    <div className={classes.borderContainer}>
                        <div>
                        <h1 className={classes.Center}>Donations Welcome!</h1>
                        <Typography className={classes.Center} style={{ paddingBottom:'1rem'}}>
                            Thank you for interacting with this Pokemon Pokedex Demon project. If you would make a monetary contribution to this site for the use of the source code on gitHub or simply because you enjoyed it, please feel free to do so below. 
                            Thank you! 
                             
                        </Typography>
                        <Typography className={classes.Center} style={{ paddingBottom:'2rem'}}>
                        *** Note: This is a MOCK donation, no actual monetary donations will be accepted at this time and source code is free to copy and re-use

                        </Typography>
                        </div>
                        <GitHub className={classes.gitHub} onClick={event =>  window.location.href='https://github.com/DaniSmith03/PokedexDemo.git'} />
                        
                
                    {pay}
                    
                    
                </div>
                

        {/* Paypal Component Code */}









               
            </React.Fragment>
        
          
    );


   





};

export default Subscribe;
