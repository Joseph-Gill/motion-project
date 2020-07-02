import React from 'react';
import {connect} from 'react-redux';
import {PostsRightContainer} from '../../../style/Containers/posts';
import Post from '../UserPosts/post';
import PostModal from '../../Modals/postModal';

const FriendsPosts = (props) => {
	return (
		<PostsRightContainer>
			{props.togglePostModal ? <PostModal postId={props.postId} /> : null}
			{props.friendsPosts
				? props.friendsPosts.map((post, index) => {
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
		friendsPosts: state.postPageReducer.friendsPosts,
		togglePostModal: state.postPageReducer.togglePostModal,
	};
};

export default connect(mapStateToProps)(FriendsPosts);
