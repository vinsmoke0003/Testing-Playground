import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

const IntegrationItem = ({ title, description }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.integrationItem}>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
      <Switch
        trackColor={{ false: '#767577', true: colors.primary }}
        thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Settings & Integrations</Text>
        <Text style={styles.subtitle}>Manage your ecosystem</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integrations</Text>
          <IntegrationItem 
            title="GitHub" 
            description="Auto-create issues from high-severity bugs" 
          />
          <IntegrationItem 
            title="Jira" 
            description="Two-way sync with Jira projects" 
          />
          <IntegrationItem 
            title="Slack" 
            description="Post updates directly to channels" 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Access</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Role-Based Access</Text>
            <Text style={styles.settingValue}>Admin (All Projects)</Text>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Data Retention Policy</Text>
            <Text style={styles.settingValue}>Archive after 90 days</Text>
          </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 12,
  },
  integrationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  itemTitle: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  itemDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  settingCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  settingValue: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.success,
  },
});

export default SettingsScreen;
