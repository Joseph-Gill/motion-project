import React from 'react';
import {connect} from 'react-redux';
import {PostsRightContainer} from '../../../style/Containers/posts';
import Post from '../UserPosts/post';
import PostModal from '../../Modals/postModal';

const FollowPosts = (props) => {
	return (
		<PostsRightContainer>
			{props.togglePostModal ? <PostModal postId={props.postId} /> : null}
			{props.followPosts
				? props.followPosts.map((post, index) => {
						return (
							<Post
								onClickHandler={props.onClickHandler}
								post={post}
								key={post.id}
								index={index}
								id={post.id}
							/>
						);
				  })
				: null}
		</PostsRightContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		followPosts: state.postPageReducer.followPosts,
		togglePostModal: state.postPageReducer.togglePostModal,
	};
};

export default connect(mapStateToProps)(FollowPosts);
