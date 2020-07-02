import axios from 'axios';
import {
	validateCodeSent,
	errorCodeSent,
	baseUrl,
	baseHeaders,
	createUserTag,
	validateUserTag,
	validateComplete,
	signInTag,
	signIntoAccount,
	tokenPresent,
	tokenSignInTag,
	toggleModal,
	getPosts,
	getUserPostsTag,
	makeNewPostTag,
	deletePostTag,
	deleteLocalPost,
	getLikedPosts,
	likedPostTag,
	getFriendsPosts,
	friendsPostTag,
	getFollowPosts,
	followPostTag,
	likePostTag,
	userLogOut,
	togglePostModal,
	updatePostTag,

} from './constants';

export const validateCodeSentAction = (content) => {
	return {
		type: validateCodeSent,
		payload: content,
	};
};

export const errorCodeSentAction = (content) => {
	return {
		type: errorCodeSent,
		payload: content,
	};
};

export const validateCompleteAction = () => {
	return {
		type: validateComplete,
	};
};

export const signInAction = (content) => {
	return {
		type: signIntoAccount,
		payload: content,
	};
};

export const tokenPresentAction = (content) => {
	return {
		type: tokenPresent,
		payload: content,
	};
};

export const toggleModalAction = () => {
	return {
		type: toggleModal,
	};
};

export const togglePostModalAction = () => {
	return {
		type: togglePostModal,
	};
}

export const getPostsAction = (content) => {
	return {
		type: getPosts,
		payload: content,
	};
};

export const deletePostAction = (content) => {
	return {
		type: deleteLocalPost,
		payload: content,
	}
}

export const getLikedPostsAction = (content) => {
	return {
		type: getLikedPosts,
		payload: content,
	}
}

export const getFriendsPostsAction = (content) => {
	return {
		type: getFriendsPosts,
		payload: content,
	}
}

export const getFollowPostsAction = (content) => {
	return {
		type: getFollowPosts,
		payload: content,
	}
}

export const logOutUserAction = () => {
	return {
		type: userLogOut,
	}
} 

export const newUserCode = (data) => (dispatch, getState) => {
	const url = baseUrl + createUserTag;
	const emailData = {email: data};
	axios
		.post(url, emailData, baseHeaders)
		.then((response) => {
			if (response.status === 201) {
				dispatch(validateCodeSentAction(data));
			}
		})
		.catch((error) => {
			dispatch(errorCodeSentAction(error.response.data));
		});
};

export const validateNewUser = (data) => (dispatch, getState) => {
	const url = baseUrl + validateUserTag;
	axios
		.post(url, data, baseHeaders)
		.then((response) => {
			if (response.status === 201) {
				dispatch(validateCompleteAction());
			}
		})
		.catch((error) => {
			dispatch(errorCodeSentAction(error.response.data));
		});
};

export const userSignIn = (email, password) => (dispatch, getState) => {
	const url = baseUrl + signInTag;
	const userInfo = {email, password};
	axios
		.post(url, userInfo, baseHeaders)
		.then((response) => {
			dispatch(signInAction(response.data));
			const token = response.data.access;
			const user = response.data.user;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
		})
		.catch((error) => {
			console.log('User Error Login>', error);
		});
};

export const tokenSignIn = (token, user) => (dispatch, getState) => {
	const url = baseUrl + tokenSignInTag;
	const userInfo = {token, user};
	axios
		.post(url, userInfo, baseHeaders)
		.then((response) => {
			if (response.status === 200) {
				dispatch(tokenPresentAction(userInfo));
			}
		})
		.catch((error) => {
			console.log('Token Error Login>', error);
		});
};

export const getUsersPosts = (token) => (dispatch, getState) => {
	const url = baseUrl + getUserPostsTag;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			if (response.status === 200) {
				dispatch(getPostsAction(response.data));
			}
		})
		.catch((error) => {
			console.log('User Posts Fetch Error>', error);
		});
};

export const makeNewPost = (postData, token) => (dispatch, getState) => {
	const formData = new FormData();
	formData.set("content",postData.content)
	const url = baseUrl + makeNewPostTag;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	axios
		.post(url, formData, config)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log('Make New Post Error>', error);
		});
};

export const deletePost = (postId, token) => (dispatch, getState) => {
	const url = baseUrl + deletePostTag + `${postId}/`;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	axios
		.delete(url, config)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log('Delete a Post Error>', error);
		});
};

export const apiGetLikedPosts = (token) => (dispatch, getState) => {
	const url = baseUrl + likedPostTag;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			if (response.status === 200) {
				dispatch(getLikedPostsAction(response.data));
			}
		})
		.catch((error) => {
			console.log('Liked Posts Fetch Error>', error);
		});
}

export const apiGetFriendsPosts = (token) => (dispatch, getState) => {
	const url = baseUrl + friendsPostTag;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			dispatch(getFriendsPostsAction(response.data));
			
		})
		.catch((error) => {
			console.log('Friends Posts Fetch Error>', error);
		});
}

export const apiGetFollowPosts = (token) => (dispatch, getState) => {
	const url = baseUrl + followPostTag;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	axios
		.get(url, config)
		.then((response) => {
			dispatch(getFollowPostsAction(response.data));

		})
		.catch((error) => {
			console.log('Follow Posts Fetch Error>', error);
		})
}

export const apiLikePost = (postId, token) => (dispatch, getState) => {
	const url = baseUrl + likePostTag + `${postId}/`;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	const likeData = {
		post_id: postId,
	}
	axios 
		.post(url, likeData, config)
		.then((response) => {
			console.log('Like Post Response',response)
		})
		.catch((error) => {
			console.log('Like Post Error>', error);
		})
} 

export const apiUpdateUserPost = (postId, token, newPostContent) => (dispatch, getState) => {
	const url = baseUrl + updatePostTag + `${postId}/`;
	const config = {
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	};
	const postData = {
		content: newPostContent,
	}
	axios
		.put(url, postData, config)
		.then((response) => {
			console.log(response)
		})
		.catch((error) => {
			console.log('Update Post Error>', error)
		})
} 