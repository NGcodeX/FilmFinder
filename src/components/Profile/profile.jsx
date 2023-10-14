import React,{useEffect} from 'react';

import { useSelector } from 'react-redux';
import { userSelector } from '../../feautures/auth'
//Get the user name and id from the created session

import { Typography,Button,Box } from '@mui/material';
import { ExitToApp, Logout } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import {RatedCards} from '..';
export const logOut = ()=>{
  localStorage.clear();

  window.location.href = "/";
}

const Profile = ()=> {

  //Getting info about the user
  const { user } = useSelector(userSelector);
  /* get watchlist and favorites hooks */
  const {data:favoritesMovies,refetch:refetchFavorites} = useGetListQuery({listName:'favorite/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1});
  const {data:watchlistMovies, refetch:refetchWhatchlisted} = useGetListQuery({listName:'watchlist/movies',accountId:user.id,sessionId:localStorage.getItem('session_id'),page:1});


  console.log('Profile');
  const {user:{username}}=useSelector(userSelector);

  useEffect(()=>{
    refetchFavorites();
    refetchWhatchlisted();
  },[])


 
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" >
        <Typography variant='h4' gutterBottom>My Profile</Typography>
        <Button color='inherit' onClick={logOut}>
          Logout &nbsp;<ExitToApp/>
        </Button>
      </Box>
      {console.log(favoritesMovies)}
      {!favoritesMovies?.results?.length && !watchlistMovies?.results?.length
      ? <Typography variant='h5'>Add favorites or watchlist some movies to see them here! </Typography>
      : <Box> 
        {console.log(favoritesMovies)}
       <RatedCards title="Favorite Movies" data={favoritesMovies} />
       <RatedCards title="Whatchlist" data={watchlistMovies} />
      </Box>
     }
    </Box>
  );
}
export default Profile;
