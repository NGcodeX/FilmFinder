import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
   container:{
    display:'flex',
    justifyContent:'space-around',
    margin:'10px 0 !important',
    [theme.breakpoints.down('sm')]:{
        flexDirection:'column',
        flexWrap:'wrap',
    }
   },
   btnContainer:{
    display:"flex",
    justifyContent:"space-between",
    width:"100%",
    [theme.breakpoints.down('sm')]:{
        flexDirection:"column",
    },
   },
   poster:{
    borderRadius:'20px',
    boxShadow:'0.5em 1em 1em rgb(64,64,64)',
    width:'80%',
    [theme.breakpoints.down('md')]:{
        width:'50%',
        height:'350px',
        margin:'0 auto',
    },
    [theme.breakpoints.down('sm')]:{
        width:'100%',
        height:'350px',
        margin:'0 auto',
        marginBottom:'30px',
    }
   }

}));