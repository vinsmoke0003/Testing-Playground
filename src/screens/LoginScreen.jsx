import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { loginAsDeveloper, loginAsTester } = useAuth();

  const handleLogin = (role) => {
    if (role === 'developer') {
      loginAsDeveloper();
    } else {
      loginAsTester();
    }
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mobile Testing Playground</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        <TouchableOpacity 
          style={[styles.button, styles.testerButton]} 
          onPress={() => handleLogin('tester')} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTitle}>I am a Tester</Text>
          <Text style={styles.buttonSubtitle}>Find bugs, review fixes, and close tickets.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.developerButton]} 
          onPress={() => handleLogin('developer')} 
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTitle}>I am a Developer</Text>
          <Text style={styles.buttonSubtitle}>Fix bugs, resolve tickets, and pass testing.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 48,
    textAlign: 'center',
  },
  button: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  testerButton: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  developerButton: {
    backgroundColor: colors.surface,
    borderColor: colors.info,
  },
  buttonTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  buttonSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

export default LoginScreen;
