import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, UseMediaQuery, Typography, useMediaQuery } from '@mui/material';
//redux stuff
import { useSelector } from 'react-redux';
//Api calls
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovie } from '..';
//INFO: Adding the pagination functionality 25/09
//TODO: check this (min-width:900px and max-width:1030px) and arrange the UI from 900px to 1030px
//INFO: Found something for the mediaquerries, theme.breakpoints.between(start, end)
const Movies = () => {

  const large = useMediaQuery('(min-width:900px and max-width:1030px)');
  const numberOfMovies = large ? 17 : 19;


  const [page, setPage] = useState(1);
  
  const {genreIdOrCategoryName, searchQuery}=useSelector((state)=>state.currentGenreOrCategory);
  //Now that we have the info about the category or genre let's fetch data base on that
  const { data,error,isFetching } = useGetMoviesQuery({genreIdOrCategoryName,page,searchQuery});
  //the data passed here are getting intercepted inside the tmdb.js service
  if(isFetching){
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem"/>
      </Box>
    )
  }
  if(!data?.results?.length){
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant='h4'>
      No movies that matches that name.
      <br />
      Please search for something else.
        </Typography>
      </Box>
    )
  }
  if(error){
    console.log(error)
    return " An error has occured."
  }
  console.log(data);
  return (
    <div className="">
      <FeaturedMovie movie={data?.results[0]}/>
      <MovieList movies={data} numberOfMovie={9} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  );
}
export default Movies;
