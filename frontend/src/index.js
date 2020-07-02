import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {GlobalStyle} from './style';
import authComponent from './HOC';
import SignUp from './routes/signup';
import Landing from './routes/landing';
import Congrats from './routes/congrats';
import FeedLiked from './routes/feedLiked';
import FeedFriends from './routes/feedFriends';
import FeedFollow from './routes/feedFollow';
import Friends from './routes/friends';
import Verification from './routes/verification';
import store from './store/store';
import {tokenSignIn} from './store/actions';
import * as serviceWorker from './serviceWorker';
import './index.css';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
if (token && user) store.dispatch(tokenSignIn(token, JSON.parse(user)));

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route
                    exact
                    path='/congrats'
                    component={Congrats}
                />
                <Route
                    exact
                    path='/verification'
                    component={Verification}
                />
                <Route
                    exact
                    path='/feed/liked'
                    component={authComponent(FeedLiked)}
                />
                <Route
                    exact
                    path='/feed/friends'
                    component={authComponent(FeedFriends)}
                />
                <Route
                    exact
                    path='/feed/follow'
                    component={authComponent(FeedFollow)}
                />
                <Route
                    exact
                    path='/friends'
                    component={authComponent(Friends)}
                />
            </Switch>
        </BrowserRouter>
    </Provider>,
    // </React.StrictMode>
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
