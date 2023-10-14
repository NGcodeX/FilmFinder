import { makeStyles } from "@mui/styles";

const drawerWidth=240
export default makeStyles((theme) => ({
    toolbar: {
        display:'flex',
        height:'80px',
        // width:'100%',
        // paddingLeft:'0',
        justifyContent:'space-between',
        marginLeft:'240px',
        //For this .down towork don't forget tosetup a ThemeProvider inside the index.js file
        [theme.breakpoints.down('sm')]:{
            
            marginLeft:'0',
            flexWrap:'wrap',
            paddingLeft:'0',
            height:'90px',
        }
     },
     menuBtn:{
        marginRight:theme.spacing(2),
        //when we reach a width up than sm we change the display to none
        [theme.breakpoints.up('sm')]:{
            display:'none',
        }
     },
     drawer:{
        //We want it to appear when we aren't on mobile device
        [theme.breakpoints.up('sm')]:{
            width:drawerWidth,
            flexShrink:0,
        },
     },
     drawerPaper:{
        //This is to demonstrate that we can use js expression directly inside css such as variable or if condition
        width:drawerWidth,
     },
     linkBtn:{
        //This is the code for the hover effect in CSS in JS
        '&:hover':{
            color:'white !important',
            textDecoration:'none',
        },
     },
}));
