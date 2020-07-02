import React, {useState                         } from 'react';
import {PostSettingContainer} from '../../style/Containers/posts';
import {ModalContainer, ModalPost} from '../../style/Containers/modals';
import {
	togglePostModalAction,
	deletePost,
	apiLikePost,
	apiUpdateUserPost,
	getUsersPosts,
} from '../../store/actions';
import {useDispatch, connect} from 'react-redux';
import placeHolder from '../../assets/images/users/jennifer.png';
import {DeleteButtonMenu} from '../../style/buttons';
import menu from '../../assets/svgs/menu.svg';
import {PurpleHeart, GreyHeart} from '../../style/images';
import share from '../../assets/svgs/share.svg';

const PostModal = (props) => {
	const postId = props.postId;

	const dispatch = useDispatch();

	const [settingOpen, toggelSettingOpen] = useState(false);
	const [editEnabled, toggleEditEnabled] = useState(false);

	const getPost = ([...postArray], postId) => {
		let result;
		for (let i = 0; i < postArray.length; i++) {
			if (postArray[i].id === Number(postId)) {
				result = {...postArray[i]};
				return result;
			}
		}
	};

	const postToRender = getPost(
		[
			...props.posts,
			...props.followPosts,
			...props.friendsPosts,
			...props.likedPosts,
		],
		postId
	);

	const [postInfo, setPostInfo] = useState(postToRender.content);
	const [heartToggle, setHeartToggle] = useState(
		postToRender.logged_in_user_liked
	);

	const onSettingsClickHandler = () => {
		toggelSettingOpen(!settingOpen);
	};

	const onDeleteClickHandler = () => {
		dispatch(deletePost(postId, props.token));
		dispatch(togglePostModalAction());
		toggelSettingOpen(!settingOpen);
	};

	const postModalOnClickHandler = () => {
		dispatch(togglePostModalAction());
	};

	const onLikeClickHandler = () => {
		dispatch(apiLikePost(postId, props.token));
		setHeartToggle(!heartToggle);
	};

	const onEditClickHandler = () => {
		toggleEditEnabled(!editEnabled);
		toggelSettingOpen(!settingOpen);
	};

	const modalPostTextOnChangeHandler = (e) => {
		setPostInfo(e.target.value);
	};

	const onSubmitUpdateClickHandler = () => {
		dispatch(apiUpdateUserPost(postId, props.token, postInfo));
		dispatch(togglePostModalAction());
		dispatch(getUsersPosts(props.token));
	}

	return (
		<ModalContainer>
			<ModalPost>
				<div></div>
				<div className='modal-post-content'>
					<div className='modal-post-header'>
						<img
							className='user-image'
							src={
								!postToRender.user
									? placeHolder
									: !postToRender.user.avatar
									? placeHolder
									: postToRender.user.avatar
							}
							alt='user'
						/>
						<div className='modal-post-header-text-container'>
							<p className='post-header-username'>{`${postToRender.user.first_name} ${postToRender.user.last_name}`}</p>
							<p className='post-header-time-difference'>
								{postToRender.created.slice(0, 10)}
							</p>
						</div>
						{postToRender.is_from_logged_in_user ? (
							<PostSettingContainer>
								{settingOpen ? (
									<DeleteButtonMenu>
										<p onClick={onDeleteClickHandler}>
											DELETE
										</p>
										<p onClick={onEditClickHandler}>EDIT</p>
									</DeleteButtonMenu>
								) : null}
								<img
									onClick={onSettingsClickHandler}
									className='settings-image'
									src={menu}
									alt='settings icon'
								/>
							</PostSettingContainer>
						) : null}
					</div>

					{editEnabled ? (
						<>
							<textarea
								className='modal-post-text'
								value={postInfo}
								onChange={modalPostTextOnChangeHandler}
							></textarea>

							<button onClick={onSubmitUpdateClickHandler} className='modal-post-submit'>
								SUBMIT
							</button>
						</>
					) : (
						<>
							<textarea
								className='modal-post-text'
								value={postToRender.content}
								disabled
							></textarea>
							<p className='modal-post-likes'>{`${postToRender.amount_of_likes} likes`}</p>
						</>
					)}
					<div className='modal-post-footer'>
						{!postToRender.is_from_logged_in_user ? (
							<>
								<div
									onClick={onLikeClickHandler}
									className='like-logo'
								>
									{heartToggle ? (
										<PurpleHeart
											className='like-image'
											alt='like-logo'
										/>
									) : (
										<GreyHeart
											className='like-image'
											alt='like-logo'
										/>
									)}
									<label
										className='like-logo-text'
										htmlFor='like-logo'
									>
										Like
									</label>
								</div>
								<div className='share-logo'>
									<img
										className='share-image'
										src={share}
										alt='search-logo'
									/>
									<label
										className='share-logo-text'
										htmlFor='search-logo'
									>
										Share
									</label>
								</div>
							</>
						) : null}
					</div>
				</div>
				<button
					className='close-button'
					onClick={postModalOnClickHandler}
				>
					X
				</button>
			</ModalPost>
		</ModalContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		togglePostModal: state.postPageReducer.togglePostModal,
		likedPosts: state.postPageReducer.likedPosts,
		friendsPosts: state.postPageReducer.friendsPosts,
		followPosts: state.postPageReducer.followPosts,
		posts: state.postPageReducer.posts,
		token: state.signInReducer.token,
	};
};

export default connect(mapStateToProps)(PostModal);
