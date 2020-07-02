import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {SignInText, SignInPassword} from '../../../style/inputs';
import {LowerRightContainer, ButtonContainer} from '../../../style/Containers/landingPage';
import {BaseLandingButton} from '../../../style/buttons';
import {userSignIn} from '../../../store/actions';
import {useHistory} from 'react-router-dom';

const SignIn = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {push} = useHistory();

	const onEmailChangeHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onPasswordChangeHandler = (e) => {
		setPassword(e.currentTarget.value);
	};

	const signInOnSubmitHandler = (e) => {
		e.preventDefault();
		props.dispatch(userSignIn(email, password));
	};

	useEffect(() => {
		if (props.loggedIn) {
			push('/feed/liked');
		}
	});

	return (
		<LowerRightContainer>
			<form
				id='sign-in-form'
				className='lower-right-form'
				onSubmit={signInOnSubmitHandler}
			>
				<h2>Sign In</h2>
				<SignInText
					onChange={onEmailChangeHandler}
					type='email'
					placeholder='Email'
					required
				/>
				<SignInPassword
					type='password'
					onChange={onPasswordChangeHandler}
					placeholder='Password'
					required
				/>
			</form>
			<ButtonContainer>
				<BaseLandingButton type='submit' form='sign-in-form'>
					SIGN IN
				</BaseLandingButton>
			</ButtonContainer>
		</LowerRightContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.signInReducer.token,
		user: state.signInReducer.user,
		loggedIn: state.signInReducer.loggedIn,
	};
};

export default connect(mapStateToProps)(SignIn);
