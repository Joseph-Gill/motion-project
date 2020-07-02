import styled from 'styled-components';

export const IndividualPostContainer = styled.div`
	justify-self: flex-end;
	width: 560px;
	border-radius: 4px;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2);
	background-color: #ffffff;

	.post-content {
		margin-left: 30px;
		margin-right: 30px;
	}
`;

export const PostsContainer = styled.div`
	background-color: #f8f8f9;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 32px;
	justify-content: center;
`;

export const PostsLeftContainer = styled.div`
	display: grid;
	grid-auto-rows: min-content;
	grid-row-gap: 32px;
`;

export const PostsRightContainer = styled.div`
	display: grid;
	grid-row-gap: 32px;
	justify-content: start;
	grid-auto-rows: min-content;
`;

export const PostHeaderContainer = styled.div`
	display: grid;
	grid-template-columns: 74px 1fr 1fr;
	align-items: center;
	height: 94px;

	.user-image {
		height: 40px;
		width: 40px;
		margin-left: 30px;
		object-fit: center;
		border-radius: 50%;
	}
`;

export const PostHeaderTextContainer = styled.div`
	display: grid;
	margin-left: 16px;
	font-size: 14px;

	.post-header-username {
		width: 200px;
		height: 16px;
		color: #000000;
	}

	.post-header-time-difference {
		margin-top: 7px;
		width: 100px;
		height: 16px;
		opacity: 0.5;
		color: #000000;
	}
`;

export const PostSettingContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;

	.settings-image {
		margin-right: 30px;
		:hover {
			cursor: pointer;
		}
	}

	.close-settings-buttons-container {
		display: flex;

		.close-button {
			height: 14px;
			width: 14px;
			color: black;
			background-color: white;
			border-top: 0px;
			border-right: 0px;
			border-bottom: 0px;
			border-left: 0px;
			font-size: 20px;
			opacity: 0.5;

			:hover {
				cursor: pointer;
			}
		}
	}
`;

export const PostFooterContainer = styled.div`
	display: grid;
	grid-template-columns: 96px 117px 1fr;
	align-items: center;
	height: 85px;

	.like-logo {
		justify-self: flex-end;
		display: flex;
		align-items: center;
		:hover {
			cursor: pointer;
		}
	}

	.like-image {
		width: 20px;
		height: 18.4px;
		opacity: 0.3;
	}

	.like-logo-text {
		width: 26px;
		height: 16px;
		font-size: 14px;
		color: #000000;
		margin-left: 18px;
	}

	.share-logo {
		justify-self: flex-end;
		display: flex;
		align-items: center;
	}

	.share-image {
		width: 24px;
		height: 24px;
		opacity: 0.3;
	}

	.share-logo-text {
		width: 37px;
		height: 16px;
		font-size: 14px;
		color: #000000;
		margin-left: 17px;
	}

	.likes {
		justify-self: flex-end;
		margin-right: 30px;
		width: 100px;
		height: 16px;
		opacity: 0.5;
		font-size: 14px;
		text-align: right;
		color: #000000;
	}
`;

export const UserMainPostContainer = styled.div`
	background-color: white;
	width: 560px;
	height: 120px;
	justify-self: flex-end;
	display: flex;
	align-items: center;
	box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2);

	.user-image {
		height: 60px;
		width: 60px;
		margin-left: 30px;
		object-fit: center;
		border-radius: 50%;
	}

	.user-image-text {
		margin-left: 30px;
		width: 226px;
		height: 26px;
		opacity: 0.5;
		font-size: 16px;
		line-height: 1.63;
		color: #000000;
		border-top: 0px;
		border-left: 0px;
		border-bottom: 0px;
		border-right: 0px;
		background-color: white;
	}
`;