import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import ChartWidget from '../components/ChartWidget';
import { SafeAreaView } from 'react-native-safe-area-context';

const SummaryCard = ({ title, value, color }) => (
  <View style={[styles.card, { borderTopColor: color }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={[styles.cardValue, { color }]}>{value}</Text>
  </View>
);

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.subtitle}>Overview of project health</Text>

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
            title="Test Cases Execution" 
            type="bar" 
            labels={['Pass', 'Fail', 'Pending']} 
            data={[14, 2, 8]} 
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
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 24,
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
