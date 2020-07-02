import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import placeHolder from '../../assets/images/users/jennifer.png';
import {
	toggleModalAction,
	makeNewPost,
	getUsersPosts,
} from '../../store/actions';
import {PurpleUserButton} from '../../style/buttons';
import sendButton from '../../assets/images/send_button.png';
import upload from '../../assets/images/upload.png';
import attachFile from '../../assets/images/attach-file.png';
import {ModalContainer, ModalPostWindow} from '../../style/Containers/modals';

const UserPostModal = (props) => {
	const dispatch = useDispatch();

	const [postInfo, setPostInfo] = useState({
		// images: [],
		content: '',
	});

	const modalOnClickHandler = () => {
		dispatch(toggleModalAction());
	};

	const postTextOnChangeHandler = (e) => {
		const value = e.currentTarget.value;
		setPostInfo({...postInfo, content: value});
	};

	const newPostClickHandler = () => {
		dispatch(makeNewPost(postInfo, props.token));
		dispatch(getUsersPosts(props.token));
		dispatch(toggleModalAction());
	};

	return (
		<ModalContainer>
			<ModalPostWindow>
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

				<textarea
					className='new-post-contents'
					onChange={postTextOnChangeHandler}
					placeholder="What's on your mind.....?"
				/>

				<button className='user-button' onClick={modalOnClickHandler}>
					X
				</button>
				<img className='upload-image' src={upload} alt='upload' />
				<img
					className='attach-file-image'
					src={attachFile}
					alt='attach file'
				/>
				<PurpleUserButton
					onClick={newPostClickHandler}
					className='user-send-button'
				>
					<img src={sendButton} alt='send button' />
				</PurpleUserButton>
			</ModalPostWindow>
		</ModalContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.signInReducer.token,
		user: state.signInReducer.user,
		toggleModal: state.postPageReducer.toggleModal,
	};
};

export default connect(mapStateToProps)(UserPostModal);
