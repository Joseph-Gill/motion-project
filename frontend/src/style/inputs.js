import styled from 'styled-components';
import avatar from '../assets/svgs/avatar.svg';
import password from '../assets/svgs/password.svg';

const BaseInput = styled.input`
	background-repeat: no-repeat;
	background-position: 0% 0%;
	width: 340px;
	height: 40px;
	font-size: 16px;
	line-height: 1.63;
	color: #000000;
	border-top: 0px;
	border-left: 0px;
	border-right: 0px;
	padding-left: 40px;
	border-bottom: solid 2px rgba(0, 0, 0, 0.16);
	padding-bottom: 13px;
`;

export const SignInText = styled(BaseInput)`
	margin-top: 64px;
	background-image: url(${avatar});
`;

export const SignInPassword = styled(BaseInput)`
	margin-top: 42.5px;
	background-image: url(${password});
`;

export const ValidationCode = styled(BaseInput)`
    padding-left: 0px;
    justify-self: center;
    width: 700px;
`;

export const VerificationText = styled(BaseInput)`
    padding-left: 0px;
`;

export const VerificationPassword = styled(BaseInput)`
	padding-left: 0px;
`;
