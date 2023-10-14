import React, { useEffect, useState } from 'react';
import { Modal,Typography,useMediaQuery,Rating,Box,Grid,ButtonGroup,Button,CircularProgress } from '@mui/material';
import { Movie as MovieIcon,Theaters,Language,PlusOne,Favorite,FavoriteBorderOutlined,Remove,ArrowBack } from '@mui/icons-material';
import {Link,useParams} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { tmdbApiKey,useGetRecommendationQuery, useGetMovieQuery,useGetCastingQuery, useGetListQuery } from '../../services/TMDB';

import  {selectGenreOrCategory}  from '../../feautures/currentGenreOrCategory';
import genreIcons from '../../assets/genres';
import useStyles from './styles';
import {MovieList}  from '..';
import { userSelector } from '../../feautures/auth';


const MovieInfo = (props) => {

  
  const {id} = useParams();
  const {data,isFetching,error} = useGetMovieQuery(id); 


  const { user } = useSelector(userSelector);

  // const fetchCasting= async ()=>{
  //   const cast = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits&api_key=${tmdbApiKey}`);
  //   console.log(cast);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setisMovieWatchlisted] = useState(false);
  
 
  // fetchCasting(); 

  const dispatch = useDispatch();
  const classes = useStyles();

  const dataCast = useGetCastingQuery(id);
  const {data:recommendation,isFetching:isRecommendationFetching}= useGetRecommendationQuery({list:'/recommendations',movie_id:id});
  console.log(recommendation);
  /* get watchlist and favorites hooks */
  const {data:favoritesMovies,refetch:refetchFavorites} = useGetListQuery({listName:'favorite/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1});
  const {data:watchlistMovies, refetch:refetchWhatchlisted} = useGetListQuery({listName:'watchlist/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1});


  //To know if the movie was watchlisted or not (favorited or not)
  useEffect(() => {
    setIsMovieFavorited(!!favoritesMovies?.results?.find((movie)=>movie?.id===data?.id));
  }, [favoritesMovies, data])
  
  useEffect(() => {
    setisMovieWatchlisted(!!watchlistMovies?.results?.find((movie)=>movie?.id===data?.id));
  }, [watchlistMovies, data])
  

     /* Add to watch list and favorites functions */
     const addToFavorites = async ()=>{
      await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
        media_type:'movie',
        media_id:id,
        favorite:!isMovieFavorited,
      });
      console.log("isMovieFavorited----------------->");
      console.log(isMovieFavorited);
      setIsMovieFavorited((prev)=>!prev);
    }
    const addToWatchList = async ()=>{
      await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
        media_type:'movie',
        media_id:id,
        watchlist:!isMovieWatchlisted,
      });
      setisMovieWatchlisted((prev)=>!prev);
      console.log(isMovieWatchlisted);
  
    }
  
  //open the modal with the trailer

  const [open, setOpen] = useState(false);

  
  //Getting the id from the url

  // console.log(data.poster_path);
  if(isFetching){
    return(
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem"/>
      </Box>
    )
  }
  if(error){
    return(
      <Box display="flex" justifyContent="center" alignItems="center">
       <Link to='/' >Something has gone wrong , please just go back.</Link>
      </Box>
    )
  }
  return (
    <Grid container className={classes.container}>
      <Grid item sm={12} lg={4} style={{display:'flex'}}>
        <img 
        className={classes.poster}
        alt={data.original_title}
        src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}/>
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant='h3' align='center' gutterBottom>{data?.title} ({data.release_date.split('-')[0]})</Typography>
        <Typography variant='h5' align='center'gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.container}>
          <Box display='flex' alignItems='center'>
            <Rating readOnly value={data?.vote_average/2}/>
            <Typography variant='subtitle1' gutterBottom style={{marginLeft:'10px'}}>
              {data?.vote_average} /10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime} mins {`| Language: ${data?.spoken_languages[0]?.name}`} 
          </Typography>
        </Grid>
        <Grid item className={classes.genres}>
          {data?.genres?.map((genre,index)=>(
            <Link key={index} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} alt="Icon" className={classes.genreImage} height={30} />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{marginTop:'10px'}}>Overview</Typography>
        <Typography style={{marginBottom:'2rem'}}>{data?.overview}</Typography>
        <Typography variant='h5' gutterBottom >Top Cast</Typography>
        <Grid item container spacing={2}>

          {dataCast && dataCast.data?.cast?.map((character,index)=>(
          character.profile_path && (
      <Grid item key={index} xs={4} md={2} component={Link} to={`/actor/${character.id}`} style={{textDecoration:'none'}}>

            <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name}/>
            <Typography color='textPrimary'>{character?.name}</Typography>
            <Typography color='textSecondary'>{character?.character.split('(')[0]}</Typography>
          </Grid>)
          )).slice(0,6)}
        </Grid>
        <Grid item container style={{marginTop:'2rem'}}>
          <div className={classes.btnContainer}>
            <Grid item xs={12} sm={6} className={classes.btnContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button target="_blank" rel="no openner noreferer" href={data?.homepage}  endIcon={<Language/>}>Website</Button>
                <Button target="_blank" rel="no openner noreferer" href={`https://www.imdb.com/title/${data?.id}`}  endIcon={<MovieIcon/>}>IMDB</Button>
                <Button onClick={()=>{setOpen(true)}} href='#' endIcon={<Theaters/>}>Trailer</Button>
              </ButtonGroup>
            </Grid> 
            <Grid item xs={12} sm={6} className={classes.btnContainer}>
              <ButtonGroup size='small' variant='outlined'>
                
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> : <Favorite/> }>{isMovieFavorited ? 'Unfavorite' : 'Favorite'} </Button>

                <Button onClick={addToWatchList} endIcon={isMovieWatchlisted ? <Remove/> : <PlusOne/> }>Watchlist </Button>
                <Button endIcon={<ArrowBack/>} sx={{borderColor:'primary.main'}}>
                  <Typography sx={{textDecoration:'none'}} component={Link} to="/" color="inherit">
                    Back
                  </Typography>
                </Button>
                </ButtonGroup>
            </Grid> 
          </div>
        </Grid>
      </Grid> 

      <Box marginTop="5rem" width="100%">
        <Typography variant='h3' gutterBottom align='center'>You might also like</Typography>
        {/* Loop throug the recommended movie */}
        {recommendation ?
        <MovieList movies={recommendation} numberOfMovie={12}/>
      :
      <Box>Sorry Nothing Was Found ...</Box>}
      </Box>
         {console.log(data.videos.results[0])}

      <Modal
      closeAfterTransition
      className={classes.modal}
      open={open}
      onClose={()=>setOpen(false)}
      >

        {data?.videos?.results.length>0 && (
          <iframe
          autoPlay
          className={classes.video}
          frameBorder='0'
          title='Trailer'
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          />
        )}

      </Modal>
    </Grid>
)
};
export default MovieInfo;
