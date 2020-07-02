import React from 'react';
import LandingHeader from '../../components/LandingPage/LandingHeader';
import SignUpArea from '../../components/LandingPage/SignUpArea';
import SignUpInput from '../../components/LandingPage/SignUpInput';
import {AppContainer, LandingPageRightContainer} from '../../style/Containers/landingPage';

const SignUpPage = () => {
	return (
		<>
			<AppContainer>
				<LandingHeader />
				<LandingPageRightContainer>
					<SignUpArea />
					<SignUpInput />
				</LandingPageRightContainer>
			</AppContainer>
		</>
	);
};

export default SignUpPage;
