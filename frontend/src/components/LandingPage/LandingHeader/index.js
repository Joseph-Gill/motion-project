import React from 'react';
import {
	HeaderContainer,
	UpperBlockContainer,
	LowerBlockContainer,
} from '../../../style/Containers/landingPage';
import {
	UpperHeaderLeftButton,
	UpperHeaderRightButton,
} from '../../../style/buttons';
import {LeftSMIcon, MiddleSMIcon, RightSMIcon} from '../../../style/icons';
import {SocialMediaAnchor} from '../../../style/anchors';
import {LowerBlockLegal} from '../../../style/text';
import motion_logo from '../../../assets/images/logo_white.png';
import apple_logo from '../../../assets/svgs/apple.svg';
import google_logo from '../../../assets/svgs/google.svg';

const LandingHeader = () => {
	return (
		<HeaderContainer>
			<UpperBlockContainer>
				<img src={motion_logo} alt='motion logo' />
				<h1>Motion</h1>
				<p>Connect with friends and the world around you with Motion</p>
				<UpperHeaderLeftButton className='left-button'>
					<img src={apple_logo} alt='apple store logo' />
				</UpperHeaderLeftButton>
				<UpperHeaderRightButton className='right-button'>
					<img src={google_logo} alt='google store logo' />
				</UpperHeaderRightButton>
			</UpperBlockContainer>
			<LowerBlockContainer>
				<LeftSMIcon>
					<SocialMediaAnchor className='fab fa-twitter' />
				</LeftSMIcon>
				<MiddleSMIcon>
					<SocialMediaAnchor className='fab fa-facebook-f' />
				</MiddleSMIcon>
				<RightSMIcon>
					<SocialMediaAnchor className='fab fa-instagram' />
				</RightSMIcon>
				<LowerBlockLegal>
					© Motion 2018. All rights reserved.
				</LowerBlockLegal>
			</LowerBlockContainer>
		</HeaderContainer>
	);
};

export default LandingHeader;
