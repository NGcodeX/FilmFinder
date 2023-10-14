import React, { useEffect } from 'react'
import { Divider, List, ListItem, ListItemText, ListItemIcon, ListSubheader, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import  {selectGenreOrCategory}  from '../../feautures/currentGenreOrCategory';

//useDispatch() is to send the data from the component to redux, useSelector will now help us save that data inside our state
import { useDispatch,useSelector } from 'react-redux';
const redLogo = 'https://fontmeme.com/permalink/230929/6af85d3ed67e5c9642ecff8fc406f23f.png';
const blueLogo = 'https://fontmeme.com/permalink/230711/ba36065c234a280059a1d7d1eb69e6ce.png';

import { useGetGenresQuery } from '../../services/TMDB';


const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
]

const Sidebar = ({ setMobileOpen }) => {

    //The useSelector takes a callBack func and as params we give the entire state of the application, and we specify him which slice we want to retrieve
    const {genreIdOrCategoryName}=useSelector((state)=>state.currentGenreOrCategory);
    // console.log(genreIdOrCategoryName);
    const theme = useTheme();
    const classes = useStyles()
    const { data, isFetching } = useGetGenresQuery();
    console.log("--------------------->>");
    console.log(data);
    //This dispatch means to send data from our component to our redux
    const dispatch = useDispatch()
    
    //User info 
    useEffect(
        ()=>{
            setMobileOpen(false);
        },[genreIdOrCategoryName]
    )

    return (
        <>
            <Link to="/" className={classes.imageLink}>
                <img src={theme.palette.mode === 'light' ? blueLogo : redLogo} alt="FilmFinder logo" className={classes.image} />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {
                    categories.map(({ label, value }) => (
                        <Link key={value} className={classes.links} to='/'>
        <ListItem button onClick={() => dispatch(selectGenreOrCategory(value))}>
                                <ListItemIcon>
                                    <img src={genreIcons[label.toLowerCase()]} alt="Icon" className={classes.genreImages} height={30} />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {  (isFetching) ?
            
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
                
                :
                
                    data.genres.map(({ id, name }) => (
                        <Link key={name} className={classes.links} to='/'>
                            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                                <ListItemIcon>
                                    <img src={genreIcons[name.toLowerCase()]} alt="Icon" className={classes.genreImages} height={30} />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
            <Divider/>
            <List>
            
                <a href="https://my-portfolio-git-main-nde-dilan.vercel.app/" style={{textDecoration : "none"}}>
                            <ListItem button>
                                {/* <ListItemIcon>
                                    <img src={genreIcons[name.toLowerCase()]} alt="Icon" className={classes.genreImages} height={30} />
                                </ListItemIcon> */}
                                <ListItemText primary="NDE HURICH DILAN" />
                            </ListItem>
                            </a>
                        <ListItem button>
                                <ListItemText primary="© 2023 Film Finder, Inc." />
                            </ListItem>
            </List>
        </>
    )
}
export default Sidebar;
