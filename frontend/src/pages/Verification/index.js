import React from 'react';
import LandingHeader from '../../components/LandingPage/LandingHeader';
import VerificationArea from '../../components/LandingPage/VerificationArea';
import {AppContainer, LandingPageRightContainer} from '../../style/Containers/landingPage';

const VerificationPage = () => {
	return (
		<>
			<AppContainer>
				<LandingHeader />
				<LandingPageRightContainer>
					<div></div>
					<VerificationArea />
				</LandingPageRightContainer>
			</AppContainer>
		</>
	);
};

export default VerificationPage;