import styled from 'styled-components';
import background_image from '../../assets/images/background_image.png';

export const AppContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
`;

export const LandingPageRightContainer = styled.div`
	width: 60%;
	display: grid;
	grid-template-rows: 26% 1fr;
	grid-template-columns: 1fr;
`;

export const HeaderContainer = styled.div`
	width: 40%;
	background-image: url(${background_image}),
		linear-gradient(102deg, #c468ff, #6e91f6);
	background-repeat: no-repeat;
	background-size: cover;
	display: grid;
	grid-template-columns: 27% 1fr 27%;
	grid-template-rows: 32% 1fr 17%;
`;

export const UpperBlockContainer = styled.div`
	grid-row: 2;
	grid-column: 2;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 23% 15% 22% 1fr;

	img {
		height: 80px;
		width: 80px;
		grid-column: 1 / 3;
		justify-self: center;
	}

	h1 {
		grid-row: 2;
		grid-column: 1 / 3;
		font-size: 30px;
		font-weight: normal;
		letter-spacing: 0.75px;
		text-align: center;
		color: #ffffff;
	}

	p {
		grid-row: 3;
		grid-column: 1 / 3;
		text-align: center;
		opacity: 0.6;
		font-size: 16px;
		line-height: 1.5;
		text-align: center;
		color: #ffffff;
	}
`;

export const LowerBlockContainer = styled.div`
	grid-row: 3;
	grid-column: 2;
	display: grid;
	grid-template-columns: 1fr 28% 1fr;
	grid-template-rows: 1fr 1fr;
`;

export const UpperRightContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;

	p {
		width: 165px;
		height: 16px;
		font-size: 14px;
		color: #000000;
		margin-top: 51px;
	}
	button {
		width: 120px;
		height: 40px;
		border-radius: 30px;
		border: solid 1px rgba(0, 0, 0, 0.2);
		margin-top: 40px;
		margin-right: 40px;
		margin-left: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		font-size: 10px;
		letter-spacing: 1px;
		color: black;
		background-color: white;

		:hover {
			cursor: pointer;
		}
	}
`;

export const LowerRightContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr 30%;

	.lower-right-form {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	h2 {
		width: 150px;
		height: 48px;
		font-size: 40px;
		font-weight: normal;
		text-align: center;
		color: #000000;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	img {
		margin-top: 30px;
	}
`;

export const VerificationAreaContainer = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 15% repeat(4, 1fr);

	h2 {
		grid-column: 1 / 3;
		justify-self: center;
		font-size: 40px;
		width: 100%;
	}

	.validation {
		grid-column: 1 / 3;
	}

	.verification-left {
		justify-self: flex-end;
		margin-right: 10px;
	}

	.verification-right {
		margin-left: 10px;
	}
`;

export const CongratsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	img {
		height: 150px;
		width: 150px;
	}

	h2 {
		font-size: 40px;
		width: 100%;
	}
`;