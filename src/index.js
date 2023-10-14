import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css'
//react-router-dom setup
import { BrowserRouter } from 'react-router-dom';
//Material ui  setup
//For the material theme to work
// import { createTheme,ThemeProvider } from '@mui/material';
//Redux setup
import { Provider } from 'react-redux';
//The store represents the entire state of the app
import store from './app/store'
import ToggleColorModeProvider from './utils/ToggleColorMode';
// const theme = createTheme({
//   palette:{
//     mode:'dark',
//   }
// });

ReactDOM.render(

  <Provider store={store}>
    <ToggleColorModeProvider>
      
        <BrowserRouter>
          <App />
        </BrowserRouter>
      
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById('root'),
);
