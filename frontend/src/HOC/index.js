import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const authComponent = (WrappedComponent) => (props) => {
    const {push} = useHistory();

    const {state: {token}} = props;

    useEffect(() => {
        if (!token) {
            push('/')
        }
    })

    return <WrappedComponent/>

}

const mapStateToProps = (state) => {
    return {
        state: state.signInReducer
    }
}

const composedComponent = compose(
    connect(mapStateToProps), authComponent
);

export default composedComponent;