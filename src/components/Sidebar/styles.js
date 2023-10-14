import { makeStyles } from "@mui/styles";

export default makeStyles(theme=>({
    imageLink:{
        display:'flex',
        justifyContent:'center',
        padding:'10% 0',
    },
    image:{
        width:'70%',
    },
    links:{
        color: theme.palette.text.primary,
        textDecoration:'none',
    },
    genreImages:{
        // the invert func is a css func() that takes a value(0-1 or %) and inverse proportionaly the color of the given image
        filter: theme.palette.mode === 'dark'? 'invert(1)': 'dark'
    }
}))