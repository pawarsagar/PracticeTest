import { combineReducers } from 'redux';

import AuthReducer from './reducers/AuthReducer'
import CommonReducer from './reducers/CommonReducer'
import HomeScreenFeed from './reducers/HomeFeedReducers'
import ColourPalleteReducer from './reducers/TestStripReducer'

export default combineReducers({
    AuthReducer: AuthReducer,
    CommonReducer: CommonReducer,
    HomeScreenFeed: HomeScreenFeed,
    ColourPalleteReducer: ColourPalleteReducer
});    