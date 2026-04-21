import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { statusConfig } from '../constants/statusConfig';
import { typography } from '../constants/typography';
import { colors } from '../constants/colors';

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || { color: colors.textSecondary, label: status };

  return (
    <View style={[styles.badge, { backgroundColor: config.color + '33', borderColor: config.color }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: 'bold',
  },
});

export default StatusBadge;
