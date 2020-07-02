import styled from 'styled-components';

export const SocialMediaAnchor = styled.a`
	color: #726dcf;
	font-size: 20px;
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;

	:hover {
		cursor: pointer;
	}
`;

export const MotionLogo = styled.div`
	display: grid;
	grid-template-columns: 25.3% 1fr;

	.logo-image {
		justify-self: flex-end;
		height: 26px;
		width: 26px;
	}

	.logo-text {
		width: 70px;
		height: 25px;
		font-size: 22px;
		color: #000000;
		padding-left: 17px;
		text-decoration: none;
	}
`;

export const PostsLogo = styled.div`
	height: 100%;

	.posts-image {
		height: 18px;
		width: 18px;
		display: flex;
		align-self: center;
		margin-right: 19px;
	}

	.posts-text {
		width: 42px;
		height: 19px;
		font-size: 16px;
		color: #000000;
		text-decoration: none;
		display: flex;
		height: 100%;
		align-items: center;
	}

	.active {
		border-bottom: solid 2px #ad73fd;
		width: 84px;
	}
`;

export const FriendsLogo = styled.div`
	/* display: grid;
	grid-template-columns: 39px 1fr; */
	height: 100%;

	.friends-image {
		height: 14px;
		width: 22px;
		display: flex;
		align-self: center;
		margin-right: 17px;
	}

	.friends-text {
		width: 128px;
		height: 19px;
		font-size: 16px;
		color: #000000;
		text-decoration: none;
		display: flex;
		height: 100%;
		align-items: center;
	}

	.active {
		border-bottom: solid 2px #ad73fd;
		width: 128px;
	}
`;

export const NotificationArea = styled.a`
	justify-self: flex-end;

	.bell-image {
		height: 21px;
		width: 18px;
		opacity: 0.3;
	}

	.bell-text {
		margin-left: 10px;
		background-image: linear-gradient(102deg, #c468ff, #6e91f6);
		color: white;
		border-radius: 50%;
		width: 18px;
		text-align: center;
	}
	.bell-text-zero {
		margin-left: 10px;
		width: 18px;
	}
`;

export const UserImage = styled.a`
	justify-self: flex-end;
	height: 40px;
	width: 40px;

	.user-image {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		object-fit: cover;
	}
`;

export const SettingsImage = styled.a`
	justify-self: flex-end;
	width: 4px;
	height: 16px;
	margin-right: 50px;
	:hover {
		cursor: pointer;
	}
`;
