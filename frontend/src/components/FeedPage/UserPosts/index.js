import React from 'react';
import {connect, useDispatch} from 'react-redux';
import UserPostModal from '../../Modals/userPostModal';
import {toggleModalAction} from '../../../store/actions';
import placeHolder from '../../../assets/images/users/jennifer.png';
import sendButton from '../../../assets/images/send_button.png';
import {PurpleUserButton} from '../../../style/buttons';
import Post from './post';
import PostModal from '../../Modals/postModal';
import {PostsLeftContainer, UserMainPostContainer} from '../../../style/Containers/posts';

const Posts = (props) => {

	const dispatch = useDispatch();

	const userMainPostClickHandler = () => {
		dispatch(toggleModalAction());
	};

	return (
		<>
			{props.toggleModal ? <UserPostModal /> : null}
			{props.togglePostModal ? <PostModal postId={props.postId} /> : null}
			<PostsLeftContainer>
				<UserMainPostContainer>
					<img
						className='user-image'
						src={
							!props.user
								? placeHolder
								: !props.user.avatar
								? placeHolder
								: props.user.avatar
						}
						alt='user'
					/>
					<input
						disabled
						className='user-image-text'
						type='text'
						placeholder={
							!props.user
								? "What's on your mind?"
								: `What's on your mind, ${props.user.first_name}?`
						}
					/>
					<PurpleUserButton onClick={userMainPostClickHandler}>
						<img src={sendButton} alt='send button' />
					</PurpleUserButton>
				</UserMainPostContainer>
				{props.posts
					? props.posts.map((post, index) => {
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
			</PostsLeftContainer>
		</>
	);
};

const mapPropsToState = (state) => {
	return {
		user: state.signInReducer.user,
		toggleModal: state.postPageReducer.toggleModal,
		togglePostModal: state.postPageReducer.togglePostModal,
		posts: state.postPageReducer.posts,
	};
};

export default connect(mapPropsToState)(Posts);
