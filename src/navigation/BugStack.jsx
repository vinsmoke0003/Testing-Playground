import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';

import BugListScreen from '../screens/BugListScreen';
import BugDetailScreen from '../screens/BugDetailScreen';
import BugReportScreen from '../screens/BugReportScreen';

const Stack = createNativeStackNavigator();

const BugStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="BugList" 
        component={BugListScreen} 
        options={{ title: 'Bugs' }} 
      />
      <Stack.Screen 
        name="BugDetail" 
        component={BugDetailScreen} 
        options={{ title: 'Bug Details' }} 
      />
      <Stack.Screen 
        name="BugReport" 
        component={BugReportScreen} 
        options={{ title: 'Report a Bug' }} 
      />
    </Stack.Navigator>
  );
};

export default BugStack;
