import {combineReducers} from 'redux';
import {
	loginInitialState,
	signInInitialState,
	validateCodeSent,
	errorCodeSent,
	validateComplete,
	signIntoAccount,
	tokenPresent,
	postPageInitialState,
	toggleModal,
	getPosts,
	deleteLocalPost,
	getLikedPosts,
	getFriendsPosts,
	getFollowPosts,
	userLogOut,
	togglePostModal,
} from './constants';

export const newUserReducer = (state = loginInitialState, action) => {
	const newState = {...state};
	switch (action.type) {
		case validateCodeSent:
			return {
				...newState,
				verificationSent: !newState.verificationSent,
				email: action.payload,
				error: null,
			};
		case errorCodeSent:
			return {...newState, error: action.payload};

		case validateComplete:
			return {
				...newState,
				validateComplete: !newState.validateComplete,
			};

		default:
			return newState;
	}
};

export const signInReducer = (state = signInInitialState, action) => {
	const newState = {...state};
	switch (action.type) {
		case signIntoAccount:
			return {
				...newState,
				token: action.payload.access,
				user: action.payload.user,
				loggedIn: !newState.loggedIn,
			};
		case tokenPresent:
			return {
				...newState,
				token: action.payload.token,
				user: action.payload.user,
				loggedIn: !newState.loggedIn,
			};
		case userLogOut:
			return {
				...newState,
				loggedIn: false,
			};

		default:
			return newState;
	}
};

export const postPageReducer = (state = postPageInitialState, action) => {
	const newState = {...state};
	switch (action.type) {
		case toggleModal:
			return {
				...newState,
				toggleModal: !newState.toggleModal,
			};
		case togglePostModal:
			return {
				...newState,
				togglePostModal: !newState.togglePostModal,
			};
		case getPosts:
			return {
				...newState,
				posts: action.payload,
			};
		case deleteLocalPost:
			const newerPosts = newState.posts.map((element) => element);
			newerPosts.splice(action.payload, 1);
			return {
				...newState,
				posts: newerPosts,
			};
		case getLikedPosts:
			return {
				...newState,
				likedPosts: action.payload,
			};
		case getFriendsPosts:
			return {
				...newState,
				friendsPosts: action.payload,
			};
		case getFollowPosts:
			return {
				...newState,
				followPosts: action.payload,
			};
		default:
			return newState;
	}
};

export const reducers = combineReducers({
	newUserReducer,
	signInReducer,
	postPageReducer,
});
