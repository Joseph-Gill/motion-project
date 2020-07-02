import React from 'react';
import LandingHeader from '../../components/LandingPage/LandingHeader';
import CongratsMessage from '../../components/LandingPage/CongratsMessage';
import {AppContainer, LandingPageRightContainer} from '../../style/Containers/landingPage';

const CongratsPage = () => {
	return (
		<>
			<AppContainer>
				<LandingHeader />
				<LandingPageRightContainer>
					<div></div>
					<CongratsMessage />
				</LandingPageRightContainer>
			</AppContainer>
		</>
	);
};

export default CongratsPage;
