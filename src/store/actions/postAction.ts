import { api } from "../../axios";
import { SET_POSTS } from "./actionTypes";

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


export const setPosts = (posts: any[]) => ({ type: SET_POSTS, payload: posts });
