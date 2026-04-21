import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import StatusBadge from '../components/StatusBadge';
import { subscribeToTestCases, updateTestCaseStatus } from '../services/testCaseService';

const TestCaseDetailScreen = ({ route, navigation }) => {
  const { tcId } = route.params;
  const [testCase, setTestCase] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToTestCases((data) => {
      const found = data.find(t => t.id === tcId);
      setTestCase(found);
    });
    return () => unsubscribe();
  }, [tcId]);

  const handleUpdateStatus = (newStatus) => {
    // // TODO: testCaseService.updateStatus()
    updateTestCaseStatus(tcId, newStatus, 'Mock actual result from UI');
    Alert.alert('Test Update', `Marked as ${newStatus}`);
  };

  if (!testCase) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading test...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <StatusBadge status={testCase.status} />
        <Text style={styles.date}>{testCase.createdAt}</Text>
      </View>

      <Text style={styles.title}>{testCase.title}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expected Result</Text>
        <View style={styles.resultBox}>
          <Text style={styles.bodyText}>{testCase.expectedResult}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps to Execute</Text>
        {testCase.steps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Execution Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.success + '22', borderColor: colors.success }]}
            onPress={() => handleUpdateStatus('Pass')}
          >
            <Text style={[styles.actionButtonText, { color: colors.success }]}>Pass</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.error + '22', borderColor: colors.error }]}
            onPress={() => handleUpdateStatus('Fail')}
          >
            <Text style={[styles.actionButtonText, { color: colors.error }]}>Fail</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 12,
  },
  resultBox: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bodyText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  stepText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.button,
  },
});

export default TestCaseDetailScreen;
