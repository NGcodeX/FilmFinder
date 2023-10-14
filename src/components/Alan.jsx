import React, { useContext, useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';
import fetchToken from '../utils';
import { logOut } from './Profile/profile';
import { searchMovie, selectGenreOrCategory } from '../feautures/currentGenreOrCategory';
// import logOut from './Profile/profile';
//TODO: Ask chatGPT when to know u have to use {} or not when importingthing in reactjs
const useAlan = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {setMode} = useContext(ColorModeContext);
    useEffect(() => {
        alanBtn({
            key: '75a38f9a7b7efe5381f02dea8279ed682e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command, mode,genres, genreOrCategory, query}) => {
                switch(command){
                    case 'changeMode':
                      if(mode==='light'){
                          setMode('light');
                      }else{
                          setMode('dark');
      
                      }
                    case 'login':
                        fetchToken()
                    case 'logout':
                        logOut()
                    case 'chooseGenre':
                        const foundGenre = genres.find(g => g.name.toLowerCase() === genreOrCategory.toLowerCase());
                        if(foundGenre){
                            history.push('/');
                            dispatch(selectGenreOrCategory(foundGenre.id))
                        } else {
                            const category = genreOrCategory.startsWith("top") ? 'top_rated' :genreOrCategory;
                            history.push('/');
                            dispatch(selectGenreOrCategory(category));
                        }
                    case 'search':
                        dispatch(searchMovie(query));
                    }
                }
            })
        },[]);
}

export default useAlan;
/*// {Name: Basic_example_for_AI_assistant}
// {Description: Learn how to create a dialog script with voice/text commands and text corpus for question answering}

// Use this sample to create your own voice/text commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});

const genres = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'}
];


intent(["What can this app do?","What can I do here?","What functionalities does this application offer?",
        "What are the capabilities of this app?",
        "What features are available in this application?",
        "What tasks can be performed using this app?",
        "What are the app's capabilities?",
        "What is possible with this application?",
        "What can I achieve using this app?",
        "What actions can be taken within this application?",
        "What does this app allow me to do?",
        "What are the functionalities provided by this application?"], p=> {
    p.play({command:'openInfo'});
    p.play("This is FilmFinder, an app where you can find the movies you love. Try saying 'Go to comedy', 'Surprise me','Search for Superman','Make it dark'");

})


const stringifieldGenres = genres.map(({name}) => name.toLowerCase()).join("|");

intent(`go to $(GENRE ${stringifieldGenres}|top rated|popular|upcoming)`, p=>{
    p.play(`Going to  for ${p.GENRE.value} category`);
    p.play({command:'search', query:p.GENRE.value,genres,p})
});

intent(`Search  $(QUERY* (.*))`, p=>{
    p.play(`Searching for ${p.QUERY.value}`);
    p.play({command:'search', query:p.QUERY.value})
});

intent(["It's Halloween" , "I want to get scared"], p=>{
    p.play({command:'chooseGenre', genre:"Horror",genres,p});
    p.play(`When witches Go Riding and Black Cats Are Seen: The Moon Laughs and Whispers - It's Halloween`);
});

intent("Surprise me", p=>{
    const selectedCategory = genres[Math.floor(Math.random()*genres.length)].name;
    p.play(`Sounds good. Enjoy some ${selectedCategory} movies`);
    p.play({command:'chooseGenre', genre:selectedCategory,genres,p});
});

intent(["Give me something funny" , "I want to laugh"], p=>{
    p.play({command:'chooseGenre', genre:"Comedy",genres,p});
    p.play(`Comedy it is. Enjoy!`);
});

intent("Make it dark", p=>{
    p.play({command:'changeMode', mode:'dark'});
     p.play(`Batman likes this, I hopeyou will qs well.`);
});

intent("Make it light", p=>{
    p.play({command:'changeMode', mode:'light'});
     p.play(`Ahh, my eyes hurt. Looks good though! I hope you like it.`);
});

intent(["Login" , "Log in"], p=>{
    p.play(`Logging you in. Enjoy!`);
    p.play({command:'login'});
});

intent(["Logout" , "Log out"], p=>{
    p.play(`Logging you out. Enjoy!`);
    p.play({command:'logout'});
});
// Give your AI assistant some knowledge about the world
corpus(`
    Hello, I'm Alan.
    This is a demo application.
    You can learn how to teach Alan useful skills.
    I can teach you how to write Alan Scripts.
    I can help you. I can do a lot of things. I can answer questions. I can do tasks.
    But they should be relevant to this application.
    I can help with this application.
    I'm Alan. I'm a virtual assistant. I'm here to help you with applications.
    This is a demo script. It shows how to use Alan.
    You can create dialogs and teach me.
    For example: I can help navigate this application.
`);
 */