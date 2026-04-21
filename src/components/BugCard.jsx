import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StatusBadge from './StatusBadge';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

const BugCard = ({ title, severity, status, createdAt, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
      
      <View style={styles.footerRow}>
        <View style={styles.badgesRow}>
          <StatusBadge status={status} />
          <View style={styles.severityBadge}>
            <Text style={styles.severityText}>{severity}</Text>
          </View>
        </View>
        <Text style={styles.date}>{createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
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
});

export default BugCard;
