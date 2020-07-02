import styled from 'styled-components';

const SocialMediaIcon = styled.div`
	width: 40px;
	height: 40px;
	opacity: 0.5;
	background-color: #ffffff;
	border-radius: 50%;
	justify-self: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LeftSMIcon = styled(SocialMediaIcon)`
    justify-self: flex-end;
`;

export const MiddleSMIcon = styled(SocialMediaIcon)`
`;

export const RightSMIcon = styled(SocialMediaIcon)`
    justify-self: flex-start;
`;