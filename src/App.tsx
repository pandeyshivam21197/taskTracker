/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Provider} from 'react-redux';
import {RootNavigator} from 'navigation/RootNavigator';
import {configureStore} from 'modules/store';

const App: () => React.ReactElement = () => {
  return (
    <Provider store={configureStore()}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
