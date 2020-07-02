import React from 'react';
import {useHistory} from 'react-router-dom';
import checkmark from '../../../assets/images/checkmark.png';
import {
	LowerRightContainer,
	CongratsContainer,
	ButtonContainer,
} from '../../../style/Containers/landingPage';
import {BaseLandingButton} from '../../../style/buttons';
import ellipsis2 from '../../../assets/images/ellipsis2.png';
import { connect } from 'react-redux';

const CongratsMessage = (props) => {

	const {push} = useHistory();

	const onContinueClickHandler = (e) => {
		push('/verification');
	}
	
	return (
		<LowerRightContainer>
			<CongratsContainer>
				<h2>Congratulations!</h2>
				<img src={checkmark} alt='checkmark' />
				<p>
					We've sent a confirmation code to your email
					{props.email}
				</p>
			</CongratsContainer>
			<ButtonContainer>
				<BaseLandingButton onClick={onContinueClickHandler} >CONTINUE</BaseLandingButton>
				<img src={ellipsis2} alt='ellipsis' />
			</ButtonContainer>
		</LowerRightContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		email: state.newUserReducer.email,
	}
}

export default connect(mapStateToProps)(CongratsMessage);
