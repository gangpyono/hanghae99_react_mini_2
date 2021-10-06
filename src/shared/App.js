import React from 'react';
import './App.css';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import PostList from '../pages/PostList';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Permit from './Permit';

import Header from '../components/common/Header';
import { Grid, Button } from '../elements/index';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { apiKey } from './firebase';

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/Login" exact component={Login} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/PostWrite" exact component={PostWrite} />
          <Route path="/PostDetail" exact component={PostDetail} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float
          _onClick={() => {
            history.push('/PostWrite');
          }}
          text="+"
        ></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
