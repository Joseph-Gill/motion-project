import styled from 'styled-components';

export const UserMenuContainer = styled.div`
	position: absolute;
	z-index: 1;
	height: 96px;
	width: 180px;
	background-color: #ffffff;
	right: 0;
	margin-right: 47px;
	margin-top: 70px;
	box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15),
		0px 0px 1px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	display: grid;
	grid-template-rows: 8px 40px 48px;

	.profile-button-container {
		background-color: #f2f2f2;
		display: flex;
		align-items: center;
		:hover {
			cursor: pointer;
		}

		.profile-image {
			height: 18px;
			width: 18px;
			opacity: 0.5;
			margin-left: 23px;
		}

		.profile-text {
			font-size: 14px;
			line-height: 16px;
			margin-left: 22px;
		}
	}

	.logout-button-container {
		display: flex;
		align-items: center;
		:hover {
			cursor: pointer;
		}

		.logout-image {
			height: 18px;
			width: 18px;
			opacity: 0.5;
			margin-left: 23px;
		}

		.logout-text {
			font-size: 14px;
			line-height: 16px;
			margin-left: 22px;
		}
	}
`;
