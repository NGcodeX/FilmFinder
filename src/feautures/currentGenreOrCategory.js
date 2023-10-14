//Le state total de l'app est comme un gateau et createSlice nous permet de prendre juste une partie de ce gateau, et de l'isoler à part. Dans notre cas nous isolons les categories et/ou genres à part pour une utilisation ulterieure

import { createSlice } from "@reduxjs/toolkit";
//redux template on a une funcqu'on export out, ce template prend des props (name et initialState) mais aussi ce qu'on appelle des reducers, ils sont desobj contenant des func  qu'on peut export et utiliser dans notre store pour pouvoir les propager dans toute l'app
export const genreOrCategory = createSlice({
    name:"genreOrCategory",
    initialState: {
        //initial state
        genreIdOrCategoryName:'',
        page:1,
        searchQuery:'',

    },
    reducers:{
        selectGenreOrCategory:(state,action)=>{
            //Getting the data from our component to our redux store
            // console.log(action);
            //Storing the data inside our state
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = '';
        },
        searchMovie:(state,action)=>{
            // console.log(action.payload);
            state.searchQuery = action.payload;
        }
    }
})
//to extract the action creators
export const { selectGenreOrCategory,searchMovie } = genreOrCategory.actions;
//The reducer that we are going to use inside our store.js
export default genreOrCategory.reducer;