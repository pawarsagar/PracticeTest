import React, { Fragment } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import MainRouteConfig from './src/Navigation';
import Navigator from './src/Common/Navigator';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import mainReducer from './src/store/MainReducer';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { COLORS } from './src/assets';
// import Loader from './src/Components/Loader/Loader';
// import { COLORS } from './src/assets';

const logger = createLogger({
  level: 'log',
  logger: console,
  logErrors: true,
  collapsed: undefined,
  predicate: undefined,
  duration: true,
  timestamp: true,
  stateTransformer: state => state,
  actionTransformer: action => action,
  errorTransformer: error => error,
  colors: {
    title: () => 'inherit',
    prevState: () => 'orange',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
  diff: false,
  diffPredicate: undefined,

  // Deprecated options
  transformer: undefined,
});

export const store = createStore(
  mainReducer,
  applyMiddleware(ReduxThunk, logger),
);

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <StatusBar
          hidden={false}
          barStyle="dark-content" backgroundColor='transparent' />
        <SafeAreaView style={{ flex: 1 }}>
          {/*    <Loader /> */}
          <MainRouteConfig
            ref={navigatorRef => {
              Navigator.setContainer(navigatorRef);
            }}
          />
        </SafeAreaView>
      </Fragment>
    </Provider>
  );
};

export default App;
