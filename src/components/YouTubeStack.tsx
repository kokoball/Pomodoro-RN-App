import React from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';
import {AnimationScreenNames, allScreens} from '@constants/NavigationHelpers';
import {YoutubeHome} from './YoutubeHome';

export default function YouTubeStack() {
  const Stack = createStackNavigator();
  console.log('ddd', allScreens, 909900990);

  const getScreenConfig = (screen: string) => {
    switch (screen) {
      case AnimationScreenNames.WAVE_METER:
      case AnimationScreenNames.BENDING_CIRCLE:
        return {
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'black',
          },
        };
      case AnimationScreenNames.GRADIENT_CLOCK:
      case AnimationScreenNames.FOCUS_ANIMATION:
        return {
          headerShown: false,
        };
      default:
        return undefined;
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="YouTube Demos" component={YoutubeHome} />
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
