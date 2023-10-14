import React, {useRef} from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { Actors, Movies, MovieInfo, NavBar, Profile } from './index';

import useStyles from './style'
 //AI voice assistant
import useAlan from './Alan';
const App = () => {
  // using UseStyles as a hook (//TODO:Make a research on it)
  const classes = useStyles();

  const alanBtnContainer = useRef();

  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={["/","/approved"]}><Movies /></Route>
          <Route exact path="/movie/:id"><MovieInfo /></Route>
          <Route exact path="/actor/:id"><Actors /></Route>
          <Route exact path="/profile/:id"><Profile /></Route>
        </Switch>
      </main>
      <div ref={alanBtnContainer}/>
    </div>
  );
}

export default App;
