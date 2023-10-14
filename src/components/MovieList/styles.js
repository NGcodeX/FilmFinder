import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    moviesContainer:{
        display:'flex',
        flexWrapp:'wrapp',
        // justifyContent:'space-between',
        overflow:'auto',
        [theme.breakpoints.down('sm')]:{
            justifyContent:'center',
        }
    },
}));