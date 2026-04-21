import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from '../constants/colors';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BugStack from './BugStack';
import TestStack from './TestStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ tabBarIcon: () => null, tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' } }} // Placeholder for actual icons
      />
      <Tab.Screen 
        name="BugsTab" 
        component={BugStack} 
        options={{ title: 'Bugs', tabBarIcon: () => null, tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' } }}
      />
      <Tab.Screen 
        name="TestsTab" 
        component={TestStack} 
        options={{ title: 'T.Cases', tabBarIcon: () => null, tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' } }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Stack (just Login for now) */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
