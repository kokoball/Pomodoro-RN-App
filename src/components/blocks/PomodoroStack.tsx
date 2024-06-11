import React from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';
import {AnimationScreenNames, allScreens} from '@constants/NavigationHelpers';
import {PomodoroHome} from '@components/atoms/PomodoroHome';

export default function PomodoroStack() {
  const Stack = createStackNavigator();

  const getScreenConfig = (screen: string) => {
    switch (screen) {
      case AnimationScreenNames.WAVE_METER:
        return {
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'black',
          },
        };
      default:
        return undefined;
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={PomodoroHome} />
      {allScreens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={getScreenConfig(screen.name)}
        />
      ))}
    </Stack.Navigator>
  );
}
