import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import StatusBadge from '../components/StatusBadge';
import { subscribeToBugs, updateBugStatus } from '../services/bugService';
import { mockActivityFeed, mockDeviceMetadata } from '../services/mockData';
import { useAuth } from '../contexts/AuthContext';

const BugDetailScreen = ({ route, navigation }) => {
  const { bugId } = route.params;
  const { role } = useAuth();
  const [bug, setBug] = useState(null);

  useEffect(() => {
    // In a real app we might fetch a single bug or filter from the sub
    const unsubscribe = subscribeToBugs((data) => {
      const found = data.find(b => b.id === bugId);
      setBug(found);
    });
    return () => unsubscribe();
  }, [bugId]);

  const handleUpdateStatus = (newStatus) => {
    // TODO: updateBugStatus(bugId, newStatus)
    updateBugStatus(bugId, newStatus);
    Alert.alert('Status Updated', `Bug status changed to ${newStatus}`);
  };

  if (!bug) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading bug details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.badgesRow}>
          <StatusBadge status={bug.status} />
          <View style={styles.severityBadge}>
            <Text style={styles.severityText}>{bug.severity}</Text>
          </View>
        </View>
        <Text style={styles.date}>{bug.createdAt}</Text>
      </View>

      <Text style={styles.title}>{bug.title}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.bodyText}>{bug.description}</Text>
      </View>
      
      {/* Action Row for Status Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Status</Text>
        <View style={styles.actionRow}>
          {(role === 'tester' ? ['Closed'] : ['In Progress', 'Resolved']).map((status) => (
            <TouchableOpacity 
              key={status} 
              style={[
                styles.actionButton, 
                bug.status === status && styles.activeActionButton
              ]}
              onPress={() => handleUpdateStatus(status)}
              disabled={bug.status === status}
            >
              <Text style={[
                styles.actionButtonText,
                bug.status === status && styles.activeActionButtonText
              ]}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attachments</Text>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>[Image Placeholder]</Text>
        </View>
      </View>

      {/* Device Metadata Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Device Metadata</Text>
        <View style={styles.metadataCard}>
          <Text style={styles.metadataText}><Text style={styles.bold}>OS:</Text> {mockDeviceMetadata.os}</Text>
          <Text style={styles.metadataText}><Text style={styles.bold}>Device:</Text> {mockDeviceMetadata.device}</Text>
          <Text style={styles.metadataText}><Text style={styles.bold}>RAM:</Text> {mockDeviceMetadata.ram}</Text>
          <Text style={styles.metadataText}><Text style={styles.bold}>Network:</Text> {mockDeviceMetadata.network}</Text>
        </View>
      </View>

      {/* Activity Feed Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity & Comments</Text>
        {mockActivityFeed.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityUser}>{activity.user}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
            <Text style={styles.activityText}>{activity.text}</Text>
          </View>
        ))}
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
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  severityBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  severityText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: 'bold',
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
    marginBottom: 8,
  },
  bodyText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeActionButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonText: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  activeActionButtonText: {
    color: '#ffffff',
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  metadataCard: {
    backgroundColor: colors.surfaceLight,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metadataText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  activityItem: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  activityUser: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.primary,
  },
  activityTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  activityText: {
    ...typography.body,
    color: colors.textPrimary,
  },
});

export default BugDetailScreen;
