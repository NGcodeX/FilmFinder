import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
    movie:{
        padding:'10px',
    },
    links:{
        textDecoration:'none',
        alignItems:'center',
        fontWeight:'bolder',
        [theme.breakpoints.up('xs')]:{
            display:'flex',
            flexDirection:'column',
        },
        '&:hover':{
            cursor:'pointer',
            
        },
    },
    image:{
        borderRadius:'20px',
        height:'360px',
        marginBottom:'10px',
        // marginLeft:'10px',
        // marginRight:'10px',
        '&:hover':{
            transform:'scale(1.05)',
        },
    },
    title:{
        color:theme.palette.text.primary,
        textOverflow:'ellipsis',//if we have a long title cut it and add ...
        width:'230px',
        whiteSpace:'nowrap',
        overflow:'hidden',
        marginTop:'10px',
        marginBottom:'0px',
    },
}));
