import { Post } from "../../types";
import { ADD_POST, SET_POSTS } from "../actions/actionTypes";

type PostState = {
    posts: Post[]
}

const initialState: PostState = {
    posts: [],
};

export default function postReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        case ADD_POST:
            console.log('adding post...');
            
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            }
        default:
            return state;
    }
}
