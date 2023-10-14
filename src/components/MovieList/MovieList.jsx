import React from "react";
import { Grid } from "@mui/material";
import useStyles from './styles';
import {Movie} from "..";


const MovieList = ({movies,numberOfMovie, excludeFirst}) => {

  const startFrom = excludeFirst ? 1 : 0;
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>
      {(movies?.results ? movies?.results: movies).slice(startFrom,numberOfMovie).map((movie,index)=>(
        <Movie key={index} movie={movie} index={index}/>
      ))}
      </Grid>
  )
}

export default MovieList;
