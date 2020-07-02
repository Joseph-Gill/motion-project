import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import logo from '../../assets/images/logo.png';
import postsLogo from '../../assets/images/posts_logo.png';
import iconFriends from '../../assets/svgs/icon-friends.svg';
import notificationBell from '../../assets/svgs/notification_bell.svg';
import menu from '../../assets/svgs/menu.svg';
import profile from '../../assets/images/profile.png';
import logout from '../../assets/images/logout.png';
import placeHolder from '../../assets/images/users/jennifer.png';
import {
UserMenuContainer,
} from '../../style/Containers/userMenu';
import {
	MotionLogo,
	PostsLogo,
	FriendsLogo,
	NotificationArea,
	UserImage,
	SettingsImage,
} from '../../style/anchors';
import {logOutUserAction} from '../../store/actions';
import {	FeedHeaderContainer,
	FeedHeaderLeftContainer,
	FeedHeaderRightContainer} from '../../style/Containers/feedPage';

const Header = (props) => {
	const [userMenu, setUserMenu] = useState(false);

	const {push} = useHistory();

	const dispatch = useDispatch();

	const onUserMenuClickHandler = () => {
		setUserMenu(!userMenu);
	};

	const onProfileClickHandler = () => {
		push('/profile')
	}

	const onLogoutClickHandler = () => {
		localStorage.clear();
		dispatch(logOutUserAction());
		push('/')
	}

	return (
		<FeedHeaderContainer>
			<FeedHeaderLeftContainer>
				<MotionLogo>
					<img className='logo-image' src={logo} alt='motion logo' />
					<NavLink className='logo-text' to='/'>
						Motion
					</NavLink>
				</MotionLogo>
				<PostsLogo>
					<NavLink className='posts-text' to='/feed/liked'>
						<img
							className='posts-image'
							src={postsLogo}
							alt='posts logo'
						/>
						Posts
					</NavLink>
				</PostsLogo>
				<FriendsLogo>
					<NavLink className='friends-text' to='/friends'>
						<img
							className='friends-image'
							src={iconFriends}
							alt='friends logo'
						/>
						Find Friends
					</NavLink>
				</FriendsLogo>
			</FeedHeaderLeftContainer>
			<FeedHeaderRightContainer>
				<NotificationArea>
					<p className='bell-text-zero'>0</p>
					<img
						className='bell-image'
						src={notificationBell}
						alt='notification bell'
					/>
				</NotificationArea>

				<UserImage>
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
				</UserImage>
				{userMenu ? (
					<UserMenuContainer>
						<div></div>
						<div onClick={onProfileClickHandler} className='profile-button-container'>
							<img
								className='profile-image'
								src={profile}
								alt='profile'
							/>
							<p className='profile-text'>Profile</p>
						</div>
						<div onClick={onLogoutClickHandler} className='logout-button-container'>
							<img
								className='logout-image'
								src={logout}
								alt='logout'
							/>
							<p className='logout-text'>Logout</p>
						</div>
					</UserMenuContainer>
				) : null}
				<SettingsImage>
					<img
						onClick={onUserMenuClickHandler}
						className='settings-image'
						src={menu}
						alt='settings icon'
					/>
				</SettingsImage>
			</FeedHeaderRightContainer>
		</FeedHeaderContainer>
	);
};

const mapPropsToState = (state) => {
	return {
		user: state.signInReducer.user,
		loggedIn: state.signInReducer.loggedIn,
	};
};

export default connect(mapPropsToState)(Header);
