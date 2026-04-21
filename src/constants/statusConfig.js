import { colors } from './colors';

export const statusConfig = {
  // Bug statuses
  'Open': { color: colors.error, label: 'Open' },
  'In Progress': { color: colors.warning, label: 'In Progress' },
  'Resolved': { color: colors.success, label: 'Resolved' },
  'Closed': { color: colors.textSecondary, label: 'Closed' },
  
  // Test Case statuses
  'Pending': { color: colors.info, label: 'Pending' },
  'Pass': { color: colors.success, label: 'Pass' },
  'Fail': { color: colors.error, label: 'Fail' },
};
