import React, { useContext, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useDispatch,useSelector } from 'react-redux';
import { setUser,userSelector } from '../../feautures/auth'
import { Search, Sidebar } from '..';
import fetchToken, { createSessionId, movieApi } from '../../utils';
import { useEffect } from 'react';
import { ColorModeContext } from '../../utils/ToggleColorMode';
function NavBar() {
    const {isAuthenticated,user} = useSelector(userSelector);
    console.log(isAuthenticated);
    //
    const [mobileOpen, setMobileOpen] = useState(false);
    //This is to defined different classes through our code
    const classes = useStyles();
    // Is the width is under 600 px then we are on mobile device else weareon laptop
    const isMobile = useMediaQuery('(max-width:685px)')
    // This material ui hook is to now when we are on dark/light mode
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext);
    //Get the user's token and session id
    console.log(user);
    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage =localStorage.getItem('session_id');

    const dispatch = useDispatch();
    //useEfect : synchronize component with an external sys if the token change call loginUser again
    useEffect(()=>{
        const loginUser = async ()=>{
            if(token){ 
            if(sessionIdFromLocalStorage){

                const {data:userData} = await movieApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
                 
                dispatch(setUser(userData))
            }else{
                const session_id = await createSessionId();

                const {data:userData} = await movieApi.get(`/account?session_id=${session_id}`)
                dispatch(setUser(userData))
            }
        }};
        try{

            loginUser();
        }catch(err){
            alert("Please check your internet connection and try again:).")
        }
    },[token])
    return (
        <>
            {/* Nav Bar */}
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {/* if we are on mobile i want a Menu btn followed by a sun btn to toggle theme mode */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            style={{ outline: 'none' }}
                            //To open the side bar
                            onClick={() => { setMobileOpen((previousMobileOpen) => !previousMobileOpen) }}
                            className={classes.menuBtn}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton color="inherit" sx={{ marginLeft: 1 }} onClick={colorMode.toggleColorMode}>
                        {/* <Brightness7></Brightness7> */}
                        {
                            // dark or light
                            theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />
                        }
                    </IconButton>
                    {/* When we are on desktop we want to see the search bar right after the previous btns */}
                    {!isMobile && <Search/>}
                    <div>
                        {/* On mobile as on Desktop we check if the user is not log in we show a btn to login else we show a button(containing an Avatar component) directing the user tohis/her profile and if we are on desktop we also display 'My Movies'  */}
                        {!isAuthenticated
                            ? (
                                <Button color="inherit" onClick={fetchToken}>
                                    Login &nbsp; <AccountCircle />
                                </Button>
                            ) : (
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={`/profile/${user.id}`}
                                    className={classes.linkBtn}
                                    
                                >
                                    {!isMobile && <>My Movies &nbsp;</>}
                                    {/* Display the profile icon on both cases */}
                                    <Avatar
                                        style={{ width: 30, height: 30 }}
                                        alt="Profile"
                                        src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                                    />
                                </Button>
                            )}
                    </div>
                    {/* On mobile we display the search bar after the other components */}
                    
                    {isMobile && <Search/>}

                </Toolbar>
            </AppBar>
            {/* Side Bar */}
            <div className="">
                <nav className={classes.drawer}>
                    {isMobile ? (
                        <Drawer
                            variant='temporary'
                            anchor='right'
                            // Bad practice tochange the state using its previous value onClose={()=>{setMobileOpen(!mobileOpen)}}
                            onClose={() => { setMobileOpen((previousMobileOpen) => !previousMobileOpen) }}
                            open={mobileOpen}
                            classes={{ paper: classes.drawerPaper }}
                            ModalProps={{ keepMounted: true }}>
                            <Sidebar setMobileOpen={setMobileOpen} />

                        </Drawer>
                    ) : (
                        <Drawer classes={{ paper: classes.paper }} variant='permanent' open>
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </Drawer>

                    )}
                </nav>
            </div>

        </>
    );
}
export default NavBar;
