import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';

import TestCaseListScreen from '../screens/TestCaseListScreen';
import TestCaseDetailScreen from '../screens/TestCaseDetailScreen';

const Stack = createNativeStackNavigator();

const TestStack = () => {
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
        name="TestCaseList" 
        component={TestCaseListScreen} 
        options={{ title: 'Test Cases' }} 
      />
      <Stack.Screen 
        name="TestCaseDetail" 
        component={TestCaseDetailScreen} 
        options={{ title: 'Test Execution' }} 
      />
    </Stack.Navigator>
  );
};

export default TestStack;
