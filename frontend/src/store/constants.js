export const loginInitialState = {
	email: null,
	verificationSent: false,
	error: null,
	validationComplete: false,
};

export const signInInitialState = {
	token: null,
	user: null,
	loggedIn: false,
};

export const postPageInitialState = {
	toggleModal: false,
	togglePostModal: false,
	posts: [],
	likedPosts: [],
	friendsPosts: [],
	followPosts: [],
};

export const validateCodeSent = 'VALIDATE_CODE_SENT';

export const errorCodeSent = 'ERROR_CODE_SENT';

export const validateComplete = 'VALIDATION_COMPLETE';

export const signIntoAccount = 'SIGN_INTO_ACCOUNT';

export const tokenPresent = 'TOKEN_PRESENT_IN_LOCAL_STORAGE';

export const toggleModal = 'TOGGLE_USER_POST_MODAL';

export const togglePostModal = 'TOGGLE_POST_MODAL'

export const getPosts = 'GET_POSTS';

export const deleteLocalPost = 'DELETE_POST';

export const getLikedPosts = 'GET_LIKED_POSTS';

export const getFriendsPosts = 'GET_FRIENDS_POSTS';

export const getFollowPosts = 'GET_FOLLOW_POSTS';

export const userLogOut = 'LOG_OUT_USER';

export const baseUrl = 'https://joseph-gill.propulsion-learn.ch/backend/';

export const createUserTag = 'api/auth/registration/';

export const validateUserTag = 'api/auth/registration/validation/';

export const signInTag = 'api/token/';

export const tokenSignInTag = 'api/token/verify/';

export const getUserPostsTag = 'api/social/posts/me/';

export const makeNewPostTag = 'api/social/posts/';

export const deletePostTag = 'api/social/posts/';

export const likedPostTag = 'api/social/posts/likes/';

export const friendsPostTag = 'api/social/posts/friends/';

export const followPostTag = 'api/social/posts/following/';

export const likePostTag = 'api/social/posts/toggle-like/';

export const updatePostTag = 'api/social/posts/'

export const baseHeaders = {
	'content-type': 'application/json',
};
