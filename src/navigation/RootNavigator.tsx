import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeScreen} from 'screens/HomeScreen';
import {TaskScreen} from 'screens/TaskScreen';
import { ScreensKeys } from 'navigation/interfaces';

export type RootStackParamList = {
  [ScreensKeys.Home]: undefined;
  [ScreensKeys.Task]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


export const RootNavigator = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
        }}>
        <Stack.Screen name={ScreensKeys.Home} component={HomeScreen} />
        <Stack.Screen name={ScreensKeys.Task} component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
