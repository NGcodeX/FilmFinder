import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
    container:{
        marginBottom:'20px',
        display:'flex',
        justifyContent:'center',
        textDecoration:'none',
        height:'490px',
    },
    card:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        flexDirection:'column',

    },
    cardRoot:{
        position:'relative',
    },
    cardMedia:{
        position:'absolute',
        top:0,
        right:0,
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0,0,0,.575)',
        backgroundBlendMode:'darken',
    },
    cardContent:{
        color:'#fff',
        width:'50%',
        [theme.breakpoints.down('sm')]:{
            width:'100%',
        }
    },
    cardContentRoot:{
        position:'absolute',
        bottom:'0',
        backgroundColor:'transparent',
    }
}));
