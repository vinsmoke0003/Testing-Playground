import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import ChartWidget from '../components/ChartWidget';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

import { mockBugTrends, mockTesterPerformance } from '../services/mockData';

const SummaryCard = ({ title, value, color }) => (
  <View style={[styles.card, { borderTopColor: color }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

const DashboardScreen = ({ navigation }) => {
  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.subtitle}>Overview of project health</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Switch Role</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsRow}>
          <SummaryCard title="Total Bugs" value="12" color={colors.primary} />
          <SummaryCard title="Resolved" value="8" color={colors.success} />
          <SummaryCard title="Test Pass Rate" value="94%" color={colors.info} />
        </View>

        <View style={styles.chartContainer}>
          <ChartWidget 
            title="Bugs by Status" 
            type="bar" 
            labels={['Open', 'Prog', 'Res', 'Closed']} 
            data={[4, 2, 8, 3]} 
          />
        </View>

        <View style={styles.chartContainer}>
          <ChartWidget 
            title="Bug Trends (Over Time)" 
            type="line" 
            labels={mockBugTrends.labels} 
            data={mockBugTrends.data} 
          />
        </View>

        <View style={styles.chartContainer}>
          <ChartWidget 
            title="Tester Performance (Bugs Found)" 
            type="bar" 
            labels={mockTesterPerformance.labels} 
            data={mockTesterPerformance.data} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 4,
  },
  cardTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  cardValue: {
    ...typography.h2,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 8,
  },
});

export default DashboardScreen;
