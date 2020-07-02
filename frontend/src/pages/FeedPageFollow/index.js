import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Search from '../../components/FeedPage/Search';
import UserPosts from '../../components/FeedPage/UserPosts';
import FollowPosts from '../../components/FeedPage/FollowPosts';
import {FeedPageContainer} from '../../style/Containers/feedPage';
import {FeedPageHR} from '../../style/hr';
import {useDispatch, connect} from 'react-redux';
import {
	getUsersPosts,
	apiGetFollowPosts,
	togglePostModalAction,
} from '../../store/actions';
import {PostsContainer} from '../../style/Containers/posts';

const FeedPageFollow = (props) => {
	const dispatch = useDispatch();

	const [postId, setPostId] = useState(null);

	const postClickHandler = (event) => {
		setPostId(event.target.id);
		dispatch(togglePostModalAction());
	};

	useEffect(() => {
		if (props.token) {
			dispatch(getUsersPosts(props.token));
			dispatch(apiGetFollowPosts(props.token));
		}
	});

	return (
		<FeedPageContainer>
			<Header />
			<Search />
			<FeedPageHR />
			<PostsContainer>
				<UserPosts onClickHandler={postClickHandler} postId={postId} />
				<FollowPosts
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

export default connect(mapStateToProps)(FeedPageFollow);
