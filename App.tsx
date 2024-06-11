import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import store from '@store/index';

import {Home} from '@components/template/Home';
import PomodoroStack from '@components/blocks/PomodoroStack';

function App(): React.JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === 'android' ? 'modal' : undefined,
          }}>
          <Stack.Screen name="Menu" component={Home} />
          <Stack.Screen name="Pomodoro Timer ⏰" component={PomodoroStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
