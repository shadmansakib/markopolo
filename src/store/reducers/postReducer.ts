import { Post } from "../../types";
import { SET_POSTS } from "../actions/actionTypes";

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
        default:
            return state;
    }
}
