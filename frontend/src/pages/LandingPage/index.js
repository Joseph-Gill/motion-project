import React from 'react';
import {AppContainer, LandingPageRightContainer} from '../../style/Containers/landingPage';
import LandingHeader from '../../components/LandingPage/LandingHeader';
import SignIn from '../../components/LandingPage/SignIn';
import SignUpArea from '../../components/LandingPage/SignUpArea';

const LandingPage = () => {
	return (
		<>
			<AppContainer>
				<LandingHeader />
				<LandingPageRightContainer>
					<SignUpArea />
                    <SignIn />
				</LandingPageRightContainer>
			</AppContainer>
		</>
	);
};

export default LandingPage;
