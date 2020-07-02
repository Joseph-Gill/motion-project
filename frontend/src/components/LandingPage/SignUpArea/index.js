import React from 'react';
import {UpperRightContainer} from '../../../style/Containers/landingPage';
import {useHistory} from 'react-router-dom';

const SignUpArea = () => {
	const {location, push} = useHistory();

	const onClickHandler = () => location.pathname === '/' ? push('/signup') : push('/');

	return (
		<>
			<UpperRightContainer>
				<p>{location.pathname === '/' ? `Don't have an account?` : 'Already have an account?'}</p>
				<button onClick={onClickHandler}>
					{location.pathname === '/' ? 'SIGN UP' : 'SIGN IN'}
				</button>
			</UpperRightContainer>
		</>
	);
};

export default SignUpArea;
