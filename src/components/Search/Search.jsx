import React from 'react';
import { useState,useEffect } from 'react';
import { TextField,InputAdornment } from '@mui/material';   
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch,useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import useStyles from './styles';
import { searchMovie } from '../../feautures/currentGenreOrCategory';

const Search = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');

    //Essai sur l'arrangement des pb du responsive
    const location = useLocation();

    const handleKeyPress = (event)=>{
      if(event.key==='Enter'){
        console.log(event.key+""+query);
        dispatch(searchMovie(query));
        console.log(event.key);
      }
    };
    if(location.pathname !=='/') return null;
  return (
    <div className={classes.searchContainer}>
        <TextField 
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e)=>{setQuery(e.target.value)}}
        variant='standard'
        //styliser l'input
        InputProps={{
          className:classes.input,
          startAdornment:(
            // un ornement
            <InputAdornment position='start'>
              <SearchIcon/>
            </InputAdornment>
          )
        }}
        />
    </div>
  )
}

export default Search