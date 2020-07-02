import React from 'react';
import {connect} from 'react-redux';
import {PostsRightContainer} from '../../../style/Containers/posts';
import Post from '../UserPosts/post';
import PostModal from '../../Modals/postModal';

const LikedPosts = (props) => {
	return (
		<PostsRightContainer>
			{props.togglePostModal ? <PostModal postId={props.postId} /> : null}
			{props.likedPosts
				? props.likedPosts.map((post, index) => {
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
		likedPosts: state.postPageReducer.likedPosts,
		togglePostModal: state.postPageReducer.togglePostModal,
	};
};

export default connect(mapStateToProps)(LikedPosts);
