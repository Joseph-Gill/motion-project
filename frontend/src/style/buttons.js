import styled from 'styled-components';

const UpperHeaderBaseButton = styled.a`
	grid-row: 4;
	width: 126px;
	height: 40px;
	border-radius: 100px;
	border: solid 2px rgba(255, 255, 255, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;

	:hover {
		cursor: pointer;
	}
`;

export const UpperHeaderLeftButton = styled(UpperHeaderBaseButton)`
	justify-self: flex-end;
	margin-right: 8px;
`;

export const UpperHeaderRightButton = styled(UpperHeaderBaseButton)`
	justify-self: flex-start;
	margin-left: 8px;
`;

export const BaseLandingButton = styled.button`
	width: 260px;
	height: 60px;
	border-radius: 30px;
	background-image: linear-gradient(102deg, #c468ff, #6e91f6);
	font-size: 12px;
	letter-spacing: 1px;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 0px;
	border-right: 0px;
	border-bottom: 0px;
	border-left: 0px;

	:hover {
		cursor: pointer;
	}
`;

export const PurpleUserButton = styled.div`
	height: 60px;
	width: 60px;
	background-image: linear-gradient(102deg, #c468ff, #6e91f6);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 123px;
	cursor: pointer;
`;

export const DeleteButtonMenu = styled.div`
	width: 80px;
	height: 36px;
	margin-right: 10px;
	background: #ffffff;
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15), 0px 0px 1px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	:hover {
		cursor: pointer;
	}

	p {
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 18px;
		width: 100%;
		:nth-child(odd) {
			background-color: #f2f2f2;
		}
	}
`;
