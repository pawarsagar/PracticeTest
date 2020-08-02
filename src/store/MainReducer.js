import { combineReducers } from 'redux';

import TestReducer from './reducers/TestReducer';
import AuthReducer from './reducers/AuthReducer'
import CommonReducer from './reducers/CommonReducer'
import HomeScreenFeed from './reducers/HomeFeedReducers'

export default combineReducers({
    TestReducer: TestReducer,
    AuthReducer: AuthReducer,
    CommonReducer: CommonReducer,
    HomeScreenFeed: HomeScreenFeed
});    