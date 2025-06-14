import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Central navigation container for the app.
import HomeScreen from '../screens/HomeScreen';
import TimerScreen from '../screens/TimerScreen';
import { TimerConfig } from '../types/timerTypes';

export type RootStackParamList = {
  Home: undefined;
  Timer: { config: TimerConfig };
};

// Native stack used for simple two screen flow
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
