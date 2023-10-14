//Here will goes the code for all the data fetching , the store of our entire app willcome from here
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

//movie/changes?page=1

export const tmdbApi = createApi({
    
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        //INFO:Get favorited and watchlisted movie for a specific user
        getList :builder.query({
            query:({listName,accountId,sessionId,page})=>{
                return `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`;
            }
        }),
        //INFO:Get genres
        getGenres:builder.query({
            query:()=>{
                return `/genre/movie/list?api_key=${tmdbApiKey}`
            }
        }),
        //* Get movies by type
        getMovies: builder.query({
            query: ({genreIdOrCategoryName,page,searchQuery}) => {

                //INFO:Get movies by search
                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //INFO:Get movies by category
                
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName==='string'){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //INFO:Get movies by genreId
               if(genreIdOrCategoryName && typeof genreIdOrCategoryName==='number'){
                return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
               }
               //INFO: Get popular movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
        //INFO: Get a specific movie
        getMovie : builder.query({
            query:(id)=>`/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),
        //INFO: Get a specific cast for a movie
        getCasting : builder.query({
            query:(id)=>`/movie/${id}/credits?api_key=${tmdbApiKey}`
        }),
         //INFO: Get user specific list
        getRecommendation: builder.query({
            query:({movie_id,list})=>`movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
        }),
         //INFO: Get details about an actor
        getActorInfo: builder.query({
            query:(actor_id)=>`person/${actor_id}?api_key=${tmdbApiKey}`
        })
        ,
         //INFO: Get details about an actor
        getActorMovieInfo: builder.query({
            // query:({id,page})=>`person/${id}/movie_credits?api_key=${tmdbApiKey}`
            query:({id,page})=>`/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
        })
    })
})

//When ever you build an endpoint using createApi(such as getMovies()),redux toolkit querry automaticaly create a hook for us
export const {
    useGetListQuery,
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetCastingQuery,
    useGetRecommendationQuery,
    useGetActorInfoQuery,
    useGetActorMovieInfoQuery
} = tmdbApi;

//Now we can just use this hook wherever we want to fetch movies data