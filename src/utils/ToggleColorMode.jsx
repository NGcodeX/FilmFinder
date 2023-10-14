import React,  { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';

export const ColorModeContext = createContext();

const ToggleColorMode = ({children}) => {
    const [mode, setMode] = useState("light");
    const theme = useMemo(()=>createTheme({palette:{mode}}),[mode])
    // const toggleColorMode = ()=> setMode(prev === "dark" ? "light" : "dark");
    const toggleColorMode = ()=> setMode(mode === "dark" ? "light" : "dark");
  return (
    <ColorModeContext.Provider value={{mode, setMode, toggleColorMode}}>
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode