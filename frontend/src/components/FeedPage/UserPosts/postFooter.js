import React, {useState} from 'react';
import {GreyHeart} from '../../../style/images';
import {PurpleHeart} from '../../../style/images';
import share from '../../../assets/svgs/share.svg';
import {PostFooterContainer} from '../../../style/Containers/posts';
import {useDispatch, connect} from 'react-redux';
import {apiLikePost} from '../../../store/actions';

const PostFooter = (props) => {
	const dispatch = useDispatch();

	const [heartToggle, setHeartToggle] = useState(
		props.post.logged_in_user_liked
	);

	const onLikeClickHandler = () => {
		dispatch(apiLikePost(props.post.id, props.token));
		setHeartToggle(!heartToggle);
	};

	return (
		<PostFooterContainer>
			{!props.post.is_from_logged_in_user ? (
				<>
					<div onClick={onLikeClickHandler} className='like-logo'>
						{heartToggle ? (
							<PurpleHeart
								className='like-image'
								alt='like-logo'
							/>
						) : (
							<GreyHeart className='like-image' alt='like-logo' />
						)}
						<label className='like-logo-text' htmlFor='like-logo'>
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
			) : (
				<>
					<div></div>
					<div></div>
				</>
			)}
			<p className='likes'>{`${props.likes} likes`}</p>
		</PostFooterContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.signInReducer.token,
		followPosts: state.postPageReducer.followPosts,
		friendsPosts: state.postPageReducer.friendsPosts,
		likedPosts: state.postPageReducer.likedPosts,
	};
};

export default connect(mapStateToProps)(PostFooter);
