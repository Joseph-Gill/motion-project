import styled from 'styled-components';

export const SearchBarContainer = styled.div`
	background-color: #f8f8f9;
	display: grid;
	grid-template-columns: 1fr 1fr;
	max-height: 60px;
`;

export const SearchBarLeftContainer = styled.div`
	display: grid;
	grid-template-columns: 20.2% 1fr;
	align-items: center;
`;

export const SearchInputContainer = styled.div`
	grid-column-start: 2;
	display: grid;
	grid-template-columns: 41px 1fr;

	.search-image {
		height: 20px;
		width: 20px;
	}

	.search-image-text {
		width: 200px;
		height: 19px;
		opacity: 0.5;
		font-size: 16px;
		color: #000000;
		border-top: 0px;
		border-left: 0px;
		border-bottom: 0px;
		border-right: 0px;
		background-color: #f8f8f9;
	}
`;

export const SearchBarRightContainer = styled.div`
	display: grid;
	grid-template-columns: 47.5% 11.1% 13.3% 1fr;
	align-items: center;
	font-size: 16px;

	a {
		height: 19px;
		color: #000000;
		opacity: 0.5;
		text-decoration: none;
	}

	.liked-container {
		height: 100%;
		display: flex;
		align-items: center;

		.liked-link {
			height: 100%;
			padding-top: 20px;
			width: 39px;
		}
	}

	.friends-container {
		height: 100%;
		display: flex;
		align-items: center;

		.friends-link {
			height: 100%;
			padding-top: 20px;
			width: 54px;
		}
	}

	.follow-container {
		height: 100%;
		display: flex;
		align-items: center;

		.follow-link {
			height: 100%;
			padding-top: 20px;
			width: 48px;
		}
	}

	.active {
		opacity: 1;
		border-bottom: solid 2px black;
	}
`;