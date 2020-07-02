import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, connect} from 'react-redux';
import {SignInText} from '../../../style/inputs';
import {LowerRightContainer, ButtonContainer} from '../../../style/Containers/landingPage';
import {BaseLandingButton} from '../../../style/buttons';
import ellipsis1 from '../../../assets/images/ellipsis1.png';
import {newUserCode} from '../../../store/actions';

const SignUpInput = (props) => {
	const [email, setEmail] = useState('');

	const {push} = useHistory();

	const dispatch = useDispatch();

	const onEmailChangeHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onCreateUserSubmitHandler = async (e) => {
		e.preventDefault();
		dispatch(newUserCode(email));
	};

	useEffect(() => {
		if (props.verificationSent) {
			push('/congrats');
		}
	},);

	return (
		<LowerRightContainer>
			<form
				className='lower-right-form'
				id='sign-up-form'
				onSubmit={onCreateUserSubmitHandler}
			>
				<h2>Sign Up</h2>
				<SignInText
					onChange={onEmailChangeHandler}
					type='email'
					id='email'
					placeholder='Email'
					required
				/>
			</form>
			{props.error ? <h3>{props.error.email[0]}</h3> : null}
			<ButtonContainer>
				<BaseLandingButton type='submit' form='sign-up-form'>
					CONTINUE
				</BaseLandingButton>
				<img src={ellipsis1} alt='ellipsis' />
			</ButtonContainer>
		</LowerRightContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		email: state.newUserReducer.email,
		verificationSent: state.newUserReducer.verificationSent,
		error: state.newUserReducer.error,
	};
};

export default connect(mapStateToProps)(SignUpInput);
