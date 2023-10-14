import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
   container:{
    display:'flex',
    justifyContent:'space-around',
    margin:'10px 0 !important',
    [theme.breakpoints.down('sm')]:{
        padding:'0',
        flexDirection:'column',
        width:'100%',
        flexWrap:'wrap',
        marginBottom: '2rem',
    }
   },
   poster:{
    borderRadius: '20px',
    boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto !important',
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto !important',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
   },
   genres:{
    margin:'10px 0 !important',
    display:'flex',
    justifyContent:'space-around',
    flexWrap:'wrap',
   },
   genreImage:{
    filter:theme.palette.mode === 'dark' && 'invert(1)',
    marginRight:'10px',

   },
   links:{
    display:'flex',
    textDecoration:'none',
    color:'aqua',
    justifyContent:'center',
    alignItems:'center',
    [theme.breakpoints.down('sm')]:{
        padding:'0.5rem 1rem',
    },
   },
   castImage:{
    width:'100%',
    maxWidth:'7em',
    height:'8em',
    objectFit:'cover',
    borderRadius:'10px',
   },
   btnContainer:{
    display:"flex",
    justifyContent:"space-between",
    width:"100%",
    [theme.breakpoints.down('sm')]:{
        flexDirection:"column",
        justifyContent:"center",
        // margin:'100px',
    },
   },
   modal:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
   },
   video:{
    width:'50%',
    height:'50%',
    [theme.breakpoints.down('sm')]:{
        width:'90%',
        height:'90%',
    }

   }

}));
