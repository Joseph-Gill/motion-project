import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
	ValidationCode,
	VerificationText,
	VerificationPassword,
} from '../../../style/inputs';
import {
	VerificationAreaContainer,
	LowerRightContainer,
	ButtonContainer,
} from '../../../style/Containers/landingPage';
import {validateNewUser} from '../../../store/actions';
import {BaseLandingButton} from '../../../style/buttons';
import ellipsis3 from '../../../assets/images/ellipsis3.png';

const VerificationArea = (props) => {
	const [userInfo, setUserInfo] = useState({
		email: '',
		username: '',
		code: '',
		password: '',
		password_repeat: '',
		first_name: '',
		last_name: '',
	});

	const {push} = useHistory();

	const verificationOnChangeHandler = (event, property) => {
		const value = event.currentTarget.value;
		setUserInfo({...userInfo, [property]: value});
	};

	const verificationOnSubmitHandler = (e) => {
		e.preventDefault();
		props.dispatch(validateNewUser(userInfo));
	};

	useEffect(() => {
		if (props.validateComplete) {
			push('/');
		}
	},);

	return (
		<LowerRightContainer>
			<VerificationAreaContainer
				id='validation-form'
				onSubmit={verificationOnSubmitHandler}
			>
				<h2>Verification</h2>
				<ValidationCode
					onChange={(e) => verificationOnChangeHandler(e, 'code')}
					className='validation'
					type='text'
					placeholder='Validation Code'
					required
				/>

				<VerificationText
					onChange={(e) => verificationOnChangeHandler(e, 'email')}
					className='verification-left'
					type='email'
					placeholder='Email'
					required
				/>

				<VerificationText
					onChange={(e) => verificationOnChangeHandler(e, 'username')}
					className='verification-right'
					type='text'
					placeholder='Username'
					required
				/>

				<VerificationText
					onChange={(e) =>
						verificationOnChangeHandler(e, 'first_name')
					}
					className='verification-left'
					type='text'
					placeholder='First Name'
					required
				/>

				<VerificationText
					onChange={(e) =>
						verificationOnChangeHandler(e, 'last_name')
					}
					className='verification-right'
					type='text'
					placeholder='Lase Name'
					required
				/>

				<VerificationPassword
					onChange={(e) => verificationOnChangeHandler(e, 'password')}
					className='verification-left'
					type='password'
					placeholder='Password'
					required
				/>

				<VerificationPassword
					onChange={(e) =>
						verificationOnChangeHandler(e, 'password_repeat')
					}
					className='verification-right'
					type='password'
					placeholder='Repeat Password'
					required
				/>
			</VerificationAreaContainer>
			{props.error ? <h3>{props.error.username[0]}</h3> : null}
			<ButtonContainer>
				<BaseLandingButton type='submit' form='validation-form'>
					COMPLETE
				</BaseLandingButton>
				<img src={ellipsis3} alt='ellipsis' />
			</ButtonContainer>
		</LowerRightContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		email: state.newUserReducer.email,
		verificationSent: state.newUserReducer.verificationSent,
		error: state.newUserReducer.error,
		validateComplete: state.newUserReducer.validateComplete,
	};
};

export default connect(mapStateToProps)(VerificationArea);
