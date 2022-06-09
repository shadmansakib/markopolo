import { api } from "../../axios";
import { Post } from "../../types";
import { ADD_POST, SET_POSTS } from "./actionTypes";

export const fetchPosts = () => (dispatch: any) => {
    api.get('/posts')
        .then((resp: any) => {
            if (resp.status !== 200) {
                console.error('HTTP status error: ', resp.status)
                return
            }
            dispatch({
                type: SET_POSTS,
                payload: resp.data,
            })
        })
        .catch((error: any) => {
            console.error('Something wrong happened: ', error)
        })
}

export const searchPosts = (search: string) => (dispatch: any) => {
    console.log('searching...');
    
    api.get(`/posts?q=${search}`)
        .then((resp: any) => {
            if (resp.status !== 200) {
                console.error('HTTP status error: ', resp.status)
                return
            }
            dispatch({
                type: SET_POSTS,
                payload: resp.data,
            })
        })
        .catch((error: any) => {
            console.error('Something wrong happened: ', error)
        })
}


export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, payload: posts })

export const addPost = (post: Post) => ({ type: ADD_POST, payload: post })
