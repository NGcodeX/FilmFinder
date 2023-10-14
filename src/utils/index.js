import axios from 'axios';
const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const movieApi = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params:{
        api_key:tmdbApiKey,
    }
})

const fetchToken = async ()=>{
    try {
//INFO:Step 1: Create a request token
        const {data} = await movieApi.get('/authentication/token/new')
        const token = data.request_token;
        
        
        if(data.success){
//INFO:Step 2: Ask the user for permission
            localStorage.setItem("request_token",token);
            
            window.location.href=`https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/approved`;
        }
        console.log(data);
    } catch (error) {
        console.log("Your token could not be created..."+error);
    }
}
//INFO:Create a session ID

export const createSessionId = async ()=>{
    const token = localStorage.getItem('request_token');
    if(token){
        try {
            const {data:{session_id}} = await movieApi.post('authentication/session/new',{
                request_token:token,
            });
            localStorage.setItem('session_id',session_id);
            return session_id;

        } catch (error) {
            console.log("An error has occured while trying to store the session id"+error);
        }
    }
}
export default fetchToken;