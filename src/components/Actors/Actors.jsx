import React, {useState} from 'react';
import {Link,useParams, useHistory} from 'react-router-dom';
import { useGetActorInfoQuery, useGetActorMovieInfoQuery } from '../../services/TMDB';
import { Box, Button, ButtonGroup, CircularProgress, Grid, Typography } from '@mui/material';
import useStyles from './styles';
import { ArrowBack } from '@mui/icons-material';
import {MovieList,Pagination} from '..';
function Actors() {

    const classes = useStyles();

    const [page, setPage] = useState(1);

    const history = useHistory();
    console.log(history);
    
    const {id} = useParams();
    const {data:movies,isFetching:isFetch,error:err} = useGetActorMovieInfoQuery({id,page});
    const data1 = useGetActorMovieInfoQuery(id);
    console.log("movies----------------------------------->");
    console.log(movies);

    const {data,isFetching,error} = useGetActorInfoQuery(id);
    // console.log(data);
    if(isFetching || isFetch){
        return(
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size="8rem"/>
          </Box>
        )
      }
      if(error || err){
        return(
          <Box display="flex" justifyContent="center" alignItems="center">
           <Link to='/' >Something has gone wrong , please just go back.</Link>
          </Box>
        )
      }
    return (
        <Grid container className={classes.container}>
            <Grid item sm={12} lg={4} >
                <img 
                className={classes.poster}
                alt={data?.name}
                src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}/>

            </Grid>

            <Grid item container direction="column" lg={7}>
                <Typography variant='h2' align='center' gutterBottom>{data?.name}</Typography>
                <Typography variant='h3' align='center' gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
                <Typography 
                variant='body1'
                style={{marginBottom:'2rem'}}>{data?.biography || 'Sorry no biography yet...'}</Typography>
                <Box variant='outline'
                display='flex'
                justifyContent='space-around' 
                xs={12} sm={6} className={classes.btnContainer}>
               
                    <Button
                    variant="contained" 
                    color='primary'
                    target='_blank' 
                    rel='no opener noreferer' href={`https://www.imdb.com/name/${data?.imdb_id}`}><Typography sx={{borderColor:'primary.main'}} >IMDB</Typography></Button>

                    <Button 
                    startIcon={<ArrowBack/>} 
                    onClick={()=> history.goBack()}
                    sx={{borderColor:'primary.main'}}>
                  <Typography sx={{textDecoration:'none'}} color="inherit">
                    Back
                  </Typography>
                </Button>

            </Box>
            </Grid>
           

            <Box margin="2rem 0" width="100%">
        <Typography variant='h3' gutterBottom align='center'>Movies</Typography>
        {/* Loop throug the recommended movie */}
        {movies &&
        <MovieList movies={movies} numberOfMovie={12}/>
      }
      <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
        </Grid>
    );
}
export default Actors;
