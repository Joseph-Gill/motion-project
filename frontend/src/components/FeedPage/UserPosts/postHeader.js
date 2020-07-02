import React, {useState} from 'react';
import {connect} from 'react-redux';
import placeHolder from '../../../assets/images/users/jennifer.png';
import menu from '../../../assets/svgs/menu.svg';
import {
	PostHeaderContainer,
	PostHeaderTextContainer,
	PostSettingContainer,
} from '../../../style/Containers/posts';
import {DeleteButtonMenu} from '../../../style/buttons';
import {deletePost, deletePostAction} from '../../../store/actions';

const PostHeader = (props) => {
	const [settingOpen, toggelSettingOpen] = useState(false);

	const {dispatch} = props;

	const onSettingsClickHandler = () => {
		toggelSettingOpen(!settingOpen);
	};

	const onDeleteClickHandler = () => {
		dispatch(deletePost(props.id, props.token));
		dispatch(deletePostAction(props.index));
	};

	return (
		<PostHeaderContainer>
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
			<PostHeaderTextContainer>
				<p className='post-header-username'>{`${props.user.first_name} ${props.user.last_name}`}</p>
				<p className='post-header-time-difference'>
					{props.created.slice(0, 10)}
				</p>
			</PostHeaderTextContainer>

			{props.post.is_from_logged_in_user ? (
				<PostSettingContainer>
					{settingOpen ? (
						<DeleteButtonMenu>
							<p onClick={onDeleteClickHandler}>DELETE</p>
							<p>EDIT</p>
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
		</PostHeaderContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.signInReducer.token,
		posts: state.postPageReducer.posts,
	};
};

export default connect(mapStateToProps)(PostHeader);
