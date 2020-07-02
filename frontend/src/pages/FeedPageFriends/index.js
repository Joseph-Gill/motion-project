import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Search from '../../components/FeedPage/Search';
import UserPosts from '../../components/FeedPage/UserPosts';
import FriendsPosts from '../../components/FeedPage/FriendsPosts';
import {FeedPageContainer} from '../../style/Containers/feedPage';
import {FeedPageHR} from '../../style/hr';
import {useDispatch, connect} from 'react-redux';
import {
	getUsersPosts,
	apiGetFriendsPosts,
	togglePostModalAction,
} from '../../store/actions';
import {PostsContainer} from '../../style/Containers/posts';

const FeedPageFriends = (props) => {
	const dispatch = useDispatch();

	const [postId, setPostId] = useState(null);

	const postClickHandler = (event) => {
		setPostId(event.target.id);
		dispatch(togglePostModalAction());
	};

	useEffect(() => {
		if (props.token) {
			dispatch(getUsersPosts(props.token));
			dispatch(apiGetFriendsPosts(props.token));
		}
	});

	return (
		<FeedPageContainer>
			<Header />
			<Search />
			<FeedPageHR />
			<PostsContainer>
				<UserPosts onClickHandler={postClickHandler} postId={postId} />
				<FriendsPosts
					onClickHandler={postClickHandler}
					postId={postId}
				/>
			</PostsContainer>
		</FeedPageContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.signInReducer.token,
		togglePostModal: state.postPageReducer.togglePostModal,
	};
};

export default connect(mapStateToProps)(FeedPageFriends);
